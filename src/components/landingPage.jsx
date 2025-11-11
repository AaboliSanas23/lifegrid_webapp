import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TaskListingPage from "../components/taskListingPage";
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  VStack, 
  Container, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { GiCheckMark } from "react-icons/gi";
import TaskForm from "./TaskForm";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

// Color constants matching your theme
const colors = {
  background: 'rgb(2, 5, 24)',
  backgroundSecondary: 'rgba(255, 255, 255, 0.05)',
  backgroundTertiary: 'rgba(255, 255, 255, 0.08)',
  border: 'rgba(255, 255, 255, 0.1)',
  borderHover: 'rgba(255, 255, 255, 0.2)',
  textPrimary: 'white',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.5)',
  gradientPrimary: 'linear-gradient(135deg, #FF2D95 0%, #7877FF 100%)',
  gradientHover: 'linear-gradient(135deg, #e02685 0%, #6a69e0 100%)',
  pink: '#FF2D95',
  pinkHover: '#e02685',
  purple: '#7877FF',
  blue: '#4FC3F7',
  success: '#4CAF50',
  gold: '#FFD700'
};

// Default tasks data
const defaultTasks = [
  {
    id: 1,
    needsBudget: false,
    budgetItems: [],
    taskName: "Math Assignment",
    dueDate: "2026-12-23",
    description: "Complete calculus problem set on derivatives and integrals",
    startTime: "14:00",
    endTime: "16:00",
    completed: false,
  },
  {
    id: 2,
    needsBudget: true,
    budgetItems: [
      {
        name: "Textbooks",
        price: "120",
      },
      {
        name: "Stationery",
        price: "25",
      },
    ],
    taskName: "Semester Book Shopping",
    dueDate: "2026-12-23",
    description: "Purchase required textbooks and supplies for next semester",
    startTime: "11:00",
    endTime: "13:00",
    completed: false,
  },
  {
    id: 3,
    needsBudget: true,
    budgetItems: [
      {
        name: "Groceries",
        price: "75",
      },
      {
        name: "Transport",
        price: "20",
      },
    ],
    taskName: "Weekly Expenses",
    dueDate: "2026-12-20",
    description: "Weekly grocery shopping and transport costs",
    startTime: "17:00",
    endTime: "19:00",
    completed: true,
  },
  {
    id: 4,
    needsBudget: false,
    budgetItems: [],
    taskName: "Research Paper Draft",
    dueDate: "2025-12-15",
    description: "Complete first draft of history research paper on World War II",
    startTime: "09:00",
    endTime: "12:00",
    completed: true,
  },
  {
    id: 5,
    needsBudget: true,
    budgetItems: [
      {
        name: "Software Subscription",
        price: "50",
      },
      {
        name: "Online Course",
        price: "30",
      }
    ],
    taskName: "Study Tools Renewal",
    dueDate: "2025-11-10",
    description: "Renew essential software subscriptions and online learning platforms",
    startTime: "15:00",
    endTime: "16:00",
    completed: false,
  },
  {
    id: 6,
    needsBudget: false,
    budgetItems: [],
    taskName: "Group Project Meeting",
    dueDate: "2027-01-05",
    description: "Computer science group project collaboration session",
    startTime: "09:00",
    endTime: "12:00",
    completed: false,
  }
];

