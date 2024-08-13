import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/tasks">Tasks</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </nav>
  );
};

export default Navbar;
