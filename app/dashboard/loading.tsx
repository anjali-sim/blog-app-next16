export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-40 mb-6" />
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border rounded-lg p-6 text-center">
            <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2" />
            <div className="h-4 bg-gray-100 rounded w-24 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
