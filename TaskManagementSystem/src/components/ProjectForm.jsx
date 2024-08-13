import React, { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';

const ProjectForm = ({ projectToEdit, onFormSubmit }) => {
  const { addProject, editProject } = useProjects();
  const [values, setValues] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (projectToEdit) {
      setValues({
        name: projectToEdit.name,
        description: projectToEdit.description,
      });
    } else {
      setValues({ name: '', description: '' });
    }
  }, [projectToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      ...values,
      id: projectToEdit ? projectToEdit.id : Date.now(),
    };
    if (projectToEdit) {
      editProject(projectData);
    } else {
      addProject(projectData);
    }
    setValues({ name: '', description: '' });
    onFormSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Project Name"
        value={values.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Project Description"
        value={values.description}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">{projectToEdit ? 'Edit Project' : 'Add Project'}</button>
    </form>
  );
};

export default ProjectForm;
