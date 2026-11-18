import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const chartBars = [42, 68, 54, 80, 36, 62, 48, 74, 58, 88, 46, 66];

export function DashboardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading dashboard"
      aria-busy="true"
      className="flex w-full flex-col gap-6 p-4 md:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="flex items-center justify-between gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-7 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="size-10 shrink-0 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="gap-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-52" />
          </CardHeader>
          <CardContent>
            <div className="flex h-56 items-end gap-2 md:gap-3">
              {chartBars.map((height, index) => (
                <Skeleton
                  key={index}
                  className="flex-1 rounded-t-md rounded-b-none"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-44" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="size-9 shrink-0 rounded-full" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <Skeleton className="h-4 w-full max-w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-4 border-b pb-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="ml-auto h-3 w-16" />
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="grid grid-cols-4 items-center gap-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-8 shrink-0 rounded-md" />
                <Skeleton className="h-4 w-full max-w-32" />
              </div>
              <Skeleton className="h-4 w-full max-w-40" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="ml-auto h-4 w-20" />
            </div>
          ))}
        </CardContent>
      </Card>

      <span className="sr-only">Loading dashboard…</span>
    </div>
  );
}
