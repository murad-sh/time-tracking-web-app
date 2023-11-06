import mongoose from 'mongoose';

import TimeTrack, { ITimeTrack } from './time-track';
import Project, { IProject } from './project';
import Tag, { ITag } from './tag';

export interface IUser {
  name: string;
  email: string;
  password: string;
  timeTracks?: mongoose.Schema.Types.ObjectId[];
  projects?: mongoose.Schema.Types.ObjectId[];
  tags?: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  timeTracks: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'TimeTrack', required: false },
  ],
  projects: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false },
  ],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: false }],
});

userSchema.methods.addTimeTrack = async function (timeTrack: ITimeTrack) {
  const newTimeTrack = await TimeTrack.create({
    ...timeTrack,
    userId: this._id,
  });
  this.timeTracks.push(newTimeTrack._id);
  await this.save();
};

userSchema.methods.addProject = async function (project: IProject) {
  const newProject = await Project.create({
    ...project,
    userId: this._id,
  });

  this.projects.push(newProject._id);
  await this.save();
};

userSchema.methods.addTag = async function (tag: ITag) {
  const newTag = await Tag.create({
    ...tag,
    userId: this._id,
  });

  this.tags.push(newTag._id);
  await this.save();
};

userSchema.methods.deleteTag = async function (tag: ITag) {};

// Method to delete a tag and remove its reference from the user
// tagSchema.methods.deleteTagAndUpdateUser = async function() {
//   const tag = this;
//   try {
// Delete the tag itself
//     await tag.remove();

// Remove the tag from the user's tags array
//     await mongoose.model('User').updateOne(
//       { _id: tag.userId },
//       { $pull: { tags: tag._id } }
//     );
//   } catch (error) {
//     throw new Error('Error deleting tag and updating user: ' + error.message);
//   }
// };

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
