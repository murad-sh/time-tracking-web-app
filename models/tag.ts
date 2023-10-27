import mongoose from 'mongoose';

export interface ITag {
  _id?: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  tagName: string;
}

const tagSchema = new mongoose.Schema<ITag>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  tagName: { type: String, required: true },
});

const Tag: mongoose.Model<ITag> =
  mongoose.models.Tag || mongoose.model<ITag>('Tag', tagSchema);

export default Tag;
