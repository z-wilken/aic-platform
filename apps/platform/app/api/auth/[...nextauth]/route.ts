import NextAuth from "next-auth"
import { authOptions } from "../../../../lib/auth-options"

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
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
export const { GET, POST } = handlers