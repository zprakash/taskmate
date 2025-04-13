import api from './api';

export const getTasks = async () => {
  return await api.get('/tasks');
};

export const createTask = async (task) => {
  return await api.post('/tasks', task);
};

export const updateTask = async (task) => {
  return await api.put(`/tasks/${task.id}`, task);
};

export const deleteTask = async (id) => {
  return await api.delete(`/tasks/${id}`);
};
