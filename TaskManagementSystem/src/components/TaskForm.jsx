import React, { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects'; 

const TaskForm = ({ taskToEdit, onFormSubmit }) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'To Do',
    projectId: ''
  });

  const { projects } = useProjects(); 

  useEffect(() => {
    if (taskToEdit) {
      setValues(taskToEdit);
    } else {
      setValues({
        name: '',
        description: '',
        dueDate: '',
        priority: 'Low',
        status: 'To Do',
        projectId: ''
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(values);
    setValues({
      name: '',
      description: '',
      dueDate: '',
      priority: 'Low',
      status: 'To Do',
      projectId: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Task Name"
      />
      <textarea
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="date"
        name="dueDate"
        value={values.dueDate}
        onChange={handleChange}
      />
      <select
        name="priority"
        value={values.priority}
        onChange={handleChange}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select
        name="status"
        value={values.status}
        onChange={handleChange}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        name="projectId"
        value={values.projectId}
        onChange={handleChange}
      >
        <option value="">Select Project</option>
        {projects.map(project => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
