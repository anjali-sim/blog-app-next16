import { Schema, model, models } from "mongoose";

export interface IComment {
  _id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    postId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true },
);

export const Comment =
  models.Comment || model<IComment>("Comment", CommentSchema);
