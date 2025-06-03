import Session from "../../../../../model/sessionSchema.model";
import Client from "./createSession";

export default async function AdminQRCodeSession({ params, searchParams }) {
  const courseId = (await params).courseId;
  const facultyId = (await searchParams).facultyId;
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
          ? `https://qrity.vercel.app/student/join/session/${session._id}`
          : ""
      }
    />
  );
}
