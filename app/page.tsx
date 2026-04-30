import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome to <span className="text-indigo-600">TechBlog</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-md">
        A mini developer blog platform built with Next.js 16 showcasing App
        Router, Server/Client Components, Caching, Data Fetching, Middleware &
        more.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/blog"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Read Blog
        </Link>
        <Link
          href="/dashboard"
          className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
