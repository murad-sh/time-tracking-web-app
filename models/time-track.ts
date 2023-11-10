import mongoose from 'mongoose';
import { IProject } from './project';

export interface ITimeTrack {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  projectId: mongoose.Schema.Types.ObjectId;
  tags: string[];
  title: string;
  start: Date;
  end: Date;
  addProjectId: (project: IProject) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

const timeTrackSchema = new mongoose.Schema<ITimeTrack>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  tags: [{ type: String }],
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

timeTrackSchema.methods.addProject = async function (project: IProject) {
  this.projectId = project._id;
  await this.save();
};

timeTrackSchema.methods.addTag = async function (tag: string) {
  if (this.tags.includes(tag)) throw new Error(`${tag} already exists`);
  this.tags.push(tag);
  await this.save();
};

const TimeTrack: mongoose.Model<ITimeTrack> =
  mongoose.models.TimeTrack ||
  mongoose.model<ITimeTrack>('TimeTrack', timeTrackSchema);

export default TimeTrack;
