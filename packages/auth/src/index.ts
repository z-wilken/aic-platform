import NextAuth, { NextAuthConfig, User, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import MicrosoftEntraIDProvider from "next-auth/providers/microsoft-entra-id"
import { db, users, organizations, eq, like } from "@aic/db"
import { AICSessionUser, UserRole, CertificationTier, Permissions } from "@aic/types"
import bcrypt from "bcrypt"

/**
 * Module augmentation for NextAuth types
 */
declare module "next-auth" {
  interface Session {
    user: AICSessionUser
  }
  interface User extends Partial<AICSessionUser> {
    passwordHash?: string;
    isActive?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Partial<AICSessionUser> {}
}

export const authConfig: NextAuthConfig = {
  providers: [
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
              throw new Error("Account is deactivated")
            }

            const isValid = await bcrypt.compare(credentials.password.toString(), user.passwordHash)

            if (!isValid) {
              throw new Error("Invalid credentials")
            }

            // Update last login
            await db.update(users).set({ lastLogin: new Date() }).where(eq(users.id, user.id));

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role as UserRole,
              orgId: user.orgId || 'INTERNAL',
              orgName: user.orgName || 'AIC Internal',
              tier: (user.tier as CertificationTier) || 'TIER_3',
              isSuperAdmin: user.isSuperAdmin || false,
              permissions: (user.permissions as unknown as Permissions) || { can_publish: false, can_verify: false, can_manage_users: false }
            }
          }
        } catch (dbError) {
          console.warn("[AUTH] Login failed:", dbError)
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
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'microsoft-entra-id') {
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
                email_verified: true
              }).returning({ id: users.id, role: users.role });
              
              user.id = newUser.id
              user.orgId = org.id
              user.role = newUser.role as UserRole
              return true
            }
          }
        } catch (error) {
          console.error("[AUTH] SSO SignIn Error:", error)
        }
      }
      return true
    },
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.id = user.id
        token.role = user.role as UserRole
        token.orgId = user.orgId
        token.orgName = user.orgName
        token.tier = user.tier as CertificationTier
        token.isSuperAdmin = user.isSuperAdmin
        token.permissions = user.permissions as Permissions
      }

      if (token.orgId && !token.orgName) {
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
        } catch (e) {}
      }

      return token
    },
    async session({ session, token }): Promise<Session> {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
        session.user.orgId = token.orgId as string
        session.user.orgName = token.orgName as string
        session.user.tier = token.tier as CertificationTier
        session.user.isSuperAdmin = token.isSuperAdmin as boolean
        session.user.permissions = token.permissions as Permissions
      }
      return session
    }
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
export * from "@aic/types"
