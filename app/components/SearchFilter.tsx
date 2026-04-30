"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

// Client Component — interactive search with transitions
export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }
      router.push(`/blog?${params.toString()}`);
    });
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search posts..."
        defaultValue={searchParams.get("q") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
      />
      {isPending && (
        <span className="absolute right-3 top-2.5 text-xs text-gray-400">
          Loading...
        </span>
      )}
    </div>
  );
}
