import connectDB from "@/src/db/connectDB";
import Session from "@/src/model/sessionSchema.model";
import { generateQRstring } from "@/src/utils/generateQRstring";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateSession from "./CreateSession";
import { Eye } from "lucide-react";

export const metadata = {
  title: "Course Details - QRity",
  description: "Manage sessions and view students for the selected course.",
  keywords: [
    "admin course",
    "course sessions",
    "view students",
    "QR code attendance",
  ],
  robots: "index, follow",
};

export default async function AdminQRCodeSession({ params, searchParams }) {
  const courseId = (await params).courseId;
  const facultyId = (await searchParams).facultyId;
  let session,qrString;
  
  try {
    await connectDB();
    session = await Session.findOne({
      courseId,
      expiresAt: { $gt: new Date() },
    })
      .select("_id")
      .lean();
    // qrString = updateQR(session?._id);
    
    qrString = generateQRstring(session?._id);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
  // const previousSessions = await Session.find({
  //   courseId,
  //   facultyDetails: facultyId,
  // })
  //   .select("courseId createdAt")
  //   .populate("courseId", "courseName courseCode -_id")
  //   .lean();
  // console.log(previousSessions);

  return (
    <div className="h-screen content-center justify-items-center">
      <CreateSession
        courseId={courseId}
        facultyId={facultyId}
        sessionId={session?._id.toString()}
        string={session && qrString}
      />
      <Button variant="custom" className="mt-5" asChild>
        <Link href={`/admin/courses/students?courseId=${courseId}`}>
          <Eye /> View Students
        </Link>
      </Button>
      {/* <Sessions
        sessions={previousSessions.map((s) => {
          return { ...s, _id: s._id.toString(), };
        })}
      /> */}
      {/* <CourseStudents students={courseStudents} /> */}
    </div>
  );
}
