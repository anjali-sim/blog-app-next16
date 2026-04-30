import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LikeButton from "../../components/LikeButton";
import {
  getCachedPost,
  getCachedComments,
  getCachedPosts,
} from "../../lib/data";
import CommentForm from "../../components/CommentForm";
import type { BlogComment } from "../../lib/data";

// Dynamic Metadata — SEO per post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getCachedPost(id);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.body.slice(0, 160),
  };
}

// generateStaticParams — Static Generation for known paths (Performance Optimization)
export async function generateStaticParams() {
  const posts = await getCachedPosts();
  return posts.slice(0, 10).map((post) => ({ id: post._id }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Parallel data fetching using cached functions
  const [post, comments] = await Promise.all([
    getCachedPost(id),
    getCachedComments(id),
  ]);

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold capitalize">{post.title}</h1>
      <p className="mt-1 text-sm text-gray-500">By: {post.author}</p>

      <div className="mt-6 prose prose-gray max-w-none">
        <p className="capitalize text-gray-700 leading-relaxed">{post.body}</p>
        <p className="capitalize text-gray-700 leading-relaxed">{post.body}</p>
      </div>

      {/* Client Component inside Server Component */}
      <div className="mt-6">
        <LikeButton />
      </div>

      {/* Comments Section */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Comments ({comments.length})
        </h2>
        <div className="space-y-4">
          {comments.map((comment: BlogComment) => (
            <div key={comment._id} className="bg-white border rounded-lg p-4">
              <p className="font-medium text-sm text-indigo-600">
                {comment.name}
              </p>
              <p className="text-xs text-gray-400">{comment.email}</p>
              <p className="mt-2 text-sm text-gray-600 capitalize">
                {comment.body}
              </p>
            </div>
          ))}
        </div>

        {/* Add Comment Form — Client Component with Server Action */}
        <CommentForm postId={id} />
      </section>
    </article>
  );
}
