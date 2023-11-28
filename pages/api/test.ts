import type { NextApiRequest, NextApiResponse } from 'next';
import { transporter, mailOptions } from '@/emails/config/email-config';

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
