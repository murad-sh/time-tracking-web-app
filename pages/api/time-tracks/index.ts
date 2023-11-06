import type { NextApiRequest, NextApiResponse } from 'next';
import { timeTrackSchema } from '@/lib/validations/time-track';
import User from '@/models/user';
import { connectToDB } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import TimeTrack, { ITimeTrack } from '@/models/time-track';

type Data = {
  message: string;
  timeTracks?: ITimeTrack[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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
      const timeTracks = await TimeTrack.find({ userId: currentUser.id });

      res.status(200).json({ message: 'Success', timeTracks });
    } else if (req.method === 'POST') {
      const validatedData = timeTrackSchema.safeParse(req.body);
      if (!validatedData.success) {
        res.status(422).json({ message: validatedData.error.message });
        return;
      }

      const { title, start, end } = validatedData.data;
      const user = await User.findOne({ _id: currentUser.id });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      await user.addTimeTrack({ title, start, end });
      res.status(201).json({ message: 'Success' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
