import type { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentUser } from '@/lib/auth/session';
import { connectToDB } from '@/lib/utils/db';
import { timeTrackUpdateSchema } from '@/lib/validations/time-track';
import User from '@/models/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH' && req.method !== 'DELETE')
    return res.status(405).json({ message: 'Method not allowed' });
  try {
    const currentUser = await getCurrentUser(req, res);
    if (!currentUser) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    const trackId = req.query.trackId as string;
    await connectToDB();
    const user = await User.findById(currentUser.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (req.method === 'DELETE') {
      await user.deleteTimeTrack(trackId);
      res.status(204).end();
    } else {
      const validatedTag = timeTrackUpdateSchema.safeParse(req.body);
      if (!validatedTag.success) {
        res.status(422).json({ message: 'Validation error' });
        return;
      }
      const { newTitle } = validatedTag.data;
      await user.updateTimeTrack(trackId, newTitle);
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
