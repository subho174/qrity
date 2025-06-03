import Admin from "../../../model/adminSchema.model";
import { NextResponse } from "next/server";
import Course from "../../../model/courseSchema.model";
import connectDB from "../../../db/connectDB";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { courseCode, courseName, facultyEmail } = body;
    const faculty = await Admin.findOne({ email: facultyEmail }).lean();
    // console.log(faculty);
    if (!faculty)
      return NextResponse.json(
        { data: null, message: "No Faculty found" },
        { status: 404 }
      );

    const course = await Course.create({
      courseName,
      courseCode,
      facultyDetails: faculty._id,
    });

    if (!course)
      return NextResponse.json(
        { data: null, message: "Failed to add course" },
        { status: 400 }
      );

    return NextResponse.json(
      { data: course, message: "Course added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { data: null, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    await connectDB();
    const body = await request.json();
    const {courseId, courseCode, courseName, facultyEmail } = body;
    const faculty = await Admin.findOne({ email: facultyEmail }).lean();
    // console.log(faculty);
    if (!faculty)
      return NextResponse.json(
        { data: null, message: "No Faculty found" },
        { status: 404 }
      );

    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $set: { courseName, courseCode, facultyDetails: faculty._id },
      },
      { new: true }
    );

    if (!updatedCourse)
      return NextResponse.json(
        { data: null, message: "Failed to update course" },
        { status: 400 }
      );
    return NextResponse.json(
      { data: updatedCourse, message: "Course updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: null, message: "Server error" },
      { status: 500 }
    );
  }
}
