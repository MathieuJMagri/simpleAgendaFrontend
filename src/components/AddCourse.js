import { useState } from "react";

const AddCourse = ({ onAdd }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [term, setTerm] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const codeTrimmed = code.trim();
    const nameTrimmed = name.trim();
    const termTrimmed = term.trim();

    if (!codeTrimmed) {
      alert("Please add a course code");
      return;
    }

    if (!nameTrimmed) {
      alert("Please add a course name");
      return;
    }

    if (!termTrimmed) {
      alert("Please add a course term");
      return;
    }

    const course = { code: codeTrimmed, name: nameTrimmed, term: termTrimmed };
    onAdd(course);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="course-code">Course Code</label>
        <input
          id="course-code"
          name="course-code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label htmlFor="course-name">Course Name</label>
        <input
          id="course-name"
          name="course-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label htmlFor="course-term">Course Term</label>
        <input
          id="course-term"
          name="course-term"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>

      <input type="submit" value="Save course" className="btn btn-block" />
    </form>
  );
};

export default AddCourse;
