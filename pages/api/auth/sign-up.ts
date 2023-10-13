import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/lib/db';
import User from '@/models/user';
import z from 'zod';
import { hashPassword } from '@/lib/auth';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, password } = req.body;
  await connectToDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(422).json({ message: 'Email already in use' });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  await user.save();

  res.status(201).json({ message: 'Created user!' });
}
