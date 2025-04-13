import React, { useState } from 'react';

const TaskItem = ({ task, onEdit, onDelete, onComplete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
                className="block font-medium mb-1 w-full border border-gray-300 rounded px-2 py-1"
              />
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleChange}
                className="block text-gray-600 text-sm mb-2 w-full border border-gray-300 rounded px-2 py-1"
              />
              <div className="flex items-center mt-2 space-x-2">
                <select
                  name="priority"
                  value={editedTask.priority}
                  onChange={handleChange}
                  className="text-xs px-2 py-1 rounded-full border border-gray-300"
                >
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                </select>
                <input
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate.split('T')[0]} // handles ISO format
                  onChange={handleChange}
                  className="text-xs text-gray-500 border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </>
          ) : (
            <>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-gray-600 text-sm">{task.description}</p>
              <div className="flex items-center mt-2 space-x-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {task.priority}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-800"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedTask(task); // Reset changes
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onComplete(task.id)}
                className="text-green-600 hover:text-green-800"
              >
                ✓
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
