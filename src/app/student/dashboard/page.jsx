import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import Session from "../../../model/sessionSchema.model";
// import Student from "../../../model/studentSchema.model";
import { QrCode } from "lucide-react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
// import { toast } from "sonner"

export default async function StudentDashboard() {
  // await connectDB();
  // const user = await fetchUserAtServer();
  // const { optedCourses } = await Student.findById(user._id)
  //   .select("optedCourses")
  //   .lean();

  // const liveSessions = await Session.find({
  //   // TODO: logic was wrong; need to find live sessions for joined courses, so matching courseCode will be better
  //   courseId: { $in: optedCourses },
  //   expiresAt: { $gt: new Date() },
  // })
  //   .populate("courseId", "courseCode courseName")
  //   .populate("facultyDetails", "name")
  //   .lean();
  // console.log(liveSessions);
  // const router = useRouter();

  //   const handleScanClick = () => {
  //     // Redirect to camera/QR scan page
  //     router.push("/student/scan");
  //   };
  // const [attendedSessionIds, setAttendedSessionIds] = useState([])

  // const handleAttendance = (sessionId) => {
  //   // Fake API call simulation
  //   // toast.success("Attendance marked!")
  //   setAttendedSessionIds((prev) => [...prev, sessionId]);
  // };

  // if (liveSessions.length === 0) {
  //   return (
  //     <Card className="w-full max-w-md mx-auto mt-10 shadow-md rounded-2xl text-center">
  //       <CardHeader className="flex flex-col items-center justify-center space-y-2">
  //         <AlertCircle className="h-10 w-10 text-muted-foreground" />
  //         <CardTitle>No Live Sessions</CardTitle>
  //       </CardHeader>
  //       <CardContent className="text-muted-foreground">
  //         <p>Currently, there are no active sessions to join.</p>
  //         <p>Please check back later or refresh the page.</p>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  return (
    // <div className="mx-auto my-4 w-76 md:w-auto md:mx-8 xl:mx-30 ">
    //   <p className="text-xl font-semibold mb-4">Live Sessions</p>
    //   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
    //     {liveSessions.map((session) => (
    //       <Card
    //         key={session._id}
    //         className="shadow-md rounded-2xl md:w-9/10 gap-0 py-4 space-y-4"
    //       >
    //         <CardHeader className="pb-2 border-b">
    //           <div className="flex justify-between items-center">
    //             <div>
    //               <CardTitle className="text-xl font-semibold">
    //                 {session.courseId.courseName}
    //               </CardTitle>
    //               <p className="text-muted-foreground text-sm">
    //                 By {session.facultyDetails.name}
    //               </p>
    //             </div>
    //             <Badge variant="outline" className="text-xs">
    //               {session.courseId.courseCode}
    //             </Badge>
    //           </div>
    //         </CardHeader>

    //         <CardContent className="space-y-3">
    //           <div className="text-sm text-muted-foreground">
    //             <strong>Expires At :</strong>{" "}
    //             {new Date(session.expiresAt).toLocaleTimeString([], {
    //               hour: "2-digit",
    //               minute: "2-digit",
    //             })}
    //           </div>

    //           <Button
    //             variant="default"
    //             className="w-full"
    //             // disabled={attendedSessionIds.includes(session.id)}
    //             // onClick={() => handleAttendance(session.id)}
    //           >
    //             {/* {attendedSessionIds.includes(session.id) ? "Attendance Marked" : "Mark Attendance"} */}
    //             Mark Attendance
    //           </Button>
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </div>
    // </div>
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg cursor-pointer hover:shadow-xl transition">
      <CardContent
        // onClick={handleScanClick}
        className="flex flex-col items-center justify-center p-8 gap-4 text-center"
      >
        <QrCode className="w-16 h-16 text-primary" />
        <p className="text-xl font-medium">Tap to Scan QR Code</p>
        <p className="text-sm text-muted-foreground">
          Scan the session QR code shown by your faculty to mark your
          attendance.
        </p>
      </CardContent>
      <CardFooter className="justify-center pb-4">
        {/* <Button onClick={handleScanClick} >Open Camera</Button> */}
        {/* <Link href="/student/scan" className="bg-black" >Open Camera</Link> */}
        <Button asChild>
          <Link href="/student/scan">Open Camera</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
