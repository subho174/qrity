import axios from "axios";
import { toast } from "sonner";

export const addCourse = (courseData, router) => {
  axios
    .post("/api/course", courseData)
    .then((res) => {
      console.log(res);
      router.refresh();
      toast.success("Course added successfully !");
    })
    .catch((err) => {
      console.log(err);
      toast.error(`Failed to add course : ${err.response.data.message}`);
    });
};

export const updateCourse = (courseData, router) => {
  axios
    .patch("/api/course", courseData)
    .then((res) => {
      console.log(res);
      router.refresh();
      toast.success("Course updated successfully !");
    })
    .catch((err) => {
      console.log(err);
      toast.error(`Failed to update course : ${err.response.data.message}`);
    });
};
