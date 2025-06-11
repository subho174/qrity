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
        // console.log(role, typeof undefined);

        if (!role) throw new Error("User Type not found");
        const Model = role === "admin" ? Admin : Student;
        let existingUser = await Model.findOne({ email }).lean();

        if (!existingUser) {
          const userData = { name, email };
          if (role !== "admin") userData.optedCourses = [];

          // Create and save new user in one go
          const newUser = await Model.create(userData);

          if (!newUser) {
            throw new Error(`Failed to register new ${role}`);
          }
          existingUser = newUser;
        }

        user._id = existingUser._id;
        user.optedCourses = existingUser.optedCourses;
        user.isAdmin = role === "admin" ? true : false;
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
        session.user.isAdmin = token.isAdmin;
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
        token.isAdmin = user.isAdmin;
        token.name = user.name;
        token.email = user.email;
        token.optedCourses = user.optedCourses;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/api/auth/AuthError",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
