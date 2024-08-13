import React, { useState, useContext } from 'react';
import { useTasks } from '../hooks/useTasks';
import { ThemeContext } from '../context/ThemeContext';

const Dashboard = () => {
  const { tasks } = useTasks();
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const taskCounts = {
    toDo: tasks.filter(task => task.status === 'To Do').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    completed: tasks.filter(task => task.status === 'Completed').length,
  };

  return (
    <div className={`dashboard ${theme}`}>
      <h1>Dashboard</h1>
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
      />

      <div className="task-summary">
        <div>To Do: {taskCounts.toDo}</div>
        <div>In Progress: {taskCounts.inProgress}</div>
        <div>Completed: {taskCounts.completed}</div>
      </div>

      <div className="upcoming-deadlines">
        <h2>Upcoming Deadlines</h2>
        <ul>
          {filteredTasks
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 5)
            .map(task => (
              <li key={task.id}>{task.name} - {new Date(task.dueDate).toLocaleDateString()}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
