import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginSchema } from '@/lib/validations/auth';
import { connectToDB } from '@/lib/utils/db';
import { verifyPassword } from '@/lib/utils/hash';
import User from '@/models/user';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const validatedData = loginSchema.safeParse(credentials);
          if (!validatedData.success) {
            throw new Error('Invalid input: ' + validatedData.error.message);
          }

          const { email, password } = validatedData.data;

          await connectToDB();
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error('User not found');
          }

          const isPasswordValid = await verifyPassword(password, user.password);

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      if (token.user)
        session.user = token.user as {
          id: string;
          email: string;
          name: string;
        };
      return session;
    },
  },
};
