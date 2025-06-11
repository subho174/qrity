import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import AttendanceChartSkeleton from "@/src/components/AttendanceChartSkeleton";

const Loading = () => {
  return (
    <div className="mx-auto my-25 flex flex-col md:w-auto md:mx-12 lg:mx-32 2xl:mx-54">
      <div className="2xl:flex items-start 2xl:h-[50vh]">
        <AttendanceChartSkeleton />

        <div className="w-84 mx-auto">
          <p className="text-xl font-semibold mb-5">Ongoing Courses</p>
          <SkeletonCard />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-10 w-84 mx-auto">
        <p className="text-2xl font-semibold mb-4">More Courses</p>
        <SkeletonCard />
      </div>
    </div>
  );
};

export default Loading;

export const SkeletonCard = () => {
  return (
    <Card className="lg:w-full 2xl:w-76 gap-2 border-0 rounded-2xl shadow-lg hover:bg-card hover:shadow-xl">
      <CardHeader className="pb-0 flex items-center justify-between">
        <CardTitle className="text-xl font-bold text-white truncate">
          <Skeleton className="h-4 w-36 rounded-md" />
        </CardTitle>
        <Skeleton className="h-6 w-24 rounded-md" />
      </CardHeader>
      <CardContent className="pt-2 space-y-4">
        <div className="text-sm flex gap-2 text-muted-foreground">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>

        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-6 w-36 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};
