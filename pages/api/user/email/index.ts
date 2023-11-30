import type { NextApiRequest, NextApiResponse } from 'next';
import { transporter } from '@/email/email-config';
import { emailContent } from '@/email/email-content';

const user = process.env.EMAIL;
const baseUrl = process.env.NEXTAUTH_URL;

const receiver = 'shahbazov.msh@gmail.com';
const mailOptions = {
  from: user,
  to: receiver,
  subject: 'Weekly reports from TimeTracker',
  html: emailContent(
    'Murad Shahbazov',
    '03.08.2023',
    '10.08.2023',
    '1h',
    baseUrl + '/dashboard/reports'
  ),
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
