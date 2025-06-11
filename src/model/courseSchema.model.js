import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: [true, "Course Name is required"],
      trim: true,
      unique: true,
    },
    courseCode: {
      type: String,
      required: [true, "Course Code is required"],
      unique: true,
    },
    facultyDetails: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "Faculty details is required"],
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
