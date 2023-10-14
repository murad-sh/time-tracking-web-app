import mongoose from 'mongoose';
import User from '@/models/user';

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

export function findUserByEmail(email: string) {
  return User.findOne({ email });
}
