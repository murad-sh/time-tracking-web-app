import mongoose from 'mongoose';

import TimeTrack, { ITimeTrack } from './time-track';
import Project, { IProject } from './project';

export interface IUser {
  name: string;
  email: string;
  password: string;
  timeTracks: mongoose.Schema.Types.ObjectId[];
  projects: mongoose.Schema.Types.ObjectId[];
  tags: string[];
  addTimeTrack: (timeTrack: ITimeTrack) => Promise<void>;
  addProject: (project: IProject) => Promise<void>;
  addTag: (tag: string) => Promise<void>;
  deleteTag: (tag: string) => Promise<void>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  timeTracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeTrack' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  tags: [{ type: String }],
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

userSchema.methods.addTag = async function (tag: string) {
  if (this.tags.includes(tag)) throw new Error(`${tag} already exists`);
  this.tags.push(tag);
  await this.save();
};

userSchema.methods.deleteTag = async function (tag: string) {
  if (!this.tags.includes(tag)) throw new Error(`${tag} does not exists`);
  this.tags.pull(tag);
  await this.save();
};

// !Modify this for project deletion
// userSchema.methods.deleteTag = async function (tagId: string) {
//   try {
//     const tag = await Tag.findOne({ _id: tagId, userId: this._id });
//     if (!tag) {
//       throw new Error('Tag not found or not associated with the user.');
//     }
//     this.tags.pull(tagId);
//     await this.save();
//     await Tag.deleteOne({ _id: tagId });
//   } catch (error) {
//     throw error;
//   }
// };

const User: mongoose.Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
