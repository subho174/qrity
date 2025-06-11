import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col my-25 gap-4 items-center px-4 md:px-12 xl:px-32 max-w-[1400px] mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Ongoing Courses</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full mb-8">
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
      </div>
    </div>
  );
}

const CourseCardSkeleton = () => {
  return (
    <Card className="w-full max-w-xs mx-auto rounded-xl border hover:bg-card border-border py-4">
      <CardHeader className="pb-2 flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-12 rounded-full" />
      </CardHeader>

      <CardContent className="pt-2">
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-6 w-24 rounded-md" />
          <Skeleton className="h-6 w-28 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};
