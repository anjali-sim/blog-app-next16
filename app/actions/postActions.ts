"use server";

import { connectDB } from "../lib/mongodb";
import { Post } from "../lib/models/Post";
import { Comment } from "../lib/models/Comment";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

// Simple admin check
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password") as string;

  // Simple password check (in production, use proper auth like NextAuth)
  if (password === "admin123") {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }
  return { error: "Invalid password" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}

export async function checkAdmin(): Promise<boolean> {
  return isAdmin();
}

export async function createPost(formData: FormData) {
  if (!(await isAdmin())) {
    return { error: "Unauthorized. Please login as admin." };
  }

  try {
    await connectDB();

    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const author = (formData.get("author") as string) || "Anonymous";
    const tagsRaw = formData.get("tags") as string;
    const tags = tagsRaw
      ? tagsRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    if (!title || !body) {
      return { error: "Title and body are required" };
    }

    const post = await Post.create({ title, body, author, tags });

    // updateTag invalidates the cache for Server Actions (read-your-own-writes)
    updateTag("posts");

    return { success: true, postId: post._id.toString() };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Failed to create post. Please try again." };
  }
}

export async function deletePost(postId: string) {
  if (!(await isAdmin())) {
    return { error: "Unauthorized" };
  }

  try {
    await connectDB();

    await Post.findByIdAndDelete(postId);
    await Comment.deleteMany({ postId });

    updateTag("posts");
    updateTag(`post-${postId}`);
    updateTag(`comments-${postId}`);

    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { error: "Failed to delete post. Please try again." };
  }
}

export async function createComment(formData: FormData) {
  try {
    await connectDB();

    const postId = formData.get("postId") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const body = formData.get("body") as string;

    if (!postId || !name || !email || !body) {
      return { error: "All fields are required" };
    }

    await Comment.create({ postId, name, email, body });

    updateTag(`comments-${postId}`);

    return { success: true };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { error: "Failed to create comment. Please try again." };
  }
}
