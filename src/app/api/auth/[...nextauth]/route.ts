import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import { NextAuthOptions } from "next-auth";



export const authOptions:NextAuthOptions={
   // Configure one or more authentication providers
   providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const userFound = await prisma.users.findUnique({
          where: {
            employID: credentials.username,
          },
        });
        if (!userFound) {
          throw new Error("Usuario/contraseña incorrectos");
        }

        if (userFound.password !== credentials.password) {
          throw new Error("Usuario/contraseña incorrectos");
        }
        // console.log(userFound);
        
        return {
          id: userFound.id,
          name: userFound.employID,
        };
      },
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
  },
  
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
