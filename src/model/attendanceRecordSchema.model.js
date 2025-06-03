import mongoose, { Schema } from "mongoose";

const attendanceRecordSchema = new Schema(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "Session",
    },
    // sessionDetails: sessionSchema,
    courseCode: {
      type: String,
      required: [true, "Course Code is required"],
      unique: true,
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

// attendanceRecordSchema.index({ courseCode: 1 });

const AttendanceRecord =
  mongoose.models.AttendanceRecord ||
  mongoose.model("AttendanceRecord", attendanceRecordSchema);

export default AttendanceRecord;
