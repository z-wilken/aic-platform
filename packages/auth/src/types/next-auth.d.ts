import { AICSessionUser } from "@aic/types";

declare module "next-auth" {
  interface Session {
    user: AICSessionUser;
  }
  interface User extends AICSessionUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends AICSessionUser {
    id: string;
  }
}
