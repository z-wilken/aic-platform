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
    }
  }
}

const handler = NextAuth(authOptions as any)
export { handler as GET, handler as POST }