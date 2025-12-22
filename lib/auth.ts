import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { is } from "zod/v4/locales";

export const { signIn, auth, handlers, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,

  providers: [
    Credentials({
      async authorize(credentials) {
        //runs on login
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordsMatch) {
          return null;
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const istryingToAccessAppRoute =
        request.nextUrl.pathname.startsWith("/app");
      if (istryingToAccessAppRoute && !isLoggedIn) {
        return false;
      }
      if (isLoggedIn && !istryingToAccessAppRoute) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
    //signOut: "/login",
  },
});
