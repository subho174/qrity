export const dynamic = 'force-dynamic';

import Course from "../../../../model/courseSchema.model";
import connectDB from "../../../../db/connectDB";
import CourseForm from "../../../../components/CourseForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import HandleServerAction from "../../../../components/handleServerAction";
import { joinCourse } from "../../../../server/server";
import fetchUserAtServer from "../../../../utils/fetchUserAtServer";
import Student from "../../../../model/studentSchema.model";

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
            select: "name email",
          },
          select: "courseCode courseName facultyDetails",
        })
        .lean()
    )?.optedCourses;
    console.log(optedCourses);

    coursesToJoin = await Course.find({
      _id: { $nin: optedCourses?.map((course) => course._id) },
    })
      .populate("facultyDetails")
      .lean();
    if (!coursesToJoin) return null;
    // { data: null, message: "Courses not found", status: 404 };
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <div className="mx-auto my-4 flex flex-col w-76 md:w-auto md:mx-8 xl:mx-30">
        <p className="text-2xl font-semibold">Ongoing Courses</p>
        {/* <div className="flex flex-col"> */}
        {optedCourses?.length !== 0 ? (
          <>
            <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 md:justify-items-center lg:grid-cols-3 2xl:grid-cols-4">
              {optedCourses?.map((course, i) => {
                return (
                  <Card
                    key={i}
                    className="my-4 md:w-76 gap-0 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex flex-col gap-1">
                        <CardTitle className="text-2xl font-semibold text-primary">
                          {course.courseName || "Untitled Course"}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          Code:{" "}
                          <span className="font-medium">
                            {course.courseCode || "N/A"}
                          </span>
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 flex justify-between">
                      <div className="text-sm text-muted-foreground mt-2">
                        <span className="font-medium text-foreground">
                          Faculty:
                        </span>{" "}
                        {course.facultyDetails?.name || "Not Assigned"}
                      </div>
                      {/* <HandleServerAction
                        submitFunction={joinCourse}
                        btnText="Join Course"
                        loadingBtnText="Joining"
                      >
                        <input
                          type="hidden"
                          name="courseId"
                          value={course._id.toString()}
                        />
                      </HandleServerAction> */}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <Card className="w-full max-w-xl py-0 mx-auto mt-10 text-center shadow-md rounded-2xl">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-semibold">
                You're Not Enrolled in Any Course
              </h2>
              <p className="text-muted-foreground">
                You haven't joined any courses yet. Browse the available courses
                below and join the ones you're enrolled in.
              </p>
            </CardContent>
          </Card>
        )}
        {/* </div> */}
      </div>
      <div className="mx-auto flex flex-col w-76 md:w-auto md:mx-8 xl:mx-30">
        <p className="text-2xl font-semibold">More Courses</p>
        {/* <div className="flex flex-col items-center"> */}
        {coursesToJoin.length !== 0 ? (
          <>
            <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 md:justify-items-center lg:grid-cols-3 2xl:grid-cols-4">
              {coursesToJoin.map((course, i) => {
                return (
                  <Card
                    key={i}
                    className="my-4 md:w-76 gap-0 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex flex-col gap-1">
                        <CardTitle className="text-2xl font-semibold text-primary">
                          {course.courseName || "Untitled Course"}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          Code:{" "}
                          <span className="font-medium">
                            {course.courseCode || "N/A"}
                          </span>
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 flex justify-between">
                      <div className="text-sm text-muted-foreground mt-2">
                        <span className="font-medium text-foreground">
                          Faculty:
                        </span>{" "}
                        {course.facultyDetails?.name || "Not Assigned"}
                      </div>
                      <HandleServerAction
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
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <Card className="w-full max-w-xl mx-auto mt-10 text-center shadow-md rounded-2xl">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-semibold">No Courses Available</h2>
              <p className="text-muted-foreground">
                You haven't added any courses yet. Start by adding a new course
                to manage students.
              </p>
            </CardContent>

            <CardFooter className="justify-center pb-6">
              <CourseForm type="addCourse" />
              {/*onSubmit={addCourse}
             addCourse is a function to submit form details to add course */}
            </CardFooter>
          </Card>
        )}
        {/* </div> */}
      </div>
    </>
  );
};

export default page;
