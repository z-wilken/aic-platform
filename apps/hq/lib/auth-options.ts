import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { query } from "./db"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@aic.co.za" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Login attempt for:', credentials?.email);
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
              u.permissions
            FROM users u
            WHERE u.email = $1
          `, [credentials.email.toString().toLowerCase()])

          console.log('Database lookup result count:', result.rows.length);

          if (result.rows.length === 0) {
            console.warn("Auth failed: User not found", credentials.email);
            throw new Error("Invalid credentials")
          }

          const user = result.rows[0];
          console.log('User found:', user.email, 'Active:', user.is_active, 'Role:', user.role);

          if (!user.is_active) {
            console.warn("Auth failed: Account deactivated", user.email);
            throw new Error("Account is deactivated")
          }

          const isValid = await bcrypt.compare(credentials.password.toString(), user.password_hash)
          console.log('Password valid:', isValid);

          if (!isValid) {
            console.warn("Auth failed: Invalid password", user.email);
            throw new Error("Invalid credentials")
          }

          // Update last login
          try {
            await query(
              'UPDATE users SET last_login = NOW() WHERE id = $1',
              [user.id]
            )
          } catch (updateError) {
            console.warn("Failed to update last login:", updateError);
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            orgId: user.org_id || 'INTERNAL',
            isSuperAdmin: user.is_super_admin,
            permissions: user.permissions
          }
        } catch (dbError: any) {
          console.error("Auth process error:", dbError.message || dbError);
          throw dbError;
        }
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
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.orgId = user.orgId
        token.isSuperAdmin = user.isSuperAdmin
        token.permissions = user.permissions
      }
      return token
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.orgId = token.orgId as string
        session.user.isSuperAdmin = token.isSuperAdmin as boolean
        session.user.permissions = token.permissions
      }
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development',
}