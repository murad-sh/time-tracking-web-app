import mongoose from 'mongoose';

export interface ITimeTrack {
  _id?: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  start: Date;
  end: Date;
}

const timeTrackSchema = new mongoose.Schema<ITimeTrack>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const TimeTrack: mongoose.Model<ITimeTrack> =
  mongoose.models.TimeTrack ||
  mongoose.model<ITimeTrack>('TimeTrack', timeTrackSchema);

export default TimeTrack;
