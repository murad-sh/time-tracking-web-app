import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/lib/utils/db';
import User from '@/models/user';
import { hashPassword } from '@/lib/utils/hash';
import { signUpSchema } from '@/lib/validations/auth';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method Not Allowed',
    });
  }

  try {
    const validatedData = signUpSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(422).json({ message: validatedData.error.message });
    }

    const { name, email, password } = validatedData.data;

    await connectToDB();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ message: 'User Created' });
  } catch (error) {
    console.error('Error in API handler:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
