import mongoose from 'mongoose';

export interface IProject {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  projectTitle: string;
}

const projectSchema = new mongoose.Schema<IProject>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  projectTitle: { type: String, required: true },
});

const Project: mongoose.Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project;
