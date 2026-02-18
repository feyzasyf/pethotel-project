import type { NextAuthConfig } from "next-auth";
import prisma from "./prisma";
export const authEdgeConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      if (request.method !== "GET") {
        return true;
      }

      const isLoggedIn = !!auth?.user;
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp && !auth?.user.hasAccess) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }

      if (isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess) {
        return true;
      }

      if (
        isLoggedIn &&
        (request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")) &&
        auth?.user.hasAccess
      ) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      if (isLoggedIn && !isTryingToAccessApp && !auth?.user.hasAccess) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }

        return true;
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }

      return false;
    },
    jwt: async ({ token, session, user }) => {
      if (user) {
        //on sign in
        token.hasAccess = user.hasAccess;
        token.userId = user.id;
      }

      //if (forceRefresh && token.userId) {
      if (token.userId) {
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
} satisfies Omit<NextAuthConfig, "providers">;
