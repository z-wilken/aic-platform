import { NextAuthOptions, Session, User } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { db, users, eq } from "@aic/db"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
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
          // Hardened Drizzle query replacing raw SQL
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email.toString().toLowerCase()))
            .limit(1);

          if (user) {
            if (!user.isActive) {
              throw new Error("Account is deactivated")
            }

            // Using native bcrypt (10x faster)
            const isValid = await bcrypt.compare(credentials.password.toString(), user.passwordHash)

            if (!isValid) {
              throw new Error("Invalid credentials")
            }

            // Update last login using ORM
            await db
              .update(users)
              .set({ lastLogin: new Date() })
              .where(eq(users.id, user.id));

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              orgId: user.orgId || 'INTERNAL',
              isSuperAdmin: user.isSuperAdmin,
              permissions: user.permissions
            }
          }
        } catch (dbError) {
          console.warn("[AUTH] Database login attempt failed:", dbError)
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
    async jwt({ token, user }: { token: JWT, user?: User | any }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.orgId = user.orgId
        token.isSuperAdmin = user.isSuperAdmin
        token.permissions = user.permissions
      }
      return token
    },
    async session({ session, token }: { session: Session | any, token: JWT }) {
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