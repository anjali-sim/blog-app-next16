"use client";

import { useState } from "react";

// Client Component — interactive state
export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button
      onClick={() => setLikes((prev) => prev + 1)}
      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm"
    >
      ❤️ {likes} {likes === 1 ? "Like" : "Likes"}
    </button>
  );
}
