"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useAppContext } from "@/src/context/AppContext";
import HandleServerAction from "@/src/components/handleServerAction";
import { getAttendanceData } from "@/src/server/server";
import { Badge } from "@/components/ui/badge";

const CourseCard = ({ course }) => {
  const { setpresentPercentage } = useAppContext();

  return (
    <Card className="lg:w-full 2xl:w-76 gap-2 border-border rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-500 ease-in-out">
      <CardHeader className="pb-0 flex items-center justify-between">
        <CardTitle className="text-xl font-semibold truncate">
          {course.courseName || "Untitled Course"}
        </CardTitle>
        <Badge  className="text-sm px-3 py-1">
          {course.courseCode || "N/A"}
        </Badge>
      </CardHeader>

      <CardContent className="pt-2 space-y-4">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Faculty :</span>{" "}
          {course.facultyDetails.name}
        </div>

        <div className="flex flex-wrap gap-3">
          <HandleServerAction
            submitFunction={getAttendanceData}
            variant="custom"
            btnText="View Attendance"
            loadingBtnText="Fetching..."
            onSuccess={(data) => setpresentPercentage(Number(data))}
          >
            <input type="hidden" name="courseId" value={course._id} />
          </HandleServerAction>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
