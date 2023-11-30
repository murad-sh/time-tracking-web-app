import mongoose from 'mongoose';

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
