import { FaTimes } from "react-icons/fa";

const Course = ({ course, onDelete }) => {
  return (
    <div className="course">
      <h3>{course.code}</h3>
      <p>{course.name}</p>
      <p>{course.term}</p>
      <FaTimes
        data-testid="delete course"
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => onDelete(course._id, course.code)}
      />
    </div>
  );
};

export default Course;
