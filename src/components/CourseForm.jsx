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
import { Pencil, Plus } from "lucide-react";
import { addCourse, updateCourse } from "../utils/course";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CourseForm({ existingCourse = null, type }) {
  const [course, setCourse] = useState({
    courseId: "",
    courseCode: "",
    courseName: "",
    facultyEmail: "",
  });
  const [isLoading, setisLoading] = useState(false);
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

    try {
      setisLoading(true);
      if (!course.courseName || !course.courseCode || !course.facultyEmail) {
        toast.warning("All fields are required");
        return;
      }
      if (course.courseName.length > 15) {
        toast.warning("Length of Course Name must be less than 15 letters");
        return;
      }
      if (course.courseCode.length !== 7) {
        toast.warning("Course code must contain 7 letters only without space");
        return;
      }

      if (type === "addCourse") addCourse(course, router);
      else {
        if (!course.courseId) {
          toast.error("No course id found");
          return;
        }
        updateCourse(course, router);
      }

      if (!existingCourse) {
        setCourse({
          courseName: "",
          courseCode: "",
          facultyEmail: "",
        });
      }
      setisLoading(false);
    } catch (err) {
      toast.error("Server Error");
      throw new Error("Server Error", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2" variant="custom">
          {existingCourse ? (
            <>
              <Pencil /> Update
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add Course{" "}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
      </DialogContent>
    </Dialog>
  );
}
