export const dynamic = "force-dynamic";

import Course from "@/src/model/courseSchema.model";
import connectDB from "@/src/db/connectDB";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import HandleServerAction from "@/src/components/handleServerAction";
import { joinCourse } from "@/src/server/server";
import fetchUserAtServer from "@/src/utils/fetchUserAtServer";
import Student from "@/src/model/studentSchema.model";
const OptedCourses = lazy(() => import("./OptedCourses"));
import { Badge } from "@/components/ui/badge";
import { lazy, Suspense } from "react";
import { SkeletonCard } from "./loading.jsx";
import ClientWrapper from "@/src/components/ClientWrapper.jsx";

export const metadata = {
  title: "Your Courses - QRity",
  description: "View joined and available courses, and track your attendance.",
  keywords: [
    "joined courses",
    "student courses",
    "attendance chart",
    "opt courses",
  ],
  robots: "index, follow",
};

const page = async () => {
  let coursesToJoin, optedCourses;
  try {
    await connectDB();
    const user = await fetchUserAtServer();
    // this is nested populating
    optedCourses = (
      await Student.findById(user._id)
        .select("optedCourses")
        .populate({
          path: "optedCourses",
          populate: {
            path: "facultyDetails",
            model: "Admin",
            select: "name -_id",
          },
          select: "courseCode courseName facultyDetails",
        })
        .lean()
    )?.optedCourses;

    coursesToJoin = await Course.find({
      _id: { $nin: optedCourses?.map((course) => course._id) },
    })
      .select("courseCode courseName facultyDetails")
      .populate("facultyDetails", "name -_id")
      .lean();
      
    if (!coursesToJoin) return null;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return (
    <div className="mx-auto my-25 flex flex-col md:w-auto md:mx-12 lg:mx-32 2xl:mx-54">
      <div className="2xl:flex justify-between 2xl:h-[65vh]">
        <ClientWrapper isAdmin={false} />
        {/* <AttendanceChart isAdmin={false} /> */}
        <Suspense
          fallback={
            <div className="w-84 mx-auto">
              <p className="text-xl font-semibold mb-5">Ongoing Courses</p>
              <SkeletonCard />
            </div>
          }
        >
          <OptedCourses
            optedCourses={optedCourses.map((course) => {
              return { ...course, _id: course._id.toString() };
            })}
          />
        </Suspense>
      </div>
      <div className="flex flex-col w-84 mx-auto md:mx-0 md:w-auto">
        <p className="text-2xl font-semibold mb-4">More Courses</p>
        {coursesToJoin.length !== 0 ? (
          <>
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2 md:justify-items-center xl:grid-cols-3">
              {coursesToJoin.map((course, i) => {
                return (
                  <Card
                    key={i}
                    className="my-0 w-full gap-0 border-1 border-border rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition duration-500 ease-in-out"
                  >
                    <CardHeader className="pb-0 flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold truncate">
                        {course.courseName || "Untitled Course"}
                      </CardTitle>
                      <Badge className="text-sm px-3 py-1">
                        {course.courseCode || "N/A"}
                      </Badge>
                    </CardHeader>

                    <CardContent className="pt-2 space-y-4">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium ">Faculty:</span>{" "}
                        {course.facultyDetails.name}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <HandleServerAction
                          variant="custom"
                          submitFunction={joinCourse}
                          btnText="Join Course"
                          loadingBtnText="Joining"
                        >
                          <input
                            type="hidden"
                            name="courseId"
                            value={course._id.toString()}
                          />
                        </HandleServerAction>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <Card className="w-full max-w-xl mx-auto border-1 mt-10 text-center shadow-md rounded-2xl">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-semibold">No Courses Available</h2>
              <p className="text-muted-foreground">
                No Courses have been added yet.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default page;
