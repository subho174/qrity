"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import QRCode from "react-qr-code";
import HandleServerAction from "../../../../../components/handleServerAction";
import {
  addSessionDuration,
  createSession,
  deleteSession,
} from "../../../../../server/server";
import { useEffect, useState } from "react";
import { getLocation } from "../../../../../utils/getLocation";

export default function Client({
  // initialsessionURL = "/",
  // onCreateSession,
  courseId,
  facultyId,
  url,
}) {
  // const {} = useAppContext();
  // const [sessionURL, setsessionURL] = useState(initialsessionURL)
  // const sessionURL = "/12";
  const [sessionURL, setSessionURL] = useState(url);
  //   const courseCode = useParams().courseCode;
  //   const facultyId = useSearchParams().get("facultyId");
  // console.log(courseCode, facultyId);
  //   useEffect(() => {
  //     axios
  //       .get(`/api/session?facultyId=${facultyId}`)
  //       .then((res) => {
  //         console.log(res);
  //         setSessionURL(`https://qrity.vercel.app/student/join/session/${res.data.data._id}`)
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);
  const [location, setlocation] = useState(null);
// let location;
  //   const setLocation = () => {
  //     const latAndLong = getLocation((location) => {
  //       if (location) {
  //         console.log("User location:", location);
  //       } else {
  //         console.log("Failed to get location.");
  //       }
  //       return location;
  //     });
  // console.log(latAndLong);

  //     setlocation(latAndLong);
  //   };
  //   useEffect(() => {
  //     setLocation();
  //   }, []);
  useEffect(() => {
    // getLocation((location) => {
    //   if (location) {
    //     console.log("Got location:", location);
    //     setlocation(location);
    //   }
    // });
    // const z = await getLocation();
    const fetchLocation = async () => {
      let location12  = await getLocation();
      console.log(location12);
      
      setlocation(location12);
    };
    fetchLocation();
    
    
  }, []);

  useEffect(() => {
    if (!sessionURL) return;
    console.log(sessionURL);
    // console.log(sessionURL.split('/').at(-1))
  }, [sessionURL]);
  //   const handleCreateSession = async (prevState, formData) => {
  //     "use server";
  //     try {
  //       const { courseCode, facultyId } = Object.fromEntries(formData.entries());
  //       sessionURL = await createSession(courseCode, facultyId); // This should return the generated sessionURL string
  //       // setsessionURL(newsessionURL)
  //       console.log(sessionURL);

  //       // toast({ title: "Session Created!", description: "QR Code updated." })
  //     } catch (error) {
  //       // toast({ title: "Error", description: "Failed to create session.", variant: "destructive" })
  //     }
  //   };
  return (
    <Card className="w-fit mx-auto my-4 p-6 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-center">Session QR Code</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        {sessionURL ? (
          <>
            <QRCode value={sessionURL} size={200} />
            <p className="text-center text-sm text-muted-foreground max-w-xs">
              Please ask students to scan this QR code{" "}
              <strong>within 10 minutes</strong> before it expires.
            </p>
            {/* Optionally show the URL itself for admin */}
            {/* <p className="text-sm text-muted-foreground text-center break-words max-w-xs">{sessionURL}</p> */}
          </>
        ) : (
          <p className="text-center text-muted-foreground">
            No session created yet.
          </p>
        )}
      </CardContent>

      <CardFooter
        className={`grid ${
          sessionURL ? "grid-cols-2" : "grid-cols-1"
        } gap-x-4 md:gap-x-0 px-0 gap-y-4 justify-items-center`}
      >
        <HandleServerAction
          submitFunction={createSession}
          btnText="Create New Session"
          loadingBtnText="Creating Session"
          onSuccess={(data) => setSessionURL(data)}
        >
          {/* <input type="hidden" name="courseCode" value={courseCode} /> */}
          <input type="hidden" name="courseId" value={courseId} required />
          <input type="hidden" name="facultyId" value={facultyId} required />
          <input
            type="hidden"
            name="location"
            value={JSON.stringify(location)}
            required
          />
        </HandleServerAction>
        {/* <TimePicker
          courseCode={courseCode}
          facultyId={facultyId}
          setSessionURL={setSessionURL}
        /> */}
        {sessionURL ? (
          <>
            <HandleServerAction
              submitFunction={addSessionDuration}
              btnText="Add 5 minutes more"
              loadingBtnText="Adding"
              onSuccess={(data) => setSessionURL(data)}
            >
              <input
                type="hidden"
                name="sessionId"
                value={sessionURL?.split("/").at(-1)}
              />
            </HandleServerAction>
            <HandleServerAction
              submitFunction={deleteSession}
              btnText="Delete Session"
              loadingBtnText="Deleting"
              onSuccess={(data) => setSessionURL(data)}
              className="col-span-2 justify-self-center"
            >
              <input
                type="hidden"
                name="sessionId"
                value={sessionURL?.split("/").at(-1)}
              />
            </HandleServerAction>
          </>
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
}
