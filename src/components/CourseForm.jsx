"use client";

import { useState, useEffect } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { addCourse, updateCourse } from "../utils/course";
import { useRouter } from "next/navigation";

export default function CourseForm({ existingCourse = null, type }) {
  const [course, setCourse] = useState({
    courseId: "",
    courseCode: "",
    courseName: "",
    facultyEmail: "",
    // studentEmails: [],
  });
  const router = useRouter();

  useEffect(() => {
    if (existingCourse) {
      setCourse(existingCourse);
    }
  }, [existingCourse]);

  const handleChange = (e) => {
    setCourse((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !course.courseName ||
      !course.courseCode ||
      !course.facultyEmail
      // course.studentEmails.length === 0
    ) {
      console.error("All fields are required");
      // toast({ title: "All fields are required." })
      return;
    }
    if (course.courseCode.length !== 7) {
      console.error("Enter valid course code");
      return;
    }

    try {
      if (type === "addCourse") addCourse(course, router);
      else {
        if (!course.courseId) {
          console.error("No course id found");
          return;
        }
        updateCourse(course, router);
      }
      //   toast({
      //     title: existingCourse ? "Course updated!" : "Course added!",
      //     description: `${course.name} (${course.courseCode})`,
      //   })

      if (!existingCourse) {
        setCourse({
          courseName: "",
          courseCode: "",
          facultyEmail: "",
          // studentEmails: [],
        });
      }
    } catch (err) {
      //   toast({
      //     title: "Error",
      //     description: "Something went wrong. Try again.",
      //     variant: "destructive"
      //   })
      console.log(err);
    }
  };

  return (
    <Dialog>
      {/* <form onSubmit={handleSubmit}> */}
      <DialogTrigger asChild>
        {/* <Button variant="outline">Open Dialog</Button> */}
        <Button className="flex items-center gap-2">
          {existingCourse ? (
            "Update"
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add Course{" "}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {/* <Card className="w-full max-w-md shadow-xl rounded-2xl"> */}
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {existingCourse ? "Update Course" : "Add New Course"}
              </DialogTitle>
            </DialogHeader>
            <div>
              <Label htmlFor="courseName">Course Name</Label>
              <Input
                id="courseName"
                name="courseName"
                placeholder="Operating systems"
                value={course.courseName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="courseCode">Course Code</Label>
              <Input
                id="courseCode"
                name="courseCode"
                placeholder="XY1L003"
                value={course.courseCode}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="facultyEmail">Faculty Email</Label>
              <Input
                id="facultyEmail"
                name="facultyEmail"
                type="email"
                placeholder="prof@iitbbs.ac.in"
                value={course.facultyEmail}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full mt-6" type="submit">
              {existingCourse ? "Update Course" : "Add Course"}
            </Button>
          </CardFooter>
        </form>
        {/* </Card> */}
      </DialogContent>
      {/* </form> */}
    </Dialog>
  );
}
