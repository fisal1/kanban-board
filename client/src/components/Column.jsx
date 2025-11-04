import React, { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { deleteTask as apiDeleteTask } from "../api/tasks";

const Column = ({ id, title, tasks = [], color, onDelete }) => {
  const [deletingIds, setDeletingIds] = useState(new Set());

  const handleDelete = async (taskId) => {
    if (!confirm("Delete this task?")) return;
    setDeletingIds((prev) => new Set(prev).add(taskId));
    try {
      await apiDeleteTask(taskId);
      if (onDelete) onDelete(taskId);
    } catch (err) {
      const msg = err && err.message ? err.message : "Failed to delete task";
      alert(msg);
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(taskId);
        return next;
      });
    }
  };

  // make tasks safe for rendering (filter out null/undefined, ensure array)
  const safeTasks = Array.isArray(tasks) ? tasks.filter(Boolean) : [];

  return (
    <div className={`column ${color}`}>
      <div className="column-header">
        <h2>{title}</h2>
        <span className="count">{safeTasks.length}</span>
      </div>

      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {safeTasks.map((task, index) => {
              const taskId = task && (task._id || task.id || String(index));
              // skip entries without an id
              if (!taskId) return null;

              return (
                <Draggable
                  key={taskId}
                  draggableId={String(taskId)}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={`task ${snapshot.isDragging ? "dragging" : ""}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p>{task.title}</p>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(taskId)}
                        disabled={deletingIds.has(taskId)}
                        aria-label="Delete task"
                      >
                        {deletingIds.has(taskId) ? "…" : "×"}
                      </button>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
