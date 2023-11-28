import mongoose from 'mongoose';

export interface ITimeTrack {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  projectId?: mongoose.Schema.Types.ObjectId;
  tag?: string;
  title: string;
  start: Date;
  end: Date;
  addProject: (projectId: string) => Promise<void>;
  addTag: (tag: string) => Promise<void>;
  removeTag: (tag: string) => Promise<void>;
  updateTitle: (title: string) => Promise<void>;
}

const timeTrackSchema = new mongoose.Schema<ITimeTrack>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  tag: { type: String },
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

timeTrackSchema.methods.addProject = async function (projectId: string) {
  this.projectId = projectId;
  await this.save();
};

timeTrackSchema.methods.addTag = async function (tag: string) {
  this.tag = tag;
  await this.save();
};

timeTrackSchema.methods.updateTitle = async function (title: string) {
  this.title = title;
  await this.save();
};

const TimeTrack: mongoose.Model<ITimeTrack> =
  mongoose.models.TimeTrack ||
  mongoose.model<ITimeTrack>('TimeTrack', timeTrackSchema);

export default TimeTrack;