const LandingPage = ({ onNavigateToTaskListing }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasTasks, setHasTasks] = useState(false);
  const [showTaskListing, setShowTaskListing] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    checkForExistingTasks();
  }, []);

  const checkForExistingTasks = () => {
    // Check localStorage for existing tasks
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasksFromStorage = JSON.parse(savedTasks);
      setTasks(tasksFromStorage);
      setHasTasks(tasksFromStorage && tasksFromStorage.length > 0);
    } else {
      // If no tasks in localStorage, use default tasks
      setTasks(defaultTasks);
      setHasTasks(defaultTasks.length > 0);
      // Save default tasks to localStorage
      // localStorage.setItem('tasks', JSON.stringify(defaultTasks));
    }
  };

  const handleGetStarted = () => {
    if (hasTasks) {
      setShowTaskListing(true);
      if (onNavigateToTaskListing) {
        onNavigateToTaskListing();
      }
    } else {
      onOpen(); // Show TaskForm if no tasks exist
    }
  };

  const handleTaskFormSubmit = (taskData) => {
    console.log("Task created:", taskData);
    
    // Create new task with proper structure
    const newTask = {
      ...taskData,
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
      completed: false,
      budgetItems: taskData.needsBudget ? taskData.budgetItems : []
    };
    
    const updatedTasks = [...tasks, newTask];
    
    // Update state
    setTasks(updatedTasks);
    setHasTasks(true);
    
    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    // Switch to TaskListingPage
    setShowTaskListing(true);
    if (onNavigateToTaskListing) {
      onNavigateToTaskListing();
    }
    onClose();
  };

  const handleTaskUpdate = (updatedTasks) => {
    // Update tasks when they are modified in TaskListingPage
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleBackToLanding = () => {
    setShowTaskListing(false);
    // Re-check for tasks when coming back to landing page
    checkForExistingTasks();
  };

  const handleCloseTaskForm = () => {
    onClose();
    // If no tasks exist and user closes the form without creating one,
    // they stay on the landing page
  };

  // If showTaskListing is true, render the TaskListingPage
  if (showTaskListing) {
    return (
      <TaskListingPage 
        onBackToLanding={handleBackToLanding}
        onTaskFormSubmit={handleTaskFormSubmit}
        tasks={tasks}
        onTasksUpdate={handleTaskUpdate}
      />
    );
  }

  return (
    <Box minH="100vh" bg={colors.background} display="flex" alignItems="center" justifyContent="center">
      <Container maxW="container.xl" textAlign="center">
        <VStack spacing={1}>
          {/* Main Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Text
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color={colors.textPrimary}
              lineHeight="1.1"
              textShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
            >
              Tsks,{'\u00A0'}just Tasks{" "}
              <Box
                as="span"
                bgGradient={colors.gradientPrimary}
                bgClip="text"
                fontSize="1.3em"
                fontWeight="black"
              >
                .
              </Box>
            </Text>
          </MotionBox>

          {/* Subtitle */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Text
              fontSize={{ base: "sm", md: "lg", lg: "xl" }}
              color={colors.textSecondary}
              maxW="600px"
              lineHeight="1.6"
            >
              Keep track of daily tasks in life and get that sweet satisfaction
              of checking things off your list.
            </Text>
          </MotionBox>

          {/* Get Started Button */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            pt={4}
          >
            <MotionButton
              size="lg"
              fontSize="xl"
              fontWeight="bold"
              color={colors.textPrimary}
              height="60px"
              px={8}
              bgGradient={colors.gradientPrimary}
              boxShadow="0 10px 25px rgba(189, 8, 86, 0.4)"
              borderRadius="lg"
              whileHover={{
                y: -4,
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(189, 8, 86, 0.6)",
              }}
              whileTap={{
                y: 1,
                scale: 0.98,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleGetStarted}
              _hover={{
                bgGradient: colors.gradientHover,
                transform: "translateY(-4px) scale(1.05)",
                boxShadow: "0 15px 30px rgba(189, 8, 86, 0.6)"
              }}
            >
              {hasTasks ? "View My Tasks" : "Get Started"}
            </MotionButton>
          </MotionBox>

          {/* Alternative: Create First Task Button (only show if no tasks) */}
          {!hasTasks && (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <MotionButton
                variant="outline"
                color={colors.textPrimary}
                borderColor={colors.pink}
                _hover={{ 
                  bg: colors.pink,
                  borderColor: colors.pinkHover,
                  transform: "translateY(-2px)"
                }}
                onClick={onOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                mt={4}
              >
                Create Your First Task
              </MotionButton>
            </MotionBox>
          )}
        </VStack>

        {/* Task Form Modal */}
        <Modal isOpen={isOpen} onClose={handleCloseTaskForm} size="xl" isCentered>
          <ModalOverlay 
            bg="blackAlpha.600"
            backdropFilter="blur(10px)"
          />
          <ModalContent 
            bg={colors.background}
            border="1px solid"
            borderColor={colors.border}
            borderRadius="xl"
            boxShadow="0 25px 50px rgba(0, 0, 0, 0.5)"
            maxW="90vw"
          >
            <ModalHeader 
              color={colors.textPrimary} 
              borderBottom="1px solid" 
              borderColor={colors.border}
              bgGradient={colors.gradientPrimary}
              bgClip="text"
              fontSize="2xl"
              fontWeight="bold"
            >
              Create Your First Task
            </ModalHeader>
            <ModalCloseButton 
              color={colors.textPrimary} 
              _hover={{ bg: colors.backgroundTertiary }} 
            />
            <ModalBody p={6}>
              <TaskForm onClose={handleCloseTaskForm} onSubmit={handleTaskFormSubmit} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
};

export default LandingPage;