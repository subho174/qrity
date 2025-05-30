import mongoose, { Schema } from "mongoose";

export const sessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: [true, "Session Id is required"],
      unique: true,
    },
    sessionBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    courseCode: {
      type: String,
      required: [true, "Course Code is required"],
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: [true, "expiry time is required"],
      default: Date.now(), // add 10 minutes here
    },
  },
  {
    timestamps: true,
  }
);

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
