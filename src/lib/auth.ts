import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [GoogleProvider],
  callbacks: {
    authorized({ auth }) {
      if (auth?.user) {
        return true;
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: "/signin",
  },
});
