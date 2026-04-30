import { cacheLife, cacheTag } from "next/cache";
import { connectDB } from "./mongodb";
import { Post as PostModel } from "./models/Post";
import { Comment as CommentModel } from "./models/Comment";

// Data-level caching with "use cache" directive (Next.js 16)

export interface Post {
  _id: string;
  title: string;
  body: string;
  author: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogComment {
  _id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// Cached function: posts are revalidated every hour
export async function getCachedPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("hours"); // built-in profile: revalidate every hour
  cacheTag("posts"); // tag for on-demand revalidation

  await connectDB();
  const posts = await PostModel.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(posts));
}

// Cached function: single post cached for 2 hours
export async function getCachedPost(id: string): Promise<Post | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(`post-${id}`);

  await connectDB();
  const post = await PostModel.findById(id).lean();
  if (!post) return null;
  return JSON.parse(JSON.stringify(post));
}

// Cached function: comments cached with "days" profile
export async function getCachedComments(
  postId: string,
): Promise<BlogComment[]> {
  "use cache";
  cacheLife("days"); // comments rarely change, cache longer
  cacheTag(`comments-${postId}`);

  await connectDB();
  const comments = await CommentModel.find({ postId })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(comments));
}

// Cached function: stats using external API (users)
export async function getCachedUsers(): Promise<User[]> {
  "use cache";
  cacheLife("max"); // cache as long as possible
  cacheTag("users");

  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
}
