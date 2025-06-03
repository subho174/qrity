import axios from "axios";

export const addCourse = (courseData, router) => {
  axios
    .post("/api/course", courseData)
    .then((res) => {
      console.log(res);
      router.refresh();
    })
    .catch((err) => console.log(err));
};

export const updateCourse = (courseData, router) => {
  axios
    .patch("/api/course", courseData)
    .then((res) => {
      console.log(res);
      router.refresh();
    })
    .catch((err) => console.log(err));
};
