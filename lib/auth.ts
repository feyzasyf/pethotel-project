import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUserByEmail } from "./serverUtils";
import { authSchema } from "./validations";
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
      const istryingToAccessAppRoute =
        request.nextUrl.pathname.startsWith("/app");

      if (isLoggedIn && istryingToAccessAppRoute && !auth?.user.hasAccess) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }

      if (isLoggedIn && istryingToAccessAppRoute && auth?.user.hasAccess) {
        return true;
      }
      if (istryingToAccessAppRoute && !isLoggedIn) {
        return false;
      }

      if (isLoggedIn && !istryingToAccessAppRoute && !auth?.user.hasAccess) {
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
        auth?.user.hasAccess
      ) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.hasAccess = user.hasAccess;
        token.userId = user.id;
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
