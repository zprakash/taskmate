import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import SearchBar from '../components/SearchBar';
import useTasks from '../hooks/useTasks';

const Tasks = () => {
  const [editingTask, setEditingTask] = useState(null);
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks();

  const handleAddTask = (newTask) => {
    addTask(newTask);
  };

  const handleUpdateTask = (updatedTask) => {
    updateTask(updatedTask);
    setEditingTask(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Task List</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <SearchBar />
          <TaskList 
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={deleteTask}
            onComplete={toggleComplete}
            onUpdate={handleUpdateTask}
          />
        </div>
        
        <div>
          <AddTask 
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            initialData={editingTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
