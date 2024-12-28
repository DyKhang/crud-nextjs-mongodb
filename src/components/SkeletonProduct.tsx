import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonProduct() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <Skeleton className="h-[325px] rounded-xl" />
      <Skeleton className="h-[325px] rounded-xl" />
      <Skeleton className="h-[325px] rounded-xl" />
      <Skeleton className="h-[325px] rounded-xl" />
      <Skeleton className="h-[325px] rounded-xl" />
    </div>
  );
}
