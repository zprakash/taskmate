import React from 'react';

const TaskItem = ({ task, onEdit, onDelete, onComplete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{task.title}</h3>
          <p className="text-gray-600 text-sm">{task.description}</p>
          <div className="flex items-center mt-2 space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' : 
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {task.priority}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onComplete(task.id)}
            className="text-green-600 hover:text-green-800"
          >
            ✓
          </button>
          <button 
            onClick={() => onEdit(task)}
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
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
