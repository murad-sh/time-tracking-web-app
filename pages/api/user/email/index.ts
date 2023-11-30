import type { NextApiRequest, NextApiResponse } from 'next';
import { transporter } from '@/email/email-config';
import { emailContent } from '@/email/email-content';
import { calculateTotalDuration, calcWeekRange } from '@/lib/utils/date';
import { connectToDB } from '@/lib/utils/db';
import User from '@/models/user';
import { endOfDay } from 'date-fns';

const provider = process.env.EMAIL;
const baseUrl = process.env.NEXTAUTH_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { startDate, endDate } = calcWeekRange();
    const users = await getWeeklyData(startDate, endDate);
    const emailsToSend = users
      .filter((user) => user.timeTracks.length > 0)
      .map((user) =>
        createEmail(user.name, user.email, user.timeTracks, startDate, endDate)
      );

    for (const email of emailsToSend) {
      await transporter.sendMail(email);
    }

    res.status(200).json('Success!');
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

const getWeeklyData = async (startDate: string, endDate: string) => {
  await connectToDB();
  return User.find({})
    .select('name email')
    .populate({
      path: 'timeTracks',
      match: {
        start: { $gte: new Date(startDate) },
        end: { $lte: endOfDay(new Date(endDate)) },
      },
    });
};

const createEmail = (
  username: string,
  email: string,
  timeTracks: any[],
  startDate: string,
  endDate: string
) => {
  const totalDuration = calculateTotalDuration(timeTracks);
  const content = emailContent(
    username,
    startDate,
    endDate,
    totalDuration,
    baseUrl + '/dashboard/reports'
  );

  return {
    from: provider,
    to: email,
    subject: 'Weekly Time Track Report',
    html: content,
  };
};
