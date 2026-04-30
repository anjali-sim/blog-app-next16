"use client";

import { useActionState } from "react";
import { createComment } from "../actions/postActions";
import { useRef } from "react";

export default function CommentForm({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    async (
      _prevState: { error?: string; success?: boolean } | null,
      formData: FormData,
    ) => {
      const result = await createComment(formData);
      if (result.success) {
        formRef.current?.reset();
      }
      return result;
    },
    null,
  );

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-6 bg-gray-50 border rounded-lg p-4 space-y-3"
    >
      <h3 className="font-medium text-sm">Add a Comment</h3>
      <input type="hidden" name="postId" value={postId} />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <textarea
        name="body"
        required
        rows={3}
        placeholder="Write a comment..."
        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
      />

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending ? "Posting..." : "Post Comment"}
      </button>

      {state?.error && <p className="text-xs text-red-600">{state.error}</p>}
      {state?.success && (
        <p className="text-xs text-green-600">✅ Comment added!</p>
      )}
    </form>
  );
}
