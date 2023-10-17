import type { NextApiRequest, NextApiResponse } from 'next';
import { timeTrackSchema } from '@/lib/validation/schemas';
import { getServerSession } from 'next-auth';
import User from '@/models/user';
import { connectToDB } from '@/lib/db';
import { authOptions } from './auth/[...nextauth]';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log(req.body);
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const validatedData = timeTrackSchema.safeParse(req.body);
    if (!validatedData.success) {
      res.status(422).json({ message: validatedData.error.message });
      return;
    }

    const { title, start, end } = validatedData.data;
    await connectToDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    await user.addTimeTrack({ title, start, end });
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
