import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AttendanceChartSkeleton = () => {
  return (
    <Card className="col-span-1 md:col-span-2 mb-20 h-92 gap-0 justify-between border-2 border-white/20 rounded-none md:rounded-2xl hover:bg-card hover:scale-105 transition-all duration-500 2xl:basis-[36%]">
      <CardHeader className="items-center px-0">
        <CardTitle className="text-center text-xl">
          Attendance Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="flex px-0 items-center justify-center h-full">
        <div className="flex flex-col gap-4 items-center justify-center h-full text-center text-lg text-muted-foreground">
          <CardTitle>
            <Skeleton className="h-4 w-36 rounded-md" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-48 rounded-md" />
          </CardDescription>
        </div>
      </CardContent>

      <CardFooter className="flex px-0 justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          Present
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          Absent
        </div>
      </CardFooter>
    </Card>
  );
};

export default AttendanceChartSkeleton;
