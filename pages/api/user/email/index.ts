import type { NextApiRequest, NextApiResponse } from 'next';
import { transporter } from '@/email/email-config';
import { emailContent } from '@/email/email-content';
import {
  calculateTotalDuration,
  getISOWeekDateRange,
  isTodayMonday,
} from '@/lib/utils/date';
import { connectToDB } from '@/lib/utils/db';
import User from '@/models/user';
import EmailReport from '@/models/email-report';

const provider = process.env.EMAIL;
const baseUrl = process.env.NEXTAUTH_URL + '/dashboard/reports';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!isTodayMonday()) return res.status(403).json('Forbidden');

    const { startDate, endDate } = getISOWeekDateRange(-1);
    await connectToDB();
    const existingReport = await EmailReport.findOne({
      startDate,
      endDate,
    });

    if (existingReport)
      return res.status(409).json('Report already exists for this date range');

    const users = await getWeeklyData(startDate, endDate);
    let emailsToSend = [];
    for (const user of users) {
      if (user.timeTracks.length > 0)
        emailsToSend.push(
          createEmail(
            user.name,
            user.email,
            user.timeTracks,
            startDate,
            endDate
          )
        );
    }

    for (const email of emailsToSend) {
      await transporter.sendMail(email);
    }

    const emailReport = new EmailReport({
      startDate,
      endDate,
    });
    await emailReport.save();
    res.status(200).json('Success!');
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

const getWeeklyData = (startDate: string, endDate: string) => {
  return User.find({})
    .select('name email')
    .populate({
      path: 'timeTracks',
      match: {
        start: { $gte: startDate },
        end: { $lte: endDate },
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
    new Date(startDate).toLocaleDateString(),
    new Date(endDate).toLocaleDateString(),
    totalDuration,
    baseUrl + `?start=${startDate}&end=${endDate}`
  );

  return {
    from: provider,
    to: email,
    subject: 'Weekly Time Track Report',
    html: content,
  };
};
