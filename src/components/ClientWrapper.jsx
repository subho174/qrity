"use client";

import dynamic from "next/dynamic";
const CourseForm = dynamic(() => import("./CourseForm"), { ssr: false });
const StudentRow = dynamic(
  () => import("../app/admin/courses/students/StudentRow"),
  { ssr: false }
);
const AttendanceChart = dynamic(
  () => import("@/src/components/AttendanceChart"),
  { ssr: false }
);

const ClientWrapper = ({
  existingCourse,
  type,
  student,
  courseId=null,
  totalSessions=null,
  isAdmin=null,
}) => {
  if (type) return <CourseForm existingCourse={existingCourse} type={type} />;
  if (student) return <StudentRow student={student} />;
  // if (totalSessions)
    return (
      <AttendanceChart
        courseId={courseId}
        totalSessions={totalSessions}
        isAdmin={isAdmin}
      />
    );
};

export default ClientWrapper;
