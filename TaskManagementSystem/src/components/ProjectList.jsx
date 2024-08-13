import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import ProjectForm from './ProjectForm';

const ProjectList = () => {
  const { projects, deleteProject } = useProjects();
  const { tasks } = useTasks();
  const [projectToEdit, setProjectToEdit] = useState(null);

  const getTasksForProject = (projectId) => {
    return tasks.filter(task => String(task.projectId) === String(projectId));
  };

  const handleEditClick = (project) => {
    setProjectToEdit(project);
  };

  const handleFormSubmit = () => {
    setProjectToEdit(null);
  };

  return (
    <div className="project-list">
      <h1>Projects</h1>
      <ProjectForm projectToEdit={projectToEdit} onFormSubmit={handleFormSubmit} />
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="task-container">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <button onClick={() => handleEditClick(project)}>Edit Project</button>
            <button onClick={() => deleteProject(project.id)}>Delete Project</button>
            <h3>Tasks:</h3>
            <ul>
              {getTasksForProject(project.id).length > 0 ? (
                getTasksForProject(project.id).map((task) => (
                  <li key={task.id} className="task-container">
                    <h4>{task.name}</h4>
                    <p>{task.description}</p>
                    <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Status: {task.status}</p>
                  </li>
                ))
              ) : (
                <p>No tasks assigned to this project.</p>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
