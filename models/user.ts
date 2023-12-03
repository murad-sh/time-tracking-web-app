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
  updateTimeTrack: (trackId: string, newTitle: string) => Promise<void>;
  deleteTimeTrack: (trackId: string) => Promise<void>;
  addProject: (project: IProject) => Promise<void>;
  updateProject: (projectId: string, newTitle: string) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  addTag: (tag: string) => Promise<void>;
  updateTag: (tag: string, newTag: string) => Promise<void>;
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

userSchema.methods.updateTimeTrack = async function (
  trackId: string,
  newTitle: string
) {
  const result = await TimeTrack.findOne({ _id: trackId, userId: this._id });
  if (!result) {
    throw new Error('Time track not found or does not belong to the user');
  }
  result.title = newTitle;
  await result.save();
};

userSchema.methods.deleteTimeTrack = async function (trackId: string) {
  const result = await TimeTrack.deleteOne({ _id: trackId, userId: this._id });
  if (result.deletedCount === 0) {
    throw new Error('Time track not found or does not belong to the user');
  }

  this.timeTracks.pull(trackId);
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

userSchema.methods.updateProject = async function (
  projectId: string,
  newTitle: string
) {
  const project = await Project.findOne({ _id: projectId, userId: this._id });
  if (!project) {
    throw new Error('Project not found or not associated with the user.');
  }
  const existingTitle = await Project.findOne({
    projectTitle: newTitle,
  });
  if (existingTitle) {
    throw new Error('A project with this title already exists.');
  }

  project.projectTitle = newTitle;
  await project.save();
};

userSchema.methods.deleteProject = async function (projectId: string) {
  const project = await Project.findOne({ _id: projectId, userId: this._id });
  if (!project) {
    throw new Error('Project not found or not associated with the user.');
  }
  this.projects.pull(projectId);
  await this.save();
  await Project.deleteOne({ _id: projectId });
  await TimeTrack.updateMany(
    { projectId: projectId },
    { $unset: { projectId: '' } }
  );
};

userSchema.methods.addTag = async function (tag: string) {
  if (this.tags.includes(tag)) throw new Error('Tag already exists');
  this.tags.push(tag);
  await this.save();
};

userSchema.methods.updateTag = async function (tag: string, newTag: string) {
  if (!this.tags.includes(tag)) throw new Error('Tag does not exists');
  if (this.tags.includes(newTag)) throw new Error('New tag already exists');
  const tagIndex = this.tags.indexOf(tag);
  this.tags[tagIndex] = newTag;
  await this.save();
  await TimeTrack.updateMany({ tag: tag }, { $set: { tag: newTag } });
};

userSchema.methods.deleteTag = async function (tag: string) {
  if (!this.tags.includes(tag)) throw new Error(`${tag} does not exists`);
  this.tags.pull(tag);
  await this.save();
  await TimeTrack.updateMany({ tag: tag }, { $unset: { tag: '' } });
};

const User: mongoose.Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
