import type { NextApiRequest, NextApiResponse } from 'next';
import { tagSchema } from '@/lib/validations/tag';
import { getCurrentUser } from '@/lib/auth/session';
import { connectToDB } from '@/lib/utils/db';
import User from '@/models/user';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string[]>
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
    const user = await User.findById(currentUser.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (req.method === 'GET') {
      res.status(200).json(user.tags);
    } else if (req.method === 'POST') {
      const validatedData = tagSchema.safeParse(req.body);
      if (!validatedData.success) {
        res.status(422).json({ message: 'Validation error' });
        return;
      }
      const { tag } = validatedData.data;

      await user.addTag(tag);
      res.status(201).json({ message: 'Tag created' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
