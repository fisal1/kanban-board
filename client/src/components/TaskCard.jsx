import React from "react";

export default function TaskCard({ task, onDelete, columnId, provided, snapshot }) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`flex justify-between items-center bg-white border border-gray-200 rounded-md p-3 mb-2 shadow-sm transition ${snapshot.isDragging ? "ring-2 ring-blue-300" : ""}`}
    >
      <div className="text-sm text-gray-800">{task.title}</div>
      <button onClick={() => onDelete(task.id, columnId)} className="text-gray-400 hover:text-red-500 ml-3">✕</button>
    </div>
  );
}
