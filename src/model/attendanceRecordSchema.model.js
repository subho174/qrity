import mongoose, { Schema } from "mongoose";

const attendanceRecordSchema = new Schema(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "Session",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  {
    timestamps: true,
  }
);

const AttendanceRecord =
  mongoose.models.AttendanceRecord ||
  mongoose.model("AttendanceRecord", attendanceRecordSchema);

export default AttendanceRecord;
