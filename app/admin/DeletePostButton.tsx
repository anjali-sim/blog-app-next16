"use client";

import { useTransition } from "react";
import { deletePost } from "../actions/postActions";
import { useRouter } from "next/navigation";

export default function DeletePostButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    startTransition(async () => {
      await deletePost(postId);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="shrink-0 px-3 py-1 text-xs bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50"
    >
      {isPending ? "..." : "Delete"}
    </button>
  );
}
