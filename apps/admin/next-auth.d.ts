import { DefaultSession } from "next-auth";
import { UserRole, CertificationTier, Permissions } from "./index";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      orgId: string;
      orgName: string;
      tier: CertificationTier;
      isSuperAdmin: boolean;
      permissions: Permissions;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    role?: UserRole;
    orgId?: string;
    orgName?: string;
    tier?: CertificationTier;
    isSuperAdmin?: boolean;
    permissions?: Permissions;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    orgId: string;
    orgName: string;
    tier: CertificationTier;
    isSuperAdmin: boolean;
    permissions: Permissions;
  }
}
