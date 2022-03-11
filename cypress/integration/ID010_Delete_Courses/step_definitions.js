import { clickDeleteCourse } from "../helper";

When("user requests to remove course {string}", (courseCode) => {
  clickDeleteCourse(courseCode);
});
