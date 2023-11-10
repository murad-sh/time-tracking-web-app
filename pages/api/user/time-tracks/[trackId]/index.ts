import type { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentUser } from '@/lib/auth/session';
import { connectToDB } from '@/lib/db';
import TimeTrack, { ITimeTrack } from '@/models/time-track';
import { tagSchema } from '@/lib/validations/tag';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH')
    return res.status(405).json({ message: 'Method not allowed' });
  try {
    const currentUser = await getCurrentUser(req, res);
    if (!currentUser) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    // !For now api is only available for adding tags
    // TODO : Add also the check to add projects
    const validatedTag = tagSchema.safeParse(req.body);
    if (!validatedTag.success) {
      res.status(422).json({ message: 'Validation error' });
      return;
    }
    const tag = validatedTag.data;

    const { trackId } = req.query;
    await connectToDB();
    const timeTrack = await TimeTrack.findOne({ _id: trackId });
    if (!timeTrack || timeTrack.userId.toString() !== currentUser.id) {
      return res.status(404).json({
        message: 'Time Track not found',
      });
    }
    console.log(timeTrack.tags);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Message' });
  }
}
