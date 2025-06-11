"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import QRCode from "react-qr-code";
import HandleServerAction from "@/src/components/handleServerAction";
import {
  addSessionDuration,
  createSession,
  deleteSession,
} from "@/src/server/server";
import { useEffect, useState } from "react";
import axios from "axios";


export default function CreateSession({
  courseId,
  facultyId,
  sessionId,
  string,
}) {
  const [qrString, setqrString] = useState(string);
  const [sessionIdState, setsessionIdState] = useState(sessionId);

  useEffect(() => {
    if (!sessionIdState) return;
    const interval = setInterval(() => {
      axios
        .get(`/api/generate-qr?sessionId=${sessionIdState}`)
        .then((res) => {
          console.log(res);
          setqrString(res.data.data);
        })
        .catch((err) => console.error(err));
    }, 30000);
    return () => clearInterval(interval);
  }, [sessionIdState]);

  return (
    <Card className="w-fit mx-auto my-4 p-6 border-0 hover:bg-white shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-center">Session QR Code</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        {qrString ? (
          <>
            <QRCode value={qrString} size={200} />
            <p className="text-center text-sm text-muted-foreground max-w-xs">
              Please ask students to scan this QR code{" "}
              <strong>within 2 minutes</strong> before it expires.
            </p>
          </>
        ) : (
          <p className="text-center text-muted-foreground">
            No session created yet.
          </p>
        )}
      </CardContent>

      <CardFooter
        className={`grid ${
          qrString ? "grid-cols-2" : "grid-cols-1"
        } gap-x-4 md:gap-x-0 px-0 gap-y-4 justify-items-center`}
      >
        <HandleServerAction
          submitFunction={createSession}
          btnText="Create New Session"
          loadingBtnText="Creating Session"
          actionType="createSession"
          onSuccess={(data) => {
            setqrString(data);
            setsessionIdState(data.split("|")[0]);
          }}
        >
          <input type="hidden" name="courseId" value={courseId} required />
          <input type="hidden" name="facultyId" value={facultyId} required />
        </HandleServerAction>
        {qrString ? (
          <>
            <HandleServerAction
              submitFunction={addSessionDuration}
              btnText="Add 1 minute more"
              loadingBtnText="Adding"
              variant="custom"
              onSuccess={(data) => setqrString(data)}
            >
              <input
                type="hidden"
                name="sessionId"
                value={qrString.split("|")[0]}
              />
            </HandleServerAction>
            <HandleServerAction
              submitFunction={deleteSession}
              btnText="Delete Session"
              loadingBtnText="Deleting"
              actionType="deleteSession"
              style="bg-red-600 hover:border-red-600 hover:bg-white hover:text-red-600"
              onSuccess={(data) => setqrString(data)}
              className="col-span-2 justify-self-center"
            >
              <input
                type="hidden"
                name="sessionId"
                value={qrString.split("|")[0]}
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
