import type { NextApiRequest, NextApiResponse } from 'next';
import { transporter } from '@/lib/utils/email-config';

const user = process.env.EMAIL;
const mailOptions = {
  from: user,
  to: 'shahbazov.msh@gmail.com',
  subject: 'Test',
  text: 'Hello world!',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await transporter.sendMail({
      ...mailOptions,
    });
    res.status(200).json('Success!');
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
