import { authOptions } from './auth-options';
import { getServerSession } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  return session?.user;
}
