import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import Column from "./components/Column";
import { DragDropContext } from "@hello-pangea/dnd";
import { getTasks, createTask, updateTask, deleteTask } from "./api/tasks";
import { getToken } from "./api/auth";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState({ todo: [], inprogress: [], done: [] });

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      const grouped = { todo: [], inprogress: [], done: [] };
      (data || []).forEach((t) => {
        const status = (t.status || "todo").toLowerCase();
        if (status === "inprogress") grouped.inprogress.push(t);
        else if (status === "done") grouped.done.push(t);
        else grouped.todo.push(t);
      });
      setTasks(grouped);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks({ todo: [], inprogress: [], done: [] });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title, status = "todo") => {
    if (!title || !title.trim()) return;

    // require login
    const token = getToken();
    if (!token) {
      alert("Please sign in before adding a task.");
      return;
    }

    try {
      const newTask = await createTask({ title, status });
      const col = (status || "todo").toLowerCase();
      setTasks((prev) => ({
        ...prev,
        [col]: [newTask, ...(prev[col] || [])],
      }));
    } catch (err) {
      console.error("Add task failed", err);
      alert(err.message || "Failed to add task");
    }
  };

  const handleDelete = async (col, id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => ({
        ...prev,
        [col]: (prev[col] || []).filter((t) => String(t._id || t.id) !== String(id)),
      }));
    } catch (err) {
      console.error("Delete failed", err);
      alert(err.message || "Failed to delete task");
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const newTasks = {
      ...tasks,
      [sourceCol]: [...tasks[sourceCol]],
      [destCol]: [...tasks[destCol]],
    };

    const [moved] = newTasks[sourceCol].splice(source.index, 1);
    moved.status = destCol.toLowerCase();
    newTasks[destCol].splice(destination.index, 0, moved);

    setTasks(newTasks);

    try {
      await updateTask(moved._id, { status: moved.status });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <>
      <Header onAuth={fetchTasks} />
      <div className="kanban-container">
        <h1 className="title">Welcome To Kanban Board</h1>
        <TaskForm onAdd={addTask} />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="board">
            <Column id="todo" title="To Do" tasks={tasks.todo} onDelete={(id) => handleDelete("todo", id)} />
            <Column id="inprogress" title="In Progress" tasks={tasks.inprogress} onDelete={(id) => handleDelete("inprogress", id)} />
            <Column id="done" title="Done" tasks={tasks.done} onDelete={(id) => handleDelete("done", id)} />
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
