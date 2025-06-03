import GoogleProvider from "next-auth/providers/google";
import Student from "../../../../model/studentSchema.model";
import Admin from "../../../../model/adminSchema.model";
import { cookies } from "next/headers";
import connectDB from "../../../../db/connectDB";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      // account,
      // , profile, email, credentials
    }) {
      try {
        await connectDB();
        const { name, email } = user;
        const role = (await cookies()).get("role")?.value;
        if (!role) throw new Error("User Type not found");

        // if (role === "admin") {
        //   const existingAdmin = await Admin.findOne({ email });
        //   if (!existingAdmin) {
        //     const newAdmin = await Admin.create({
        //       username,
        //       email,
        //     });

        //     if (!newAdmin) throw new Error("Failed to register new admin");

        //     user._id = newAdmin?._id;
        //   } else user._id = existingAdmin?._id;
        // } else {
        //   const existingStudent = await Student.findOne({ email });
        //   if (!existingStudent) {
        //     const newStudent = await Student.create({
        //       username,
        //       email,
        //     });

        //     if (!newStudent) {
        //       throw new Error("Failed to register new student");
        //     }
        //     user._id = newStudent?._id;
        //   } else user._id = existingStudent?._id;
        // }
        const Model = role === "admin" ? Admin : Student;

        let existingUser = await Model.findOne({ email });

        // if (!existingUser) {
        //   let newUser = await Model.create({ name, email });
        //   if (role !== "admin") {
        //     newUser.optedCourses = [];
        //     newUser = await newUser.save();
        //   }
        //   if (!newUser) throw new Error(`Failed to register new ${role}`);
        //   existingUser = newUser;
        // }
        if (!existingUser) {
          // Prepare initial user data
          const userData = { name, email };
          if (role !== "admin") {
            userData.optedCourses = [];
          }
          console.log(userData);

          // Create and save new user in one go
          const newUser = await Model.create(userData);
          console.log(newUser);

          if (!newUser) {
            throw new Error(`Failed to register new ${role}`);
          }
          existingUser = newUser;
        }

        user._id = existingUser._id;
        user.optedCourses = existingUser.optedCourses;
        return true;
      } catch (error) {
        console.error("Sign In error", error);
        throw new Error(error.message || "Sign-in failed");
      }
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({
      session,
      token,
      //  user
    }) {
      if (token) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.optedCourses = token.optedCourses;
      }
      return session;
    },
    async jwt({
      token,
      user,
      // account, profile, isNewUser
    }) {
      if (user) {
        token._id = user._id?.toString();
        token.name = user.name;
        token.email = user.email;
        token.optedCourses = user.optedCourses;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
    // error: "/api/auth/AuthError",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
