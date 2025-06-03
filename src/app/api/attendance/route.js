import { NextResponse } from "next/server";
import Session from "../../../model/sessionSchema.model";
import AttendanceRecord from "../../../model/attendanceRecordSchema.model";
import fetchUserAtServer from "../../../utils/fetchUserAtServer";
import { getDistanceInMeters } from "../../../utils/getDistanceInMeters";
import connectDB from "../../../db/connectDB";

export async function POST(request) {
  try {
    const body = await request.json();
    const { sessionId, location } = body;
    console.log(location);

    if ([sessionId, location].some((e) => !e))
      return NextResponse.json(
        { data: null, message: "All Fields are required" },
        { status: 400 }
      );

    await connectDB();
    const session = await Session.findById(sessionId)
      .select("expiresAt location")
      .lean();
    if (!session)
      return NextResponse.json(
        { data: null, message: "No existing session found" },
        { status: 204 }
      );
    const isSessionValid = new Date() < session.expiresAt;
    if (!isSessionValid)
      return NextResponse.json(
        { data: null, message: "Session expired" },
        { status: 404 }
      );
    const { _id } = await fetchUserAtServer();
    const hasAlreadyMarkedAttendance = await AttendanceRecord.findOne({
      studentId: _id,
    })
      .select("_id")
      .lean();

    if (hasAlreadyMarkedAttendance)
      return NextResponse.json(
        { data: null, message: "Already marked attendance" },
        { status: 204 }
      );

    const isWithinRange = getDistanceInMeters(
      session.location.lat,
      session.location.long,
      location.lat,
      location.long
      // "22.532",
      // "88.29"
    );
    console.log(isWithinRange);
    return NextResponse.json(
      { data: isWithinRange, message: "Testing phase" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { data: null, message: "Server Error" },
      { status: 500 }
    );
  }
}
