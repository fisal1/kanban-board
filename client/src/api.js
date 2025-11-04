import axios from "axios";

const API = axios.create({
  baseURL: "https://kanban-board-backend-gmxy.onrender.com/api/tasks",
});

export const getTasks = () => API.get("/");
export const createTask = (task) => API.post("/", task);
export const updateTask = (id, updates) => API.put(`/${id}`, updates);
export const deleteTask = (id) => API.delete(`/${id}`);
