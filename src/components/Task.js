import { useState } from "react";
import {
  FaTimes,
  FaPen,
  FaSave,
  FaUndoAlt,
  FaRegCheckSquare,
  FaRegSquare,
} from "react-icons/fa";

const Task = ({
  task,
  onDelete,
  editMode,
  setTaskToEdit,
  onEdit,
  onEditStatus,
  courses,
}) => {
  const [name, setName] = useState(task.name);
  const [course, setCourse] = useState(task.course);
  const [dueDateTime, setDueDateTime] = useState(task.dueDateTime);
  const [status, setStatus] = useState(task.status === "COMPLETED");

  function handleChangeName(event) {
    setName(event.target.value);
  }
  function handleChangeCourse(event) {
    setCourse(event.target.value);
  }
  function handleChangeDay(event) {
    setDueDateTime(event.target.value);
  }
  async function handleStatus() {
    await onEditStatus(task._id, !status ? "COMPLETED" : "INCOMPLETE");
    setStatus(!status);
  }

  return (
    <div className={`task ${task.reminder && "reminder"}`}>
      <h3>
        {/* Checkbox */}
        {status ? (
          <FaRegCheckSquare
            data-testid="uncheck task"
            style={{ color: "green" }}
            onClick={handleStatus}
          />
        ) : (
          <FaRegSquare data-testid="check task" onClick={handleStatus} />
        )}
        {!editMode ? (
          // Task name, edit
          <>
            <span>{name}</span>
            <FaPen
              data-testid="edit task"
              onClick={() => setTaskToEdit(task._id)}
            />
          </>
        ) : (
          // Task name input field, save, undo
          <>
            <input type="text" value={name} onChange={handleChangeName} />
            <FaSave
              data-testid="save task"
              onClick={async () => {
                if (await onEdit(name, course, dueDateTime)) {
                  setTaskToEdit(-1);
                }
              }}
            />
            <FaUndoAlt
              data-testid="cancel edit task"
              onClick={() => {
                setTaskToEdit(-1);
                setName(task.name);
                setCourse(task.course);
                setDueDateTime(task.dueDateTime);
              }}
            />
          </>
        )}{" "}
        {/* Delete */}
        <FaTimes
          data-testid="delete task"
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task._id)}
        />
      </h3>
      <p>
        {!editMode ? (
          course
        ) : (
          <select
            name="courses"
            id="courses"
            value={course}
            onChange={handleChangeCourse}
          >
            <option value=""></option>
            {courses.map((course) => (
              <option value={course.code} key={course._id}>
                {course.code}: {course.name}
              </option>
            ))}
          </select>
        )}
      </p>
      <p>
        {!editMode ? (
          dueDateTime
        ) : (
          <input
            type="datetime-local"
            placeholder="Add Deadline"
            value={dueDateTime}
            onChange={handleChangeDay}
            data-testid="edit date"
            id="edit-date"
          />
        )}
      </p>
    </div>
  );
};

export default Task;
