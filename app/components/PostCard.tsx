import Link from "next/link";

interface PostCardProps {
  id: string;
  title: string;
  body: string;
}

// Server Component — no "use client", renders on server
export default function PostCard({ id, title, body }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <Link href={`/blog/${id}`}>
        <h2 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors capitalize">
          {title}
        </h2>
      </Link>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2 capitalize">
        {body}
      </p>
      <Link
        href={`/blog/${id}`}
        prefetch={true}
        className="inline-block mt-3 text-sm text-indigo-600 font-medium hover:underline"
      >
        Read more →
      </Link>
    </article>
  );
}
