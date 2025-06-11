import Course from "@/src/model/courseSchema.model";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Session from "@/src/model/sessionSchema.model";
import ClientWrapper from "@/src/components/ClientWrapper";
import connectDB from "@/src/db/connectDB";

export const metadata = {
  title: "Attendance - QRity",
  description: "View attendance chart and student list for a specific course.",
  keywords: ["student list", "attendance chart", "admin panel", "course students"],
  robots: "index, follow",
};

const page = async ({ searchParams }) => {
  const courseId = (await searchParams).courseId;
  let courseStudents, totalSessions;
  try {
    await connectDB();
    courseStudents = (
      await Course.findById(courseId)
        .select("students")
        .populate("students", "name email")
        .lean()
    ).students;
    totalSessions = await Session.countDocuments({ courseId });
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return (
    <div className="grid grid-cols-1 my-25 px-4 md:px-12 xl:px-32 2xl:px-54 lg:grid-cols-5 gap-6">
      <ClientWrapper
        courseId={courseId}
        totalSessions={totalSessions}
        isAdmin={true}
      />
      <div className="col-span-1 md:col-span-3">
        <div className="bg-background border border-border rounded-2xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-border bg-white">
            <h2 className="text-lg font-semibold">Enrolled Students</h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Name</TableHead>
                  <TableHead className="w-1/2">Email</TableHead>
                  <TableHead className="w-1/2">Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseStudents.map((student) => (
                  <ClientWrapper
                    key={student._id}
                    student={{ ...student, _id: student._id.toString() }}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
