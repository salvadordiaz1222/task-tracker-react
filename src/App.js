import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
    id: 1,
    text: "Food Shopping",
    day: "Feb 5th at 2:30pm",
    reminder: false,
},
{
    id: 2,
    text: "Meeting at School",
    day: "Feb 6th at 1:30pm",
    reminder: true,
},])

  // Add Task
  const addTask = (task) => {
    console.log({task})
    const id = Math.floor(Math.random() * 10000) +1
    console.log({id})

    const newTask = { id, ...task}
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id ))
    // For each `task` I want to filter `task.id` if it is not equal to the `id`
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
    // Where the `task.id` is equal to the `id` that's passed in then we will have an object `{}` that spreed across `...task` but
    // we'll change the `reminder`. We'll set to the opposite of whatever that `reminder` is. If it is true then it will change it to false.

  }

  return (
    <div className="container">
      <Header 
        onAdd={() => setShowAddTask(!showAddTask)} 
        showAdd={showAddTask} 
      />
      {showAddTask && <AddTask onAdd={addTask}/>}
      {/* If `showAddTask` is TRUE, then show the next component `<AddTask onAdd={addTask}/>` */}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No Tasks To Show"}
      {/* if `tasks.length` is greater than `0` then show `<Tasks />` else show `"No Tasks To Show"` */}
    </div>
  );
}

export default App;
