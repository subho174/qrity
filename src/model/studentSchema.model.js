import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9._%+-]+@iitbbs\.ac\.in$/.test(value);
        },
        message: "Only @iitbbs.ac.in email addresses are allowed.",
      },
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.index({username: 1, email: 1});

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
