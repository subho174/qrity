import mongoose, { Schema } from "mongoose";
import { sessionSchema } from "./sessionSchema.model";

const attendanceRecordSchema = new Schema(
  {
    // sessionDetails: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Session",
    // },
    // sessionDetails: sessionSchema,
    courseCode: {
      type: String,
      required: [true, "Course Code is required"],
    },
    studentDetails: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  {
    timestamps: true,
  }
);

attendanceRecordSchema.index({courseCode: 1});

const AttendanceRecord =
  mongoose.models.AttendanceRecord ||
  mongoose.model("AttendanceRecord", attendanceRecordSchema);

export default AttendanceRecord;
