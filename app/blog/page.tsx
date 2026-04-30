import { Suspense } from "react";
import PostCard from "../components/PostCard";
import SearchFilter from "../components/SearchFilter";
import { getCachedPosts } from "../lib/data";
import type { Post } from "../lib/data";

// Data Fetching using "use cache" + cacheLife + cacheTag (v16 Cache Components)
async function getPosts(query?: string): Promise<Post[]> {
  const posts = await getCachedPosts(); // uses cached data layer

  const filtered = query
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.body.toLowerCase().includes(query.toLowerCase()),
      )
    : posts;

  return filtered.slice(0, 12);
}

// SEO metadata for this route
export const metadata = {
  title: "Blog",
  description: "Browse all developer blog posts",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const posts = await getPosts(q);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
      </div>

      {/* Client Component for interactivity inside Server Component */}
      <Suspense
        fallback={<div className="h-10 bg-gray-100 rounded-lg animate-pulse" />}
      >
        <SearchFilter />
      </Suspense>

      <div className="grid gap-4 mt-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            id={post._id}
            title={post.title}
            body={post.body}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No posts found.</p>
      )}
    </div>
  );
}
