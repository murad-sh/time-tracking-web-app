import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginSchema } from '@/lib/validation/schemas';
import { connectToDB, findUserByEmail } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';

const authOptions: NextAuthOptions = {
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
          const user = await findUserByEmail(email);

          if (!user) {
            throw new Error('User not found');
          }

          const isPasswordValid = await verifyPassword(password, user.password);

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user._id,
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
};

export default NextAuth(authOptions);
