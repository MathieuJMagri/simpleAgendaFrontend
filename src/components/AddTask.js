import { useState } from "react";

const AddTask = ({ onAdd, courses }) => {
  const [name, setName] = useState("");
  const [dueDateTime, setDueDateTime] = useState("");
  const [reminder, setReminder] = useState(false);
  const [course, setCourse] = useState("");

  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const nameTrimmed = name.trim();
    if (!nameTrimmed) {
      alert("Please add a task");
      return;
    }

    const task = { name: nameTrimmed, course, dueDateTime, reminder };
    onAdd(task);

    setName("");
    setDueDateTime("");
    setReminder(false);
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="task-name">Task Name</label>
        <input
          name="task-name"
          id="task-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label htmlFor="course">Course</label>
        <select
          name="course"
          id="course"
          value={course}
          onChange={handleChange}
        >
          <option value=""></option>
          {courses.map((course, key) => (
            <option value={course.code} key={key}>
              {course.code}: {course.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="deadline">Deadline</label>
        <input
          name="deadline"
          id="deadline"
          type="datetime-local"
          placeholder="Add Deadline"
          value={dueDateTime}
          onChange={(e) => setDueDateTime(e.target.value)}
        />
      </div>

      <div className="form-control form-control-check">
        <label htmlFor="reminder">Set Reminder</label>
        <input
          name="reminder"
          id="reminder"
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
