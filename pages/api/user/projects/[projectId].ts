import type { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentUser } from '@/lib/auth/session';
import { connectToDB } from '@/lib/utils/db';
import User from '@/models/user';
import Project from '@/models/project';
import TimeTrack from '@/models/time-track';
import { projectSchema } from '@/lib/validations/project';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method !== 'GET' &&
    req.method !== 'DELETE' &&
    req.method !== 'PATCH'
  ) {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const currentUser = await getCurrentUser(req, res);
    if (!currentUser) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    await connectToDB();
    const user = await User.findById(currentUser.id);
    if (!user)
      return res.status(404).json({
        message: 'User not found',
      });

    const { projectId } = req.query;

    if (req.method === 'GET') {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      const timeTracks = await TimeTrack.find({
        projectId: projectId,
      }).select('title start end');

      const projectWithTimeTracks = {
        ...project.toObject(),
        timeTracks: timeTracks,
      };

      res.status(200).json(projectWithTimeTracks);
    } else if (req.method === 'DELETE') {
      await user.deleteProject(projectId as string);
      res.status(204).end();
    } else {
      const validatedData = projectSchema.safeParse(req.body);
      if (!validatedData.success) {
        res.status(422).json({ message: 'Validation error' });
        return;
      }
      const { projectTitle } = validatedData.data;
      await user.updateProject(projectId as string, projectTitle);
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Message' });
  }
}
