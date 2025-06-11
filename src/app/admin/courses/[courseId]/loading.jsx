import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="justify-items-center">
      <Card className="w-fit mx-auto my-20 p-6 shadow-lg border-0 hover:bg-card rounded-2xl">
        <CardHeader className="justify-items-center">
          <Skeleton className="h-4 w-32" />
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          <Skeleton className="h-[200px] w-[200px] rounded-xl" />
        </CardContent>

        <CardFooter
          className={
            "grid grid-cols-2 gap-x-4 md:gap-x-0 px-0 gap-y-4 justify-items-center"
          }
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32 col-span-2 justify-self-center" />
        </CardFooter>
      </Card>
      <Skeleton className="h-6 mt-5 w-32" />
    </div>
  );
}
