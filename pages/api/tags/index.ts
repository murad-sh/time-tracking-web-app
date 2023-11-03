import type { NextApiRequest, NextApiResponse } from 'next';
import { tagSchema } from '@/lib/validations/tag';
import { getCurrentUser } from '@/lib/auth/session';
import { connectToDB } from '@/lib/db';
import User from '@/models/user';
import Tag, { ITag } from '@/models/tag';

type Data = {
  message: string;
  tags?: ITag[];
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
      const tags = await Tag.find({ userId: currentUser.id });

      res.status(200).json({ message: 'Success', tags });
    } else if (req.method === 'POST') {
      const validatedData = tagSchema.safeParse(req.body);
      if (!validatedData.success) {
        res.status(422).json({ message: validatedData.error.message });
        return;
      }

      const { tagName } = validatedData.data;
      const user = await User.findOne({ email: currentUser.email });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      await user.addTag(tagName);
      res.status(201).json({ message: 'Tag created' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
