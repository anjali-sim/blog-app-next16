import type { Metadata } from "next";
import { Suspense } from "react";
import AdminAuthWrapper from "./AdminAuthWrapper";

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage blog posts",
};

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <AdminAuthWrapper />
    </Suspense>
  );
}
