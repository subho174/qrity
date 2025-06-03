import Session from "../../../model/sessionSchema.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  // const body = await request.json();
  const { searchParams } = new URL(request.url);
  const facultyId = searchParams.get("facultyId");

  const session = await Session.findOne({
    facultyDetails: facultyId,
    expiresAt: { $gt: new Date() },
  });
  console.log(session);

  if (!session)
    return NextResponse.json(
      { data: null, message: "No existing session found" },
      { status: 404 }
    );

  return NextResponse.json(
    { data: session, message: "Existing Session found" },
    { status: 200 }
  );
}
