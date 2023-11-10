import type { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentUser } from '@/lib/auth/session';
import { connectToDB } from '@/lib/db';
import TimeTrack from '@/models/time-track';
import { timeTrackUpdateSchema } from '@/lib/validations/time-track';
import Project from '@/models/project';
import User from '@/models/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH' && req.method !== 'DELETE')
    return res.status(405).json({ message: 'Method not allowed' });
  try {
    const currentUser = await getCurrentUser(req, res);
    if (!currentUser) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    const { trackId } = req.query;
    await connectToDB();
    if (req.method === 'DELETE') {
      const user = await User.findById(currentUser.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      await user.deleteTimeTrack(trackId as string);
      res.status(204).end();
    } else {
      const validatedTag = timeTrackUpdateSchema.safeParse(req.body);
      if (!validatedTag.success) {
        res.status(422).json({ message: 'Validation error' });
        return;
      }
      const { tag, projectId, title } = validatedTag.data;

      const timeTrack = await TimeTrack.findById(trackId);

      if (!timeTrack || timeTrack.userId.toString() !== currentUser.id) {
        return res.status(404).json({
          message: 'Time Track not found',
        });
      }
      if (title) {
        await timeTrack.updateTitle(title);
      }
      if (projectId) {
        const project = await Project.findById(projectId);
        if (!project || project.userId.toString() !== currentUser.id) {
          return res.status(404).json({
            message: 'Project not found',
          });
        }
        await timeTrack.addProject(project.id);
      }
      if (tag) {
        await timeTrack.addTag(tag);
      }
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
