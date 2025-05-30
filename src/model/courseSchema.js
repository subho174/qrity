import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  courseCode: {
    type: String,
    required: [true, "Course Code is required"],
    unique: true
  },
  courseBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  ],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
