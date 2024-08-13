import { useState, useEffect } from 'react';

export const useProjects = () => {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    setProjects((prevProjects) => [
      ...prevProjects,
      { ...project, id: Date.now() }
    ]);
  };

  const editProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  const deleteProject = (id) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
  };

  return { projects, addProject, editProject, deleteProject };
};
