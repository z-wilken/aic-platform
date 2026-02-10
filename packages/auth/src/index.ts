import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const getAuthOptions = (dbQuery: any): NextAuthOptions => ({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        try {
          const result = await dbQuery(`
            SELECT
              u.id, u.email, u.password_hash, u.name, u.role, u.org_id,
              u.is_active, u.is_super_admin, u.permissions,
              o.name as org_name, o.tier
            FROM users u
            LEFT JOIN organizations o ON u.org_id = o.id
            WHERE u.email = $1
          `, [credentials.email.toLowerCase()]);

          if (result.rows.length > 0) {
            const user = result.rows[0];

            if (!user.is_active) throw new Error("Account deactivated");

            const isValid = await bcrypt.compare(credentials.password, user.password_hash);
            if (!isValid) throw new Error("Invalid credentials");

            await dbQuery('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              orgId: user.org_id,
              orgName: user.org_name || 'Internal',
              tier: user.tier || 'TIER_3',
              isSuperAdmin: user.is_super_admin,
              permissions: user.permissions
            };
          }
        } catch (err) {
          console.error("Auth error:", err);
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.orgId = user.orgId;
        token.isSuperAdmin = user.isSuperAdmin;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.orgId = token.orgId;
        session.user.isSuperAdmin = token.isSuperAdmin;
        session.user.permissions = token.permissions;
      }
      return session;
    }
  },
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  pages: { signIn: '/login', error: '/login' }
});
