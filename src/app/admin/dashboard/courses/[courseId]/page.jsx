import connectDB from "@/src/db/connectDB";
import Session from "../../../../../model/sessionSchema.model";
import Client from "./createSession";

export default async function AdminQRCodeSession({ params, searchParams }) {
  const courseId = (await params).courseId;
  const facultyId = (await searchParams).facultyId;
  await connectDB();
  const session = await Session.findOne({
    // facultyDetails: facultyId,
    courseId,
    expiresAt: { $gt: new Date() },
  });
  console.log(session);

  return (
    <Client
      courseId={courseId}
      facultyId={facultyId}
      url={
        session
          ? `${session._id}`
          : ""
      }
    />
  );
}
