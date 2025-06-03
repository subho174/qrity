import CourseForm from "../../../../components/CourseForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import connectDB from "../../../../db/connectDB";
import fetchUserAtServer from "../../../../utils/fetchUserAtServer";
import Course from "../../../../model/courseSchema.model";
import Link from "next/link";

const page = async () => {
  let courses;
  const user = await fetchUserAtServer();
  try {
    await connectDB();
    courses = await Course.find({ facultyDetails: user._id })
      .populate("facultyDetails")
      .lean();
    console.log(courses);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col gap-10 items-center">
      {courses.length !== 0 ? (
        <>
          <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:mx-6 lg:grid-cols-3 2xl:grid-cols-4">
            {courses.map((course, i) => {
              return (
                <Card
                  key={i}
                  className="w-80 my-4 gap-0 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
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

                  <CardContent className="pt-0">
                    <div className="text-sm text-muted-foreground mt-2">
                      <span className="font-medium text-foreground">
                        Faculty:
                      </span>{" "}
                      {course.facultyDetails?.name || "Not Assigned"}
                    </div>
                    <div className="flex mt-5 gap-4">
                      <CourseForm
                        existingCourse={{
                          courseId: course._id?.toString(),
                          courseName: course.courseName,
                          courseCode: course.courseCode,
                          facultyEmail: course.facultyDetails.email,
                        }}
                        type="updateCourse"
                      />
                      <Button>
                        <Link
                          href={`/admin/dashboard/courses/${course._id}?facultyId=${user._id}`}
                        >
                          View Course
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <CourseForm type="addCourse" />
        </>
      ) : (
        <Card className="w-full max-w-xl mx-auto mt-10 text-center shadow-md rounded-2xl">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-semibold">No Courses Available</h2>
            <p className="text-muted-foreground">
              You haven't added any courses yet. Start by adding a new course to
              manage students.
            </p>
          </CardContent>

          <CardFooter className="justify-center pb-6">
            <CourseForm type="addCourse" />
            {/*onSubmit={addCourse}
           addCourse is a function to submit form details to add course */}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default page;
