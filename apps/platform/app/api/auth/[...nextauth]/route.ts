import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Mock Auth for Demo - In Production, check DB
        if (credentials?.email === "admin@enterprise.co.za" && credentials?.password === "demo123") {
          return { id: "1", name: "Dr. Sarah Khumalo", email: "admin@enterprise.co.za", role: "ADMIN" }
        }
        return null
      }
    })
  ],
  theme: {
    colorScheme: "dark",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role
      return session
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
