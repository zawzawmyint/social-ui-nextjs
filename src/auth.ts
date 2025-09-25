import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { userLogin } from "./actions/AuthApiActions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // logic to verify if the user exists
        const res = await userLogin(
          credentials.email as string,
          credentials.password as string
        );

        // console.log("NextAuth USER", res);

        if (!res.success) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return {
          id: res.data.user.id,
          email: res.data.user.email,
          name: res.data.user.name,
          role: res.data.user.role,
          accessToken: res.data.access_token,
        };
      },
    }),
  ],
  // callback funstions for session management
  callbacks: {
    // set token to jwt token
    async jwt({ token, user }) {
      // console.log("JWT callback", user);
      if (user) {
        return {
          ...token,
          accessToken: (user as any).accessToken,
          userId: user.id,
          email: user.email,
          role: (user as any).role,
        };
      }
      return token;
    },

    async session({ session, token }) {
      //  set jwt token to session

      // console.log("Session callback", session, token);
      return {
        ...session,
        accessToken: token.accessToken as string | undefined,
        user: {
          id: token.userId as string,
          email: token.email,
          name: token.name,
          role: token.role,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
});
