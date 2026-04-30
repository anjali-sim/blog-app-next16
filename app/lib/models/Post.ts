import { Schema, model, models } from "mongoose";

export interface IPost {
  _id: string;
  title: string;
  body: string;
  author: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true, default: "Anonymous" },
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const Post = models.Post || model<IPost>("Post", PostSchema);
