import { Skeleton } from "@/components/ui/skeleton"

export function ProjectSkeleton() {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-10 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-40 w-full" />
    </div>
  )
}