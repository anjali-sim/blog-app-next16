import Link from "next/link";

// Custom Not Found page for dynamic routes
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-2xl font-bold text-gray-900">Post Not Found</h2>
      <p className="mt-2 text-gray-600">
        The blog post you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/blog"
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Back to Blog
      </Link>
    </div>
  );
}
