import type { Metadata } from "next";
import { getCachedPosts, getCachedUsers } from "../lib/data";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Blog analytics dashboard",
};

// Server Component using cached data functions (use cache + cacheLife + cacheTag)
async function getStats() {
  const [posts, users] = await Promise.all([
    getCachedPosts(),
    getCachedUsers(),
  ]);
  return { totalPosts: posts.length, totalUsers: users.length };
}

export default async function DashboardPage() {
  const { totalPosts, totalUsers } = await getStats();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Posts" value={totalPosts} />
        <StatCard label="Total Authors" value={totalUsers} />
        <StatCard
          label="Avg Posts/Author"
          value={Math.round(totalPosts / totalUsers)}
        />
      </div>

      <div className="mt-8 bg-white border rounded-lg p-6">
        <h2 className="font-semibold mb-3">About This POC</h2>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>App Router with nested layouts & dynamic routes</li>
          <li>Server Components (data fetching, PostCard, pages)</li>
          <li>Client Components (Navbar, SearchFilter, LikeButton)</li>
          <li>
            Caching with &quot;use cache&quot;, cacheLife &amp; cacheTag (v16)
          </li>
          <li>Parallel data fetching with Promise.all</li>
          <li>Streaming with loading.tsx skeletons</li>
          <li>SEO with static & dynamic metadata</li>
          <li>generateStaticParams for SSG</li>
          <li>Middleware for security headers & logging</li>
          <li>Turbopack (default in Next.js 16 dev)</li>
          <li>Tailwind CSS for styling</li>
          <li>Performance: code splitting, font optimization</li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border rounded-lg p-6 text-center">
      <p className="text-3xl font-bold text-indigo-600">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
