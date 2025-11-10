import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  IconButton, 
  useBreakpointValue, 
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { GiCheckMark } from "react-icons/gi"
import { FaGoogle } from "react-icons/fa"
import TaskForm from './TaskForm.jsx'
import LoginForm from './LoginForm.jsx'
import SignUpForm from './SignUpForm.jsx'
import ForgotPasswordForm from './ForgetPasswordForm.jsx'

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Navbar = ({ onOpenTaskForm, onNavigateToLanding }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Modal states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAuthOpen, onOpen: onAuthOpen, onClose: onAuthClose } = useDisclosure();
  
  // Auth modal state management
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'forgot-password'
  const [isLoading, setIsLoading] = useState(false);

  // Color constants from your CSS
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

  const handleAddTask = () => {
    onOpen();
    if (onOpenTaskForm) {
      onOpenTaskForm();
    }
  };

  const handleLogoClick = () => {
    if (onNavigateToLanding) {
      onNavigateToLanding();
    }
  };

  const handleTaskFormSubmit = (taskData) => {
    console.log("Task created from Navbar:", taskData);
    onClose();
  };

  const handleLoginClick = () => {
    setAuthMode('login');
    onAuthOpen();
  };

  // Auth handlers
  const handleEmailLogin = async (loginData) => {
    setIsLoading(true);
    try {
      console.log("Login attempt:", loginData);
      // Add your actual login logic here
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Login successful!");
      onAuthClose();
      setIsLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

  const handleSignUp = async (signupData) => {
    setIsLoading(true);
    try {
      console.log("Sign up attempt:", signupData);
      // Add your actual signup logic here
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Sign up successful!");
      onAuthClose();
      setIsLoading(false);
    } catch (error) {
      console.error("Sign up failed:", error);
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    setIsLoading(true);
    try {
      console.log("Forgot password request for:", email);
      // Add your actual forgot password logic here
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Password reset email sent!");
      setIsLoading(false);
    } catch (error) {
      console.error("Forgot password failed:", error);
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    console.log("Google auth initiated for:", authMode);
    // Implement Google OAuth logic here
    // Example: window.location.href = `/auth/google?mode=${authMode}`
  };

  // Modal title and content based on auth mode
  const getAuthModalTitle = () => {
    switch (authMode) {
      case 'login':
        return 'Welcome Back';
      case 'signup':
        return 'Create Your Account';
      case 'forgot-password':
        return 'Reset Your Password';
      default:
        return 'Welcome';
    }
  };

  const renderAuthContent = () => {
    switch (authMode) {
      case 'login':
        return (
          <LoginForm
            onSubmit={handleEmailLogin}
            onGoogleLogin={handleGoogleAuth}
            onForgotPassword={() => setAuthMode('forgot-password')}
            onSignUp={() => setAuthMode('signup')}
            isLoading={isLoading}
          />
        );
      case 'signup':
        return (
          <SignUpForm
            onSubmit={handleSignUp}
            onGoogleLogin={handleGoogleAuth}
            onLogin={() => setAuthMode('login')}
            isLoading={isLoading}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onSubmit={handleForgotPassword}
            onBackToLogin={() => setAuthMode('login')}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Flex 
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      align="center" 
      justify="space-between" 
      px={{ base: 4, md: 8, lg: '20px' }}
      py={{ base: 3, md: 4 }}
      bg={colors.background}
      borderBottom="1px solid"
      borderColor={colors.border}
      backdropFilter="blur(10px)"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: colors.background,
        opacity: 0.9,
        zIndex: -1
      }}
    >
      {/* 3D Logo - Clickable for Landing Page */}
      <Flex 
        align="center" 
        gap={{ base: 2, md: 3 }}
        cursor="pointer"
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleLogoClick();
          }
        }}
        _hover={{
          opacity: 0.8
        }}
        transition="opacity 0.2s"
      >
        <MotionBox
          w={{ base: '35px', md: '45px', lg: '60px' }}
          h={{ base: '35px', md: '45px', lg: '48px' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
          bgGradient={colors.gradientPrimary}
          boxShadow="0 10px 20px rgba(189, 8, 86, 0.3)"
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ y: 1, scale: 0.95 }}
        >
          <GiCheckMark style={{ 
            color: colors.textPrimary, 
            fontSize: isMobile ? '18px' : '28px',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
          }} />
        </MotionBox>
        
        <Text 
          fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} 
          fontWeight="bold" 
          color={colors.textPrimary} 
          textShadow="0 2px 4px rgba(0, 0, 0, 0.3)"
          className='m-1'
          onClick={handleLogoClick}
        >
          Tsks
        </Text>
      </Flex>

      {/* 3D Buttons */}
      {isMobile ? (
        // Mobile: Show hamburger menu or simplified buttons
        <Flex align="center" gap={2}>
          <MotionButton
            size="sm"
            fontSize="sm"
            fontWeight="bold" 
            color={colors.textPrimary}
            height="35px"
            px={3}
            bgGradient={colors.gradientPrimary}
            boxShadow="0 4px 8px rgba(189, 8, 86, 0.3)"
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
            onClick={handleAddTask}
            _hover={{
              bgGradient: colors.gradientHover,
              transform: "translateY(-2px)",
              boxShadow: "0 6px 12px rgba(189, 8, 86, 0.4)"
            }}
          >
            Add Tsk
          </MotionButton>
          
          <IconButton
            aria-label="Login"
            icon={<FaGoogle />}
            variant="outline"
            color={colors.textPrimary}
            borderColor={colors.border}
            size="sm"
            onClick={handleLoginClick}
            _hover={{
              bg: colors.backgroundTertiary,
              borderColor: colors.borderHover,
              transform: "translateY(-1px)"
            }}
            _active={{
              transform: "translateY(0)"
            }}
          />
        </Flex>
      ) : (
        // Desktop: Show full buttons
        <Flex align="center" gap={4}>
          <MotionButton
            fontSize="lg" 
            fontWeight="bold" 
            color={colors.textPrimary}
            height="50px"
            px={6}
            bgGradient={colors.gradientPrimary}
            boxShadow="0 8px 16px rgba(189, 8, 86, 0.3)"
            whileHover={{ y: -3 }}
            whileTap={{ y: 1 }}
            onClick={handleAddTask}
            _hover={{
              bgGradient: colors.gradientHover,
              transform: "translateY(-3px)",
              boxShadow: "0 12px 20px rgba(189, 8, 86, 0.4)"
            }}
          >
            Add New Tsk 
          </MotionButton>
          
          <MotionButton
            variant='outline' 
            fontSize="lg" 
            fontWeight="bold" 
            color={colors.textPrimary}
            border="2px solid"
            borderColor={colors.border}
            height="50px"
            px={6}
            boxShadow="0 8px 16px rgba(189, 8, 86, 0.3)"
            whileHover={{ y: -3 }}
            whileTap={{ y: 1 }}
            onClick={handleLoginClick}
            _hover={{
              bg: colors.textPrimary,
              color: colors.background,
              borderColor: colors.textPrimary,
              transform: "translateY(-3px)",
              boxShadow: "0 12px 20px rgba(255, 255, 255, 0.2)"
            }}
            _active={{
              transform: "translateY(0)"
            }}
          >
            Login
          </MotionButton>
        </Flex>
      )}

      {/* Task Creation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay 
          bg="blackAlpha.600"
          backdropFilter="blur(10px)"
        />
        <ModalContent 
         style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',}}
          bg={colors.background}
          border="1px solid"
          borderColor={colors.border}
          borderRadius="xl"
          boxShadow="0 25px 50px rgba(0, 0, 0, 0.5)"
          maxW="40vw"
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
            Create New Task
          </ModalHeader>
           {/* <button
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  fontSize: '24px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 45, 149, 0.3)';
                  e.target.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'rotate(0deg)';
                }}
              >
                ×
              </button> */}
          <ModalCloseButton 
           style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  fontSize: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  marginTop:'5px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 45, 149, 0.3)';
                  e.target.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'rotate(0deg)';
                }}
            color={colors.textPrimary} 
            _hover={{ bg: colors.backgroundTertiary }} 
          />
          <ModalBody p={6}>
            <TaskForm onClose={onClose} onSubmit={handleTaskFormSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Auth Modal */}
      <Modal isOpen={isAuthOpen} onClose={onAuthClose} size="md" isCentered>
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
        >
          <ModalHeader 
            color={colors.textPrimary} 
            borderBottom="1px solid" 
            borderColor={colors.border}
            bgGradient={colors.gradientPrimary}
            bgClip="text"
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
          >
            {getAuthModalTitle()}
          </ModalHeader>
          <ModalCloseButton 
            color={colors.textPrimary} 
            _hover={{ bg: colors.backgroundTertiary }} 
          />
          <ModalBody p={6}>
            {renderAuthContent()}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default Navbar