"use server";

import connectDB from "../db/connectDB";
import Course from "../model/courseSchema.model";
import Student from "../model/studentSchema.model";
import fetchUserAtServer from "../utils/fetchUserAtServer";
import Session from "../model/sessionSchema.model";
import { generateQRstring } from "../utils/generateQRstring";
import AttendanceRecord from "../model/attendanceRecordSchema.model";

export const joinCourse = async (prevState, formData) => {
  try {
    await connectDB();
    const user = await fetchUserAtServer();

    const courseId = formData.get("courseId");
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $addToSet: { students: user._id },
      },
      { upsert: true, new: true }
    );
    if (!updatedCourse)
      return { data: null, message: "Failed to join course", status: 400 };
    const updatedOptedCourses = await Student.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { optedCourses: courseId },
      },
      { upsert: true, new: true }
    );

    if (!updatedOptedCourses)
      return { data: null, message: "Failed to join course", status: 400 };
    // console.log(prevState);
    return {
      data: null,
      message: "Joined Course successfully",
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { data: null, message: "Server Error", status: 500 };
  }
};

export const createSession = async (prevState, formData) => {
  try {
    await connectDB();
    let { courseId, facultyId } = Object.fromEntries(formData.entries());

    if ([courseId, facultyId].some((e) => !e))
      return { data: null, message: "All fields are required", status: 400 };

    const doesSessionExist = await Session.find({
      courseId,
      expiresAt: { $gt: new Date() },
    });

    if (doesSessionExist.length > 0)
      return {
        data: null,
        message: "Delete existing session to create new one",
        status: 400,
      };

    const session = await Session.create({
      courseId,
      facultyDetails: facultyId,
    });

    if (!session)
      return { data: null, message: "Failed to create session", status: 400 };
    // const qrString = updateQR(session._id);
    const qrString = generateQRstring(session._id);
    // console.log(prevState);
    return {
      data: qrString,
      message: "Session created successfully !",
      status: 201,
    };
  } catch (error) {
    console.error(error);
    return { data: null, message: "Server Error", status: 500 };
  }
};

export const addSessionDuration = async (prevState, formData) => {
  try {
    const sessionId = formData.get("sessionId");
    await connectDB();
    const updatedSession = await Session.findByIdAndUpdate(sessionId, [
      { $set: { expiresAt: { $add: ["$expiresAt", 1 * 60 * 1000] } } },
    ]);

    if (!updatedSession)
      return { data: null, message: "Failed to add 1 minutes", status: 400 };
    // console.log(prevState);
    return { data: null, message: "Added 1 minutes successfully", status: 204 };
  } catch (error) {
    console.error(error);
    return { data: null, message: "Server Error", status: 500 };
  }
};

export const deleteSession = async (prevState, formData) => {
  try {
    const sessionId = formData.get("sessionId");

    await connectDB();
    const deletedSession = await Session.findByIdAndDelete(sessionId);
    
    if (!deletedSession)
      return { data: null, message: "Failed to delete session", status: 400 };
    // console.log(prevState);
    return {
      data: "deleted",
      message: "Deleted session successfully",
      status: 204,
    };
  } catch (error) {
    console.error(error);
    return { data: null, message: "Server Error", status: 500 };
  }
};

export const getAttendanceData = async (prevState, formData) => {
  try {
    const courseId = formData.get("courseId");

    await connectDB();
    const totalSessions = await Session.countDocuments({ courseId });
    
    if (totalSessions == null)
      return {
        data: null,
        message: "Failed to get total sessions",
        status: 400,
      };
    if (totalSessions === 0)
      return {
        data: null,
        message: "No past sessions found",
        status: 400,
      };
    const totalAttendedSessions = await AttendanceRecord.countDocuments({
      courseId,
      studentId: (await fetchUserAtServer())._id,
    });

    if (totalAttendedSessions == null)
      return {
        data: null,
        message: "Failed to get total attended sessions",
        status: 400,
      };

    return {
      data: ((totalAttendedSessions / totalSessions) * 100).toFixed(2),
      message: "Total attended sessions (%) found",
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return { data: null, message: "Server Error", status: 500 };
  }
};
