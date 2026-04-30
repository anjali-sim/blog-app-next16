// Streaming — loading skeleton for blog list
export default function Loading() {
  return (
    <div>
      <div className="h-8 bg-gray-200 rounded w-40 mb-6 animate-pulse" />
      <div className="h-10 bg-gray-100 rounded-lg mb-6 animate-pulse" />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white border rounded-lg p-6 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-100 rounded w-full mb-2" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
