import mongoose from 'mongoose';

import TimeTrack from '@/models/time-track';
import Project from '@/models/project';

export async function connectToDB() {
  const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

  let client;
  try {
    client = await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log(error + ' Db connection failed!');
    throw error;
  }
  return client;
}

// TODO: Add functionality to be able to get also tags and projects if they are available
export async function getUserTimeTracks(userId: mongoose.Types.ObjectId) {
  try {
    await connectToDB();
    const tracks = await TimeTrack.find({ userId }).lean();
    if (!tracks.length) {
      return [];
    }

    return tracks.map((track) => {
      return {
        _id: track._id.toString(),
        title: track.title,
        start: track.start.toISOString(),
        end: track.end.toISOString(),
        tag: track.tag || 'none',
      };
    });
  } catch (error) {
    console.log('Failed to fetch time tracks:', error);
  }
}

// TODO Probably will need some refactor after new features
export async function getUserProjects(userId: mongoose.Types.ObjectId) {
  try {
    await connectToDB();
    const projects = await Project.find({ userId }).lean();
    if (!projects.length) {
      return [];
    }

    return projects.map((project) => {
      return {
        _id: project._id.toString(),
        projectTitle: project.projectTitle,
      };
    });
  } catch (error) {
    console.log('Failed to fetch projects:', error);
  }
}
