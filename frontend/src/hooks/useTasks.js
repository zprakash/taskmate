import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from '../services/taskService';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const addTask = async (task) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const updateTask = async (task) => {
    const updatedTask = await apiUpdateTask(task);
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const deleteTask = async (id) => {
    await apiDeleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id);
    const updatedTask = await apiUpdateTask({
      ...task,
      status: task.status === 'completed' ? 'pending' : 'completed'
    });
    setTasks(tasks.map(t => t.id === id ? updatedTask : t));
  };

  return { tasks, addTask, updateTask, deleteTask, toggleComplete };
};

export default useTasks;
