import { useState, useEffect } from 'react';

export const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = task => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const editTask = updatedTask => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return { tasks, addTask, editTask, deleteTask };
};
