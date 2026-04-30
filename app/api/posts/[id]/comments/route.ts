import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import { Comment } from "../../../../lib/models/Comment";

// GET /api/posts/[id]/comments — fetch comments for a post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;

  const comments = await Comment.find({ postId: id })
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json(comments);
}

// POST /api/posts/[id]/comments — add a comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const body = await request.json();

  const { name, email, body: content } = body;

  if (!name || !email || !content) {
    return NextResponse.json(
      { error: "name, email, and body are required" },
      { status: 400 },
    );
  }

  const comment = await Comment.create({
    postId: id,
    name,
    email,
    body: content,
  });

  return NextResponse.json(comment, { status: 201 });
}
