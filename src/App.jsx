import React, { useState } from 'react'
import { ChakraProvider, Box } from "@chakra-ui/react";
import Navbar from './components/navbar.jsx';
import LandingPage from './components/landingPage.jsx';
import TaskListingPage from './components/taskListingPage.jsx';

// Floating Circles Background Component
const FloatingCircles = () => {
  return (
    <div className="floating-circles">
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div>
      <div className="circle circle-5"></div>
      <div className="circle circle-6"></div>
      <div className="circle circle-7"></div>
      <div className="circle circle-8"></div>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [tasks, setTasks] = useState([]);

  // Navigation handlers
  const handleNavigateToLanding = () => {
    setCurrentPage('landing');
  };

  const handleNavigateToTaskListing = () => {
    setCurrentPage('taskListing');
  };

  const handleTaskFormSubmit = (taskData) => {
    console.log("Task created from App:", taskData);
    // You can handle task creation logic here if needed
  };

  const handleTasksUpdate = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const handleOpenTaskForm = () => {
    // This can be used to open task form from navbar if needed
    console.log("Open task form from navbar");
  };

  return (
    <ChakraProvider>
      {/* Floating Background Circles */}
      
      
      <Box  height="100vh" position="fixed" width="100vw">
        <FloatingCircles />
        <Navbar 
          onOpenTaskForm={handleOpenTaskForm}
          onNavigateToLanding={handleNavigateToLanding}
        />
        
        {currentPage === 'landing' ? (
          <LandingPage 
            onNavigateToTaskListing={handleNavigateToTaskListing}
          />
        ) : (
          <TaskListingPage 
            onBackToLanding={handleNavigateToLanding}
            onTaskFormSubmit={handleTaskFormSubmit}
            tasks={tasks}
            onTasksUpdate={handleTasksUpdate}
          />
        )}
      </Box>
    </ChakraProvider>
  )
}

export default App;