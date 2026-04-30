"use client";

import { useActionState } from "react";
import { createPost } from "../actions/postActions";
import { useRef } from "react";

export default function CreatePostForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    async (
      _prevState: { error?: string; success?: boolean; postId?: string } | null,
      formData: FormData,
    ) => {
      const result = await createPost(formData);
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
      className="space-y-4 bg-white border rounded-lg p-6"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Post title"
        />
      </div>

      <div>
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content *
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={5}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="Write your post content..."
        />
      </div>

      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Your name (default: Anonymous)"
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="nextjs, react, tutorial"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Publishing..." : "Publish Post"}
      </button>

      {state?.error && (
        <p className="text-sm text-red-600 mt-2">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-green-600 mt-2">
          ✅ Post published successfully!
        </p>
      )}
    </form>
  );
}
