import Header from "./components/Header";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import SectionHeader from "./components/SectionHeader";
import Popup from "./components/Popup";
import AddCourse from "./components/AddCourse";
import Courses from "./components/Courses";
import Tasks from "./components/Tasks";
import LoginForm from "./components/LoginForm";
import About from "./components/About";

const App = () => {
  // Obtaining the backend url
  const BACKEND_URL =
    process.env.NODE_ENV === "development" &&
    process.env.REACT_APP_ENV !== "production"
      ? "http://localhost:8080"
      : "https://mcgill-ecse428-f2021-g7backend.herokuapp.com";

  // State
  const [user, setUser] = useState({ username: "", password: "" });
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("Successfully logged out")

  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);

  const [showAboutPage, setShowAboutPage] = useState(false);

  const [tasks, setTasks] = useState([
    /* (updated nov 17) element schema:
    {
      _id: string,
      name: string,
      course: string,
      dueDateTime: string,
      reminder: boolean,
      ownerUser: string,
      status?: string,
    }
    Note 1: dueDateTime should be formatted like "2021-11-01T19:06"
    Note 3: status should be "COMPLETED" or "INCOMPLETE"
    */
  ]);
  const [courses, setCourses] = useState([
    /* (updated nov 26) element schema:
    {
      _id: string,
      code: string,
      name: string,
      term: string,
      ownerUser: string,
    }
    */
  ]);

  const [taskToEdit, setTaskToEdit] = useState(-1); // value is task ID, -1 means no task to edit

  // Toggle About Page Function
  const toggleAbout = () => {
    setShowAboutPage(!showAboutPage);
  };

  // Login info
  const login = async (details) => {
    try {
      const username = details.username;
      const password = details.password;
      let user = await fetch(`${BACKEND_URL}/user/login/`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (400 <= user.status && user.status < 500) {
        alert(
          "Username or password is incorrect. Or there is server-related error but unlikely."
        );
      } else {
        user = await user.json();
        if (
          details.username === user.username &&
          details.password === user.password
        ) {
          // alert("Logged in");
          setUser({
            username: details.username,
            password: details.password,
          });
        } else {
          alert("Username or password is incorrect.");
        }
      }
    } catch (e) {
      alert("A server-side error occured: " + e.message);
    }
  };

  const register = async (RegisterInfo) => {
    try {
      const username = RegisterInfo.username;
      const password = RegisterInfo.password;

      if (username.trim() === "" || password.trim() === "") {
        alert("Cannot have empty username or password");
        return;
      }

      //Send
      let user = await fetch(`${BACKEND_URL}/user/new/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      //Receive
      if (user.status === 200) {
        let userdata = await user.json();
        setUser({
          username: userdata.username,
          password: userdata.password,
        });
      } else if (user.status === 409) {
        alert(
          "Failed to register new user: Provided username is already in use."
        );
      } else {
        alert(
          "Unknown error occured on new user registration attempt. Get the devs"
        );
      }
    } catch (e) {
      alert("A server-side error occured: " + e.message);
    }
  };

  const Logout = async () => {
    try{
      let username = user.username;
      let password = user.password;
      let res = await fetch(`${BACKEND_URL}/user/logout`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if(res.status === 200){
        setLogoutMessage("Successfully logged out");
      } else {
        setLogoutMessage("Server response code " + res.status);
      }

    } catch (e) {
      setLogoutMessage("Server unresponsive about Logout.");
    }
    
    setJustLoggedOut(true);
    setTimeout(() => setJustLoggedOut(false), 3000);
    setUser({ username: "", password: "" });
  };

  // Get task and course list
  useEffect(() => {
    try {
      if (user.username !== "") {
        const getTasks = async () => {
          let tasksFromServer = await fetch(
            `${BACKEND_URL}/tasks/${user.username}`
          );
          tasksFromServer = await tasksFromServer.json();
          setTasks(tasksFromServer);
        };

        getTasks();

        const getCourses = async () => {
          let coursesFromServer = await fetch(
            `${BACKEND_URL}/courses/${user.username}`
          );
          coursesFromServer = await coursesFromServer.json();
          coursesFromServer = coursesFromServer.map((course) => ({
            ...course,
            id: course._id,
          }));
          setCourses(coursesFromServer);
        };

        getCourses();
      } else {
        setTasks([]);
        setCourses([]);
      }
    } catch (e) {
      alert("A server-side error occured: " + e.message);
    }
  }, [BACKEND_URL, user.username]);

  // Add Task
  const addTask = async (task) => {
    try {
      setShowAddTask(false);

      task.ownerUser = user.username;
      task.password = user.password;
      //Send POST request to backend, expecting a return.
      //Note that we don't handle id creation: handled by
      //database. All returned by backend.
      const res = await fetch(`${BACKEND_URL}/task/new`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        //We add additional {} around task because the
        //json formatted expected by the backend is literally
        //{"task":{"name":...,"course":...,"day":...,"reminder":...}}.
        body: JSON.stringify({ task }),
      });
      const json = await res.json(); //Returned data

      //With our id'd course, put it into the list.
      setTasks([...tasks, json]);

      //const newTask = { id, ...task };
    } catch (e) {
      alert("A server-side error occured: " + e.message);
    }
  };

  // Edit Task
  const editTask = async (newName, newCourse, newDueDateTime) => {
    try {
      newName = newName.trim();
      if (newName === "") {
        alert("Please give a non-empty name");

        return false;
      } else {
        await fetch(`${BACKEND_URL}/task/update`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          //We add additional {} around task because the
          //json formatted expected by the backend is literally
          //{"task":{"name":...,"course":...,"day":...,"reminder":...}}.
          body: JSON.stringify({
            task: {
              _id: taskToEdit,
              name: newName,
              course: newCourse === "" ? " " : newCourse, // if you set the value to "" it won't change
              dueDateTime: newDueDateTime === "" ? " " : newDueDateTime,
            },
          }),
        });
        setTasks(
          tasks.map((task) =>
            task._id === taskToEdit
              ? {
                  ...task,
                  name: newName,
                  course: newCourse,
                  dueDateTime: newDueDateTime,
                }
              : task
          )
        );

        return true;
      }
    } catch (e) {
      alert("A server-side error occured: " + e.message);
    }
  };

  const editTaskStatus = async (taskToEdit, newStatus) => {
    try {
      await fetch(`${BACKEND_URL}/task/update`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          task: {
            _id: taskToEdit,
            status: newStatus,
          },
        }),
      });
      setTasks(
        tasks.map((task) =>
          task._id === taskToEdit ? { ...task, status: newStatus } : task
        )
      );
    } catch (e) {
      alert("An error occured: " + e.message);
    }
  };

  // Delete Task
  const deleteTask = async (_id) => {
    try {
      await fetch(`${BACKEND_URL}/task/delete`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        //We add additional {} around course because the
        //json formatted expected by the backend is literally
        //{"course":{"code":...,"name":...,"term":...}}.
        body: JSON.stringify({ task: { _id } }),
      });

      setTasks(tasks.filter((task) => task._id !== _id));
      setTaskToEdit(-1);
      // alert("the task is deleted");
    } catch (e) {
      alert("An error occured: " + e.message);
    }
  };

  const addCourse = async (course) => {
    try {
      //Ensure we're not adding a redundant course.
      for (const existingCourse of courses) {
        if (course.code === existingCourse.code) {
          alert("This course code already exists");

          return false;
        }
      }

      //Put away the add course window.
      setShowAddCourse(false);

      course.ownerUser = user.username;
      course.password = user.password;
      //Send POST request to backend, expecting a return.
      //Note that we don't handle id creation: handled by
      //database. All returned by backend.
      const res = await fetch(`${BACKEND_URL}/course/new`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        //We add additional {} around course because the
        //json formatted expected by the backend is literally
        //{"course":{"code":...,"name":...,"term":...}}.
        body: JSON.stringify({ course }),
      });
      const json = await res.json(); //Returned data
      //With our id'd course, put it into the list.
      setCourses([...courses, json]);
    } catch (e) {
      alert("A server-side error occured: " + e.message);
    }
  };

  // Delete Course
  const deleteCourse = async (_id, code) => {
    try {
      const res = await fetch(`${BACKEND_URL}/course/delete`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ course: { _id } }),
      });

      const json = await res.json(); //Returned data

      if (json.n === 1) {
        setCourses(courses.filter((course) => course._id !== _id));
        for (const task of tasks) {
          if (task.course === code) {
            await deleteTask(task._id);
          }
        }
        setTasks(tasks.filter((task) => task.course !== code));
        setTaskToEdit(-1);
        // alert("the course and its related tasks are deleted");
      } else {
        alert("Something weird happened when deleting a course");
      }
    } catch (e) {
      alert("An error occured: " + e.message);
    }
  };
  // Added login form

  const pages = () => {
    if (showAboutPage) {
      return (
        <>
          <About />
          <section style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={toggleAbout} id="About">
              Back
            </button>
          </section>
        </>
      );
    } else {
      if (user.username === "") {
        return (
          <main className="App" style={{ display: "grid" }}>
            <section>
              <LoginForm login={login} register={register} />
              <div style={{ display: "inline", textAlign: "center" }}>
                {justLoggedOut && <div>{logoutMessage}</div>}
              </div>
              <section
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "25px",
                }}
              >
                <button onClick={toggleAbout} id="About">
                  About
                </button>
              </section>
            </section>
          </main>
        );
      } else {
        return (
          <>
            <Header username={user.username} />
            <main>
              <section id="task-section">
                <SectionHeader
                  id="task-section-header"
                  listOfWhat="Tasks"
                  onAdd={() => setShowAddTask(true)}
                />
                {showAddTask && (
                  <Popup
                    content={<AddTask onAdd={addTask} courses={courses} />}
                    handleClose={() => setShowAddTask(false)}
                  />
                )}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    taskToEdit={taskToEdit}
                    setTaskToEdit={setTaskToEdit}
                    onEdit={editTask}
                    onEditStatus={editTaskStatus}
                    onDelete={deleteTask}
                    courses={courses}
                  />
                ) : (
                  "No tasks to show"
                )}
              </section>
              <section id="course-section">
                <SectionHeader
                  id="course-section-header"
                  listOfWhat="Courses"
                  onAdd={() => setShowAddCourse(true)}
                />
                {showAddCourse && (
                  <Popup
                    content={<AddCourse onAdd={addCourse} />}
                    handleClose={() => setShowAddCourse(false)}
                  />
                )}
                {courses.length > 0 ? (
                  <Courses courses={courses} onDelete={deleteCourse} />
                ) : (
                  "No courses to show"
                )}
              </section>
              <section style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={Logout} id="logout">
                  Logout
                </button>
              </section>
              <section
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: 20,
                }}
              >
                <button onClick={toggleAbout} id="About">
                  About
                </button>
              </section>
            </main>
          </>
        );
      }
    }
  };

  return pages();
};

export default App;
