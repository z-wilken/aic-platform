import NextAuth, { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import MicrosoftEntraIDProvider from "next-auth/providers/microsoft-entra-id"
import { query } from "./db"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthConfig = {
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
          const result = await query(`
            SELECT
              u.id,
              u.email,
              u.password_hash,
              u.name,
              u.role,
              u.org_id,
              u.is_active,
              u.is_super_admin,
              u.permissions,
              o.name as org_name,
              o.tier
            FROM users u
            LEFT JOIN organizations o ON u.org_id = o.id
            WHERE u.email = $1
          `, [credentials.email.toString().toLowerCase()])

          if (result.rows.length > 0) {
            const user = result.rows[0]

            if (!user.is_active) {
              throw new Error("Account is deactivated")
            }

            const isValid = await bcrypt.compare(credentials.password.toString(), user.password_hash)

            if (!isValid) {
              throw new Error("Invalid credentials")
            }

            // Update last login
            await query(
              'UPDATE users SET last_login = NOW() WHERE id = $1',
              [user.id]
            )

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              orgId: user.org_id,
              orgName: user.org_name || 'Unknown',
              tier: user.tier || 'TIER_3',
              isSuperAdmin: user.is_super_admin,
              permissions: user.permissions
            }
          }
        } catch (dbError) {
          console.warn("Database auth failed:", dbError)
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
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === 'google' || account?.provider === 'microsoft-entra-id') {
        try {
          // Check if user already exists in our database
          const result = await query(`
            SELECT u.id, u.org_id, u.role
            FROM users u
            WHERE u.email = $1
          `, [user.email?.toLowerCase()])

          if (result.rows.length > 0) {
            // User exists, link SSO session to this user
            user.orgId = result.rows[0].org_id
            user.role = result.rows[0].role
            user.id = result.rows[0].id
            return true
          }

          // User doesn't exist, try domain-based discovery for institutional auto-link
          const domain = user.email?.split('@')[1]
          if (domain) {
            const orgResult = await query(`
              SELECT id FROM organizations WHERE contact_email LIKE $1
            `, [`%@${domain}`])

            if (orgResult.rows.length > 0) {
              // Found a matching organization by domain, auto-create unactivated user
              const newOrgId = orgResult.rows[0].id
              const createResult = await query(`
                INSERT INTO users (email, name, org_id, role, password_hash, is_active, email_verified)
                VALUES ($1, $2, $3, 'VIEWER', 'SSO_ONLY', TRUE, TRUE)
                RETURNING id, role
              `, [user.email.toLowerCase(), user.name, newOrgId])
              
              user.id = createResult.rows[0].id
              user.orgId = newOrgId
              user.role = createResult.rows[0].role
              return true
            }
          }
        } catch (error) {
          console.error("SSO SignIn Error:", error)
        }
      }
      return true
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.orgId = user.orgId
        token.orgName = user.orgName
        token.tier = user.tier
        token.isSuperAdmin = user.isSuperAdmin
        token.permissions = user.permissions
      }

      // If it's an SSO user who just signed in, we might need to fetch their org details
      if (token.orgId && !token.orgName) {
        try {
          const orgResult = await query('SELECT name, tier FROM organizations WHERE id = $1', [token.orgId])
          if (orgResult.rows.length > 0) {
            token.orgName = orgResult.rows[0].name
            token.tier = orgResult.rows[0].tier
          }
        } catch (e) {}
      }

      return token
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.orgId = token.orgId as string
        session.user.orgName = token.orgName as string
        session.user.tier = token.tier as string
        session.user.isSuperAdmin = token.isSuperAdmin as boolean
        session.user.permissions = token.permissions
      }
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development',
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
