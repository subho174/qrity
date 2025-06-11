import { NextResponse } from "next/server";
import Session from "../../../model/sessionSchema.model";
import AttendanceRecord from "../../../model/attendanceRecordSchema.model";
import fetchUserAtServer from "../../../utils/fetchUserAtServer";
import connectDB from "../../../db/connectDB";
import verifyQR from "../../../utils/verifyQR";
import Course from "@/src/model/courseSchema.model";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    const courseId = searchParams.get("courseId");

    await connectDB();
    const totalAttendedSessions = await AttendanceRecord.countDocuments({
      courseId,
      studentId,
    });

    if (!totalAttendedSessions && totalAttendedSessions !== 0)
      return NextResponse.json(
        { data: null, message: "Failed to get total attended sessions" },
        { status: 400 }
      );

    return NextResponse.json(
      {
        data: totalAttendedSessions,
        message: "Total attended sessions (%) found",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: null, message: "Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    const body = await request.json();
    const { receivedQRstring } = body;

    if (!receivedQRstring)
      return NextResponse.json(
        { data: null, message: "Failed to get data from QR code" },
        { status: 400 }
      );
    const [sessionId, timestamp, receivedHash] = receivedQRstring.split("|");
    await connectDB();

    // checking whether session exists
    const session = await Session.findById(sessionId)
      .select("expiresAt courseId")
      .lean();

    if (!session)
      return NextResponse.json(
        { data: null, message: "No existing session found" },
        { status: 400 }
      );

    const isSessionValid = new Date() < session.expiresAt;

    if (!isSessionValid)
      return NextResponse.json(
        { data: null, message: "Session expired" },
        { status: 404 }
      );

    // checking is QR valid
    const { success, message } = verifyQR(sessionId, timestamp, receivedHash);
    if (!success)
      return NextResponse.json({ data: null, message }, { status: 400 });

    // checking is student enrolled in course and whether attendance is being marked for first time
    const { _id } = await fetchUserAtServer();
    const isEnrolledInCourse = await Course.findOne({
      _id: session.courseId,
      students: _id,
    })
      .select("_id")
      .lean();
      
    if (!isEnrolledInCourse)
      return NextResponse.json(
        { data: null, message: "You have not joined this course yet" },
        { status: 400 }
      );

    const hasAlreadyMarkedAttendance = await AttendanceRecord.findOne({
      sessionId,
      studentId: _id,
    })
      .select("_id")
      .lean();

    if (hasAlreadyMarkedAttendance)
      return NextResponse.json(
        { data: null, message: "Already marked attendance" },
        { status: 400 }
      );

    // marking attendance
    const attendanceMarked = await AttendanceRecord.create({
      sessionId,
      courseId: session.courseId,
      studentId: _id,
    });
    if (!attendanceMarked)
      return NextResponse.json(
        { data: null, message: "Failed to mark attendance" },
        { status: 400 }
      );

    return NextResponse.json(
      { data: null, message: "Attendance marked successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { data: null, message: "Server Error" },
      { status: 500 }
    );
  }
}
