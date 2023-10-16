import mongoose from 'mongoose';

import TimeTrack from '@/models/time-track';

export async function connectToDB() {
  const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

  let client;
  try {
    client = await mongoose.connect(MONGODB_URI);
    console.log('DB Connected');
  } catch (error) {
    console.log(error + ' Db connection failed!');
  }
  return client;
}

// ! TEMPORARY FUNCTION
export async function getUserTimeTracks(userId: mongoose.Types.ObjectId) {
  try {
    await connectToDB();
    const tracks = await TimeTrack.find({ userId: userId }).exec();
    if (!tracks.length) {
      return [];
    }
    return tracks;
  } catch (error) {
    console.error('Failed to fetch time tracks:', error);
  }
}
