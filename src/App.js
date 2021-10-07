import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  // The empty array will get the data from `db.json`

  // As soon as the page loads, we'll get the data from `useEffect`
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch `Tasks` data from `db.json`
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    console.log({ data });
    return data;
  };

  // Fetch `Task` data from `db.json`
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async (task) => {
    console.log({ task });
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // console.log({ id });

    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
    // For each `task` I want to filter `task.id` if it is not equal to the `id`
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !data.reminder } : task
      )
    );
    // Where the `task.id` is equal to the `id` that's passed in then we will have an object `{}` that spreed across `...task` but
    // we'll change the `reminder`. We'll set to the opposite of whatever that `reminder` is. If it is true then it will change it to false.
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {/* If `showAddTask` is TRUE, then show the next component `<AddTask onAdd={addTask}/>` */}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No Tasks To Show"
              )}
              {/* if `tasks.length` is greater than `0` then show `<Tasks />` else show `"No Tasks To Show"` */}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
