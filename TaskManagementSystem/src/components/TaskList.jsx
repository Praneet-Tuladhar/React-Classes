import React, { useState, useMemo } from "react";
import TaskForm from "./TaskForm";
import { useTasks } from "../hooks/useTasks";
import { useProjects } from "../hooks/useProjects";

const TaskList = () => {
  const { tasks, addTask, editTask, deleteTask } = useTasks();
  const { projects } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleFormSubmit = (task) => {
    if (taskToEdit) {
      editTask(task);  
    } else {
      addTask(task);  
    }
    setTaskToEdit(null); 
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);  
  };

  const handleDeleteClick = (taskId) => {
    deleteTask(taskId);  
  };

  const filteredTasks = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return tasks
      .filter(
        (task) =>
          task.name.toLowerCase().includes(lowercasedSearchTerm) ||
          task.description.toLowerCase().includes(lowercasedSearchTerm)
      )
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "dueDate") {
          return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortBy === "priority") {
          const priorityOrder = { Low: 1, Medium: 2, High: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return 0;
      });
  }, [tasks, searchTerm, sortBy]);
  return (
    <div className="task-list">
      <TaskForm taskToEdit={taskToEdit} onFormSubmit={handleFormSubmit} />
      <div className="task-list-heading">
        <h2>Task List</h2>
        <div>
          <input className="search"
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="search" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
      </div>
      <ul>
        {filteredTasks.map((task) => {
          const project = projects.find(
            (p) => String(p.id) === String(task.projectId)
          );
          const projectName = project ? project.name : "No Project";

          return (
            <li key={task.id} className="task-container">
              <h3>{task.name}</h3>
              <p>Description: {task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>
              <p>Project: {projectName}</p>
              <button onClick={() => handleEditClick(task)}>Edit</button>
              <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
