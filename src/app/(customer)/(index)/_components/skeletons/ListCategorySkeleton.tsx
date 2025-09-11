import { Skeleton } from "@/components/ui/skeleton";

export default function ListCategorySkeleton({
  count = 8,
}: {
  count?: number;
}) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4"
        >
          {/* Icon bulat */}
          <Skeleton className="w-12 h-12 rounded-full" />

          {/* Text */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
