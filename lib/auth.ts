import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUserByEmail } from "./serverUtils";
import { authSchema } from "./validations";
import { authEdgeConfig } from "./auth-edge";

export const { signIn, auth, handlers, signOut } = NextAuth({
  ...authEdgeConfig,
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
          user.hashedPassword,
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
});
