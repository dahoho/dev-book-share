import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      bio?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    bio?: string;
  }
}
