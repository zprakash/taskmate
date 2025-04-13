import React, { useState } from 'react';

const AddTask = ({ onAddTask, initialData, onUpdateTask }) => {
  const [task, setTask] = useState(initialData || {
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      onUpdateTask(task);
    } else {
      onAddTask(task);
    }
    setTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({...task, title: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({...task, description: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <select
          value={task.priority}
          onChange={(e) => setTask({...task, priority: e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({...task, dueDate: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default AddTask;
