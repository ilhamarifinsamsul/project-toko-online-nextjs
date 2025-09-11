import { Skeleton } from "@/components/ui/skeleton";

export default function ListProductSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div id="picked" className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" /> {/* Title skeleton */}
        <Skeleton className="h-10 w-28 rounded-full" /> {/* Button skeleton */}
      </div>

      <div className="grid grid-cols-5 gap-[30px]">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] w-full"
          >
            {/* Gambar Produk */}
            <Skeleton className="w-full h-[90px] rounded-md" />

            {/* Info Produk */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-32" /> {/* Nama produk */}
                <Skeleton className="h-3 w-20" /> {/* Kategori */}
              </div>
              <Skeleton className="h-4 w-24" /> {/* Harga */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
