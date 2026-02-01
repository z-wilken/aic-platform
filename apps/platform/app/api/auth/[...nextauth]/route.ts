import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { query } from "../../../../lib/db"
import bcrypt from "bcryptjs"

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      orgId: string
      orgName: string
      tier: string
    }
  }
  interface User {
    id: string
    email: string
    name: string
    role: string
    orgId: string
    orgName: string
    tier: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    orgId: string
    orgName: string
    tier: string
  }
}

export const authOptions = {
  providers: [
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
          // Try database lookup first
          const result = await query(`
            SELECT
              u.id,
              u.email,
              u.password_hash,
              u.name,
              u.role,
              u.org_id,
              u.is_active,
              o.name as org_name,
              o.tier
            FROM users u
            LEFT JOIN organizations o ON u.org_id = o.id
            WHERE u.email = $1
          `, [credentials.email.toLowerCase()])

          if (result.rows.length > 0) {
            const user = result.rows[0]

            if (!user.is_active) {
              throw new Error("Account is deactivated")
            }

            // Verify password
            const isValid = await bcrypt.compare(credentials.password, user.password_hash)

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
              tier: user.tier || 'TIER_3'
            }
          }
        } catch (dbError) {
          console.warn("Database auth failed, trying demo credentials:", dbError)
        }

        // Fallback: Demo credentials for development
        if (
          credentials.email === "admin@enterprise.co.za" &&
          credentials.password === "demo123"
        ) {
          return {
            id: "demo-user-1",
            email: "admin@enterprise.co.za",
            name: "Dr. Sarah Khumalo",
            role: "ADMIN",
            orgId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
            orgName: "FirstRand Bank (Demo)",
            tier: "TIER_1"
          }
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
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.orgId = user.orgId
        token.orgName = user.orgName
        token.tier = user.tier
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
      }
      return session
    }
  },
  theme: {
    colorScheme: "dark" as const,
    brandColor: "#c41e3a",
    logo: "/aic-logo.svg"
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
