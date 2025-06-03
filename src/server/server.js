"use server";

import connectDB from "../db/connectDB";
import Course from "../model/courseSchema.model";
import Student from "../model/studentSchema.model";
import fetchUserAtServer from "../utils/fetchUserAtServer";
import Session from "../model/sessionSchema.model";

export const joinCourse = async (prevState, formData) => {
  try {
    await connectDB();
    const user = await fetchUserAtServer();
    console.log(formData);

    const courseId = formData.get("courseId");
    // const course = await Course.findById(courseId);
    // if (!course)
    //   return { data: null, message: "Course not found", status: 404 };
    // if (!course.students.includes(user._id)) {
    //   course.students.push(user._id);
    //   const final1 = await course.save();
    //   console.log(final1);
    // }
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $addToSet: { students: user._id },
      },
      { upsert: true, new: true }
    );
    if (!updatedCourse)
      return { data: null, message: "Failed to join course", status: 400 };
    // const student = await Student.findById(user._id);
    // if (!student)
    //   return { data: null, message: "Student not found", status: 404 };
    // if (!student.optedCourse?.includes(courseId)) {
    //   student.optedCourses.push(courseId);
    //   const final2 = await student.save();
    //   console.log(final2);
    // }
    const updatedOptedCourses = await Student.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { optedCourses: courseId },
      },
      { upsert: true, new: true }
    );
    console.log(updatedCourse, updatedOptedCourses);

    if (!updatedOptedCourses)
      return { data: null, message: "Failed to join course", status: 400 };
    console.log(prevState);
    return {
      data: null,
      message: "Joined Course successfully",
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
};

export const createSession = async (prevState, formData) => {
  try {
    await connectDB();
    let { courseId, facultyId, location } = Object.fromEntries(
      formData.entries()
    );
    location = JSON.parse(location);

    if ([courseId, facultyId, location].some((e) => !e))
      return { data: null, message: "All fields are required", status: 400 };
 
    const doesSessionExist = await Session.find({
      courseId,
      expiresAt: { $gt: new Date() },
    });
    console.log(doesSessionExist);

    if (doesSessionExist.length > 0)
      return {
        data: null,
        message: "Delete existing session to create new one",
        status: 400,
      };

    const session = await Session.create({
      courseId,
      facultyDetails: facultyId,
      location,
    });
    console.log(session);

    if (!session)
      return { data: null, message: "Failed to create session", status: 400 };
    console.log(prevState);
    return {
      // data: `https://qrity.vercel.app/student/join/session/${session._id}`,
      data: `${session._id}`,
    };
  } catch (error) {
    console.error(error);
  }
};

export const addSessionDuration = async (prevState, formData) => {
  const sessionId = formData.get("sessionId");
  const updatedSession = await Session.findByIdAndUpdate(sessionId, [
    { $set: { expiresAt: { $add: ["$expiresAt", 5 * 60 * 1000] } } },
  ]);

  if (!updatedSession)
    return { data: null, message: "Failed to add 5 minutes", status: 400 };
  console.log(prevState);
  return { data: null, message: "Added 5 minutes successfully", status: 204 };
};

export const deleteSession = async (prevState, formData) => {
  const sessionId = formData.get("sessionId");
  const deletedSession = await Session.findByIdAndDelete(sessionId);
  console.log(deletedSession);
  if (!deletedSession)
    return { data: null, message: "Failed to delete session", status: 400 };
  console.log(prevState);
  return {
    data: "deleted",
    message: "Deleted session successfully",
    status: 204,
  };
};
// export const attendanceOfEachStudent = async (courseId) => {
//   try {
//     await connectDB();
//     const course = await Course.findOne({ courseId });
//     console.log(course);
//     const attendanceForCourse = await AttendanceRecord.find({ courseId });
//     console.log(attendanceForCourse);

//     // const students = course.students;
//   } catch (error) {
//     console.log(error);
//   }
// };
