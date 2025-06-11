import mongoose, { Schema } from "mongoose";

export const sessionSchema = new Schema(
  {
    facultyDetails: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course Id is required"],
    },
    expiresAt: {
      type: Date,
      required: [true, "expiry time is required"],
      default: () => new Date(Date.now() + 2 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
