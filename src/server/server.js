"use server";

import connectDB from "../db/connectDB";
import AttendanceRecord from "../model/attendanceRecordSchema.model";
import Course from "../model/courseSchema";

export const attendanceOfEachStudent = async (courseCode) => {
  try {
    await connectDB();
    const course = await Course.findOne({ courseCode });
    console.log(course);
    const attendanceForCourse = await AttendanceRecord.find({ courseCode });
    console.log(attendanceForCourse);

    // const students = course.students;
  } catch (error) {
    console.log(error);
  }
};
