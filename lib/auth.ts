import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUserByEmail } from "./serverUtils";
import { authSchema } from "./validations";
import prisma from "./prisma";

export const { signIn, auth, handlers, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,

  providers: [
    Credentials({
      async authorize(credentials) {
        //runs on login
        if (!credentials) {
          return null;
        }

        //validate the object
        const validatedAuthDataObject = authSchema.safeParse(credentials);
        if (!validatedAuthDataObject.success) {
          return null;
        }

        const { email, password } = validatedAuthDataObject.data;

        const user = await getUserByEmail(email);

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

      const hasAppAccess = auth?.user?.hasAccess || false;
      const istryingToAccessAppRoute =
        request.nextUrl.pathname.startsWith("/app");

      if (isLoggedIn && istryingToAccessAppRoute && !hasAppAccess) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }

      if (isLoggedIn && istryingToAccessAppRoute && hasAppAccess) {
        return true;
      }
      if (istryingToAccessAppRoute && !isLoggedIn) {
        return false;
      }
      if (!isLoggedIn && !istryingToAccessAppRoute) {
        return true;
      }

      if (isLoggedIn && !istryingToAccessAppRoute && !hasAppAccess) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }
        return true;
      }

      if (
        isLoggedIn &&
        (request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")) &&
        hasAppAccess
      ) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      return false;
    },
    jwt: async ({ token, session, user }) => {
      const forceRefresh = session?.forceRefresh;

      if (user) {
        //on sign in
        token.hasAccess = user.hasAccess;
        token.userId = user.id;
      }

      if (forceRefresh && token.userId) {
        //on session update
        const dbUser = await prisma.user.findUnique({
          where: { id: token.userId },
          select: { hasAccess: true },
        });

        if (dbUser) {
          token.hasAccess = dbUser.hasAccess;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token?.userId) {
        session.user.id = token.userId;
        session.user.hasAccess = token.hasAccess;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    //signOut: "/login",
  },
});
