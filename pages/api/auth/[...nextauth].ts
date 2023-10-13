import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginSchema, LoginSchemaType } from '@/lib/validation/schemas';
import { connectToDB } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';
import User from '@/models/user';
import { use } from 'react';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/',
  },

  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const validatedData = loginSchema.safeParse(credentials);
        if (!validatedData.success) {
          throw new Error(validatedData.error.message);
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
        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
