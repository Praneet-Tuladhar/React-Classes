import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import ProjectList from './components/ProjectList';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/projects" element={<ProjectList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
