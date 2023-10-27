import type { NextApiRequest, NextApiResponse } from 'next';
import { projectSchema } from '@/lib/validations/project';
import { getCurrentUser } from '@/lib/auth/session';
import { connectToDB } from '@/lib/db';
import User from '@/models/user';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }
    const currentUser = await getCurrentUser(req, res);
    if (!currentUser) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const validatedData = projectSchema.safeParse(req.body);
    if (!validatedData.success) {
      res.status(422).json({ message: validatedData.error.message });
      return;
    }

    const { projectTitle } = validatedData.data;
    await connectToDB();

    const user = await User.findOne({ email: currentUser.email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await user.addProject({ projectTitle });
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.log(error);
  }
}
