import mongoose from 'mongoose';

import TimeTrack, { ITimeTrack } from './time-track';

export interface IUser {
  name: string;
  email: string;
  password: string;
  timeTracks: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  timeTracks: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'TimeTrack', required: false },
  ],
});

userSchema.methods.addTimeTrack = async function (timeTrack: ITimeTrack) {
  const newTimeTrack = await TimeTrack.create({
    ...timeTrack,
    userId: this._id,
  });
  this.timeTracks.push(newTimeTrack._id);
  await this.save();
};

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
