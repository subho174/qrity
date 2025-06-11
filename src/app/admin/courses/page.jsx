export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import connectDB from "@/src/db/connectDB";
import fetchUserAtServer from "@/src/utils/fetchUserAtServer";
import Course from "@/src/model/courseSchema.model";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import ClientWrapper from "@/src/components/ClientWrapper";

export const metadata = {
  title: "Manage Courses - QRity",
  description: "View, create, and manage all past courses as an admin.",
  keywords: [
    "admin courses",
    "manage courses",
    "attendance system",
    "course list",
  ],
  robots: "index, follow",
};

const page = async () => {
  let courses, user;
  try {
    await connectDB();
    user = await fetchUserAtServer();
    courses = await Course.find({ facultyDetails: user._id })
      .select("courseCode courseName facultyDetails")
      .populate("facultyDetails", "email -_id")
      .lean();
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return (
    <div className="flex flex-col my-25 gap-4 items-center px-4 md:px-12 xl:px-32 max-w-[1400px] mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Ongoing Courses</h1>

      {courses.length !== 0 ? (
        <>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full mb-8">
            {courses.map((course, i) => (
              <CourseCard key={i} course={course} user={user} i={i} />
            ))}
          </div>
          <ClientWrapper type="addCourse" />
        </>
      ) : (
        <Card className="w-full max-w-xl mx-auto mt-10 rounded-2xl border-1 bg-card shadow-lg">
          <CardContent className="px-8 py-2 space-y-6 text-center justify-items-center">
            <h2 className="text-2xl font-semibold ">No Courses Available</h2>
            <p className="text-textColor">
              You haven't added any courses yet. Start by adding a new course to
              manage students.
            </p>
            <ClientWrapper type="addCourse" />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default page;

const CourseCard = ({ course, user, i }) => {
  return (
    <Card className="w-full mx-auto rounded-xl border-1 border-border hover:-translate-y-2 transition-all duration-500 py-5">
      <CardHeader className="pb-2 flex justify-between items-center">
        <CardTitle className="text-xl font-semibold">
          {course.courseName || "Untitled Course"}
        </CardTitle>
        <Badge>{course.courseCode || "N/A"}</Badge>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="flex flex-wrap gap-3">
          {/* Update Course */}
          <ClientWrapper
            existingCourse={{
              courseId: course._id?.toString(),
              courseName: course.courseName,
              courseCode: course.courseCode,
              facultyEmail: course.facultyDetails?.email,
            }}
            type="updateCourse"
          />
          <Button asChild>
            <Link href={`/admin/courses/${course._id}?facultyId=${user._id}`}>
              View Course
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
