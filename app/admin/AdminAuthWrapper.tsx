import { cookies } from "next/headers";
import { Suspense } from "react";
import CreatePostForm from "./CreatePostForm";
import AdminPostList from "./AdminPostList";
import AdminLogin from "./AdminLogin";
import LogoutButton from "./LogoutButton";

async function AdminContent() {
  const cookieStore = await cookies();
  const isAuthenticated =
    cookieStore.get("admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <AdminLogin />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin — Manage Posts</h1>
        <LogoutButton />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Create Post Form */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Create New Post</h2>
          <Suspense
            fallback={<div className="text-gray-500">Loading form...</div>}
          >
            <CreatePostForm />
          </Suspense>
        </section>

        {/* Existing Posts */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Existing Posts</h2>
          <Suspense
            fallback={<div className="text-gray-500">Loading posts...</div>}
          >
            <AdminPostList />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

export default function AdminAuthWrapper() {
  return <AdminContent />;
}
