import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';

export default NextAuth(authOptions);
