import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { Session } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./lib/prisma";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Google, GitHub],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const user = await db.user.findUnique({
        where: { id: token.sub },
      });

      if (session.user && user) {
        session.user.id = user.id as string;
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.image = user.image;
        session.user.bio = user.bio ?? "";
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
