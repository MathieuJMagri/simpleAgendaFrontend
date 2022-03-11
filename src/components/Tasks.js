import Task from "./Task";

const Tasks = ({
  tasks,
  onDelete,
  taskToEdit,
  setTaskToEdit,
  onEdit,
  onEditStatus,
  courses,
}) => {
  return tasks.map((task) => (
    <Task
      key={task._id}
      task={task}
      onDelete={onDelete}
      editMode={taskToEdit === task._id}
      setTaskToEdit={setTaskToEdit}
      onEdit={onEdit}
      onEditStatus={onEditStatus}
      courses={courses}
    />
  ));
};

export default Tasks;
