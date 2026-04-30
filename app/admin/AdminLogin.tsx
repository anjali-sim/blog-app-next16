"use client";

import { useActionState } from "react";
import { loginAdmin } from "../actions/postActions";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    async (
      _prevState: { error?: string; success?: boolean } | null,
      formData: FormData,
    ) => {
      const result = await loginAdmin(formData);
      if (result.success) {
        router.refresh();
      }
      return result;
    },
    null,
  );

  return (
    <form
      action={formAction}
      className="bg-white border rounded-lg p-6 space-y-4"
    >
      <p className="text-sm text-gray-600 text-center">
        Enter the admin password to manage posts.
      </p>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter admin password"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      {state?.error && (
        <p className="text-sm text-red-600 text-center">{state.error}</p>
      )}
    </form>
  );
}
