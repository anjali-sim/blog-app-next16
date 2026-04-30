import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import { Post } from "../../lib/models/Post";

// GET /api/seed — seed database with sample data
export async function GET() {
  await connectDB();

  const existingCount = await Post.countDocuments();
  if (existingCount > 0) {
    return NextResponse.json({
      message: `Database already has ${existingCount} posts. Skipping seed.`,
    });
  }

  const samplePosts = [
    {
      title: "Getting Started with Next.js 16",
      body: "Next.js 16 introduces Cache Components, the proxy file convention replacing middleware, and Turbopack as the default bundler for development. This guide walks you through the key changes.",
      author: "Anjali",
      tags: ["nextjs", "react", "tutorial"],
    },
    {
      title: "Understanding use cache Directive",
      body: "The 'use cache' directive in Next.js 16 allows you to cache async functions and components. Combined with cacheLife and cacheTag, it provides fine-grained control over data freshness.",
      author: "Anjali",
      tags: ["nextjs", "caching", "performance"],
    },
    {
      title: "Server vs Client Components in React 19",
      body: "React Server Components run only on the server, reducing bundle size and enabling direct data access. Client Components handle interactivity. Learn when to use which.",
      author: "Anjali",
      tags: ["react", "server-components", "architecture"],
    },
    {
      title: "Building RESTful APIs with Next.js Route Handlers",
      body: "Route Handlers in Next.js App Router let you create API endpoints using the Web Request/Response APIs. They support GET, POST, PUT, DELETE and more.",
      author: "Anjali",
      tags: ["nextjs", "api", "rest"],
    },
    {
      title: "MongoDB with Mongoose in Next.js",
      body: "Learn how to connect MongoDB using Mongoose in a Next.js application. We cover connection pooling, model definitions, and best practices for serverless environments.",
      author: "Anjali",
      tags: ["mongodb", "mongoose", "database"],
    },
    {
      title: "Proxy File Convention in Next.js 16",
      body: "Next.js 16 renames middleware.ts to proxy.ts. The proxy function intercepts requests before they reach your routes, perfect for security headers, logging, and redirects.",
      author: "Anjali",
      tags: ["nextjs", "proxy", "security"],
    },
    {
      title: "Streaming and Suspense in Next.js",
      body: "Streaming allows you to progressively render UI from the server. Combined with React Suspense, you can show loading states while data fetches complete in the background.",
      author: "Anjali",
      tags: ["nextjs", "streaming", "performance"],
    },
    {
      title: "SEO with Dynamic Metadata in Next.js",
      body: "Next.js provides generateMetadata for dynamic SEO. You can set title, description, Open Graph tags, and more based on route parameters and fetched data.",
      author: "Anjali",
      tags: ["nextjs", "seo", "metadata"],
    },
  ];

  const posts = await Post.insertMany(samplePosts);
  return NextResponse.json({
    message: `Seeded ${posts.length} posts successfully!`,
    posts,
  });
}
