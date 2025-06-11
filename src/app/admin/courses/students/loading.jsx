import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import AttendanceChartSkeleton from "@/src/components/AttendanceChartSkeleton";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 my-25 px-4 md:px-12 xl:px-32 2xl:px-54 lg:grid-cols-5 gap-0 lg:gap-6">
      <AttendanceChartSkeleton />
      <div className="col-span-1 md:col-span-3">
        <div className="bg-background border border-border rounded-2xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-border bg-white">
            <h2 className="text-lg font-semibold">Enrolled Students</h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead className="w-1/2">
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead className="w-1/2">
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loading;
