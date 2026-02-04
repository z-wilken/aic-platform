import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { query } from "./db"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@aic.co.za" },
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
              u.is_active
            FROM users u
            WHERE u.email = $1
          `, [credentials.email.toString().toLowerCase()])

          if (result.rows.length > 0) {
            const user = result.rows[0]

            if (!user.is_active) {
              throw new Error("Account is deactivated")
            }

            // CRITICAL: Only allow ADMIN and AUDITOR roles into the Admin Portal
            if (user.role !== 'ADMIN' && user.role !== 'AUDITOR') {
                throw new Error("Unauthorized Access: Insufficient Privileges")
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
              orgId: user.org_id || 'INTERNAL' // Admin users might not be linked to a client org
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
    maxAge: 8 * 60 * 60, // 8 hours (shorter for admin)
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.orgId = user.orgId
      }
      return token
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.orgId = token.orgId as string
      }
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development',
}
