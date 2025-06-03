import mongoose, { Schema } from "mongoose";

export const sessionSchema = new Schema(
  {
    // sessionId: {
    //   type: String,
    //   required: [true, "Session Id is required"],
    //   unique: true,
    // },
    facultyDetails: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course Id is required"],
    },
    // courseCode: {
    //   type: String,
    //   required: [true, "Course Code is required"],
    // },
    // startTime: {
    //   type: Date,
    //   required: [true, "Start time is required"]
    //   // default: () => new Date(Date.now())
    // },
    location: {
      type: Object,
      required: [true, "Location is required"],
    },
    expiresAt: {
      type: Date,
      required: [true, "expiry time is required"],
      default: () => new Date(Date.now() + 10 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
