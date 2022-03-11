import Course from "./Course";

const Courses = ({ courses, onDelete }) => {
  return courses.map((course) => (
    <Course key={course._id} course={course} onDelete={onDelete} />
  ));
};

export default Courses;
