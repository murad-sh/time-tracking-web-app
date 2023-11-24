import type { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentUser } from '@/lib/auth/session';
import { connectToDB } from '@/lib/utils/db';
import User from '@/models/user';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'DELETE' && req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const currentUser = await getCurrentUser(req, res);
    if (!currentUser) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    await connectToDB();
    const user = await User.findById(currentUser.id);
    if (!user)
      return res.status(404).json({
        message: 'User not found',
      });

    const { projectId } = req.query;
    if (req.method === 'DELETE') {
      await user.deleteProject(projectId as string);
      res.status(204).end();
    } else {
      // TODO: Add EDIT functionality
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Message' });
  }
}
