import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      // validate: {
      //   validator: function (value) {
      //     return /^[a-zA-Z0-9._%+-]+@iitbbs\.ac\.in$/.test(value);
      //   },
      //   message: "Only @iitbbs.ac.in email addresses are allowed.",
      // },
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.index({ name: 1, email: 1 });

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
