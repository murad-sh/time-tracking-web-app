import type { NextApiRequest, NextApiResponse } from 'next';
import { timeTrackSchema } from '@/lib/validations/time-track';
import User from '@/models/user';
import { connectToDB } from '@/lib/utils/db';
import { getCurrentUser } from '@/lib/auth/session';
import TimeTrack, { ITimeTrack } from '@/models/time-track';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ITimeTrack[]>
) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const currentUser = await getCurrentUser(req, res);
    if (!currentUser) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    await connectToDB();

    if (req.method === 'GET') {
      const { startDate, endDate } = req.query;
      let query: Record<string, any> = { userId: currentUser.id };

      if (startDate && endDate) {
        query = {
          ...query,
          start: { $gte: startDate },
          end: { $lte: endDate },
        };
      }

      const timeTracks = await TimeTrack.find(query);
      res.status(200).json(timeTracks);
    } else if (req.method === 'POST') {
      const validatedData = timeTrackSchema.safeParse(req.body);
      if (!validatedData.success) {
        res.status(422).json({ message: validatedData.error.message });
        return;
      }

      const user = await User.findById(currentUser.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      await user.addTimeTrack(validatedData.data as ITimeTrack);
      res.status(201).json({ message: 'Time Track added' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
