import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import { Post } from "../../lib/models/Post";

// GET /api/posts — fetch all posts
export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q");

  const filter = q
    ? {
        $or: [
          { title: { $regex: q, $options: "i" } },
          { body: { $regex: q, $options: "i" } },
        ],
      }
    : {};

  const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json(posts);
}

// POST /api/posts — create a new post
export async function POST(request: NextRequest) {
  await connectDB();

  const body = await request.json();
  const { title, body: content, author, tags } = body;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and body are required" },
      { status: 400 },
    );
  }

  const post = await Post.create({
    title,
    body: content,
    author: author || "Anonymous",
    tags: tags || [],
  });

  return NextResponse.json(post, { status: 201 });
}
