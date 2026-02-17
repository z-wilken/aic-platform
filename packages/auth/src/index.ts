import NextAuth, { NextAuthConfig, type DefaultSession } from "next-auth"
import { type JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import MicrosoftEntraIDProvider from "next-auth/providers/microsoft-entra-id"
import { getSystemDb, users, organizations, auditLogs, eq, like } from "@aic/db"
import { UserRole, CertificationTier, Permissions } from "@aic/types"
import jwt from 'jsonwebtoken';

const PRIVATE_KEY = process.env.PLATFORM_PRIVATE_KEY?.replace(/\\n/g, '\n');
const PUBLIC_KEY = process.env.PLATFORM_PUBLIC_KEY?.replace(/\\n/g, '\n');

async function logAuthEvent(eventType: string, details: Record<string, any>, orgId?: string | null) {
  const db = getSystemDb();
  try {
    await db.insert(auditLogs).values({
      orgId: orgId || null,
      eventType: `AUTH_${eventType}`,
      systemName: 'AIC_AUTH',
      details,
      status: 'VERIFIED',
      createdAt: new Date()
    });
  } catch (error) {
    console.error(`[AUTH] Critical: Failed to log auth event ${eventType}:`, error);
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
// ... (providers mapping remains same)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    MicrosoftEntraIDProvider({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID || "",
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET || "",
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID ? `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID}/v2.0` : undefined,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@enterprise.co.za" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required")
        }

        const db = getSystemDb();
        try {
          const [user] = await db
            .select({
              id: users.id,
              email: users.email,
              passwordHash: users.passwordHash,
              name: users.name,
              role: users.role,
              orgId: users.orgId,
              isActive: users.isActive,
              isSuperAdmin: users.isSuperAdmin,
              permissions: users.permissions,
              orgName: organizations.name,
              tier: organizations.tier,
            })
            .from(users)
            .leftJoin(organizations, eq(users.orgId, organizations.id))
            .where(eq(users.email, credentials.email.toString().toLowerCase()))
            .limit(1);

          if (user) {
            if (!user.isActive) {
              await logAuthEvent('LOGIN_REJECTED', { email: credentials.email, reason: 'Account deactivated' }, user.orgId);
              throw new Error("Account is deactivated")
            }

            const bcrypt = await import("bcryptjs")
            const isValid = await bcrypt.default.compare(credentials.password.toString(), user.passwordHash)

            if (!isValid) {
              await logAuthEvent('LOGIN_FAILURE', { email: credentials.email, reason: 'Invalid credentials' }, user.orgId);
              throw new Error("Invalid credentials")
            }

            // Update last login
            await db.update(users).set({ lastLogin: new Date() }).where(eq(users.id, user.id));

            await logAuthEvent('LOGIN_SUCCESS', { email: user.email, userId: user.id }, user.orgId);

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role as UserRole,
              orgId: user.orgId || 'INTERNAL',
              orgName: user.orgName || 'AIC Internal',
              tier: (user.tier as CertificationTier) || 'TIER_3',
              isSuperAdmin: user.isSuperAdmin || false,
              permissions: (user.permissions as unknown as Permissions) || { can_view_audits: true, can_view_incidents: true, can_view_intelligence: true }
            }
          } else {
            await logAuthEvent('LOGIN_FAILURE', { email: credentials.email, reason: 'User not found' });
          }
        } catch (dbError) {
          console.warn("[AUTH] Login failed:", dbError)
          throw dbError;
        }

        throw new Error("Invalid credentials")
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  events: {
    async signOut({ token }) {
      if (token?.jti && token?.exp) {
        const { RevocationService } = await import("./services/revocation");
        await RevocationService.revoke(token.jti as string, token.exp as number);
        await logAuthEvent('LOGOUT', { userId: token.id, jti: token.jti }, token.orgId as string);
      }
    }
  },
  jwt: {
    async encode({ token, secret }) {
        if (!PRIVATE_KEY) return ""; // Fail closed if no key in production-intent mode
        return jwt.sign(token!, PRIVATE_KEY, { algorithm: 'RS256' });
    },
    async decode({ token, secret }) {
        if (!PUBLIC_KEY || !token) return null;
        try {
            return jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }) as JWT;
        } catch (e) {
            return null;
        }
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'microsoft-entra-id') {
        const db = getSystemDb();
        try {
          const [existingUser] = await db
            .select({ id: users.id, orgId: users.orgId, role: users.role })
            .from(users)
            .where(eq(users.email, user.email?.toLowerCase() || ""))
            .limit(1);

          if (existingUser) {
            user.orgId = existingUser.orgId || undefined
            user.role = existingUser.role as UserRole
            user.id = existingUser.id
            await logAuthEvent('SSO_LOGIN_SUCCESS', { email: user.email, provider: account.provider }, existingUser.orgId);
            return true
          }

          // Domain-based discovery for institutional auto-link
          const domain = user.email?.split('@')[1]
          if (domain) {
            const [org] = await db
              .select({ id: organizations.id })
              .from(organizations)
              .where(like(organizations.contactEmail, `%@${domain}`))
              .limit(1);

            if (org) {
              const [newUser] = await db.insert(users).values({
                email: (user.email || "").toLowerCase(),
                name: user.name || "SSO User",
                orgId: org.id,
                role: 'VIEWER',
                passwordHash: 'SSO_ONLY',
                isActive: true,
                emailVerified: true
              }).returning({ id: newUser.id, role: users.role });
              
              user.id = newUser.id
              user.orgId = org.id
              user.role = newUser.role as UserRole
              await logAuthEvent('SSO_USER_CREATED', { email: user.email, orgId: org.id }, org.id);
              return true
            }
          }
          await logAuthEvent('SSO_LOGIN_REJECTED', { email: user.email, reason: 'No organization found for domain' });
          return false; // Reject SSO if no org found
        } catch (error) {
          console.error("[AUTH] SSO SignIn Error:", error)
          return false;
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string
        token.role = user.role as UserRole
        token.orgId = user.orgId as string
        token.orgName = user.orgName as string
        token.tier = user.tier as CertificationTier
        token.isSuperAdmin = user.isSuperAdmin as boolean
        token.permissions = user.permissions as Permissions
      }

      // Task P1: Token Revocation Check
      const { RevocationService } = await import("./services/revocation");
      if (token.jti && await RevocationService.isRevoked(token.jti)) {
        return null; // Invalidate session
      }

      if (token.orgId && !token.orgName) {
        const db = getSystemDb();
        try {
          const [org] = await db
            .select({ name: organizations.name, tier: organizations.tier })
            .from(organizations)
            .where(eq(organizations.id, token.orgId))
            .limit(1);
          if (org) {
            token.orgName = org.name
            token.tier = org.tier as CertificationTier
          }
        } catch {
          // Ignore fetch errors during JWT enrichment
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.orgId = token.orgId
        session.user.orgName = token.orgName
        session.user.tier = token.tier
        session.user.isSuperAdmin = token.isSuperAdmin
        session.user.permissions = token.permissions
      }
      return session
    }
  },
}

const nextAuth = NextAuth(authConfig);
export const handlers = nextAuth.handlers;
export const auth = nextAuth.auth;
export const signIn = nextAuth.signIn;
export const signOut = nextAuth.signOut;

export * from "./services/signing"
export * from "./services/revocation"
