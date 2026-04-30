import { getCachedPosts } from "../lib/data";
import DeletePostButton from "./DeletePostButton";

export default async function AdminPostList() {
  const posts = await getCachedPosts();

  if (posts.length === 0) {
    return <p className="text-gray-500">No posts yet. Create one!</p>;
  }

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white border rounded-lg p-4 flex items-start justify-between gap-3"
        >
          <div className="min-w-0">
            <h3 className="font-medium text-sm truncate">{post.title}</h3>
            <p className="text-xs text-gray-500 mt-1">
              By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
          <DeletePostButton postId={post._id} />
        </div>
      ))}
    </div>
  );
}
