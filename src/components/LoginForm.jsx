import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  Text,
  Center,
  Divider,
  Fade,
  Box,
  FormErrorMessage,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { FaGoogle, FaCheckCircle } from "react-icons/fa";

const LoginForm = ({ 
  onSubmit, 
  onGoogleLogin, 
  onForgotPassword, 
  onSignUp,
  isLoading = false,
  isSuccess = false,
  successMessage = "Login successful! Redirecting to your dashboard..."
}) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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
    error: '#E53E3E',
    gold: '#FFD700'
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'username':
        if (!value.trim()) {
          newErrors.username = 'Email or username is required';
        } else {
          delete newErrors.username;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 1) {
          newErrors.password = 'Password is required';
        } else {
          delete newErrors.password;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field in real-time if it's been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!touched[name]) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
    validateField(name, value);
  };

  const validateForm = () => {
    const newTouched = {};
    Object.keys(loginData).forEach(key => {
      newTouched[key] = true;
    });
    setTouched(newTouched);

    // Validate all fields
    const fieldsValid = Object.keys(loginData).every(key => 
      validateField(key, loginData[key])
    );

    return fieldsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(loginData);
    }
  };

  // Success state UI
  if (isSuccess) {
    return (
      <Fade in={true}>
        <VStack spacing={6} textAlign="center" py={8}>
          <Box
            color={colors.success}
            fontSize="4xl"
            mb={4}
          >
            <FaCheckCircle />
          </Box>
          <Text fontSize="2xl" color={colors.textPrimary} fontWeight="bold">
            Welcome Back! 👋
          </Text>
          <Text color={colors.textSecondary} fontSize="lg">
            {successMessage}
          </Text>
          
          <Box
            bg={colors.backgroundTertiary}
            p={4}
            borderRadius="md"
            width="100%"
          >
            <Text fontSize="sm" color={colors.textTertiary} textAlign="center">
              You're being redirected to your dashboard...
            </Text>
          </Box>

          <Box
            width="100%"
            height="4px"
            bg={colors.backgroundTertiary}
            borderRadius="full"
            overflow="hidden"
          >
            <Box
              height="100%"
              bgGradient={colors.gradientPrimary}
              borderRadius="full"
              animation="loading 2s ease-in-out infinite"
              sx={{
                '@keyframes loading': {
                  '0%': { transform: 'translateX(-100%)' },
                  '50%': { transform: 'translateX(0%)' },
                  '100%': { transform: 'translateX(100%)' }
                }
              }}
            />
          </Box>
        </VStack>
      </Fade>
    );
  }

  const isFormValid = () => {
    return Object.keys(errors).length === 0 && 
           loginData.username && 
           loginData.password;
  };

  return (
    <VStack spacing={4} as="form" onSubmit={handleSubmit}>
      {/* Google Login Button */}
      <Button
        onClick={onGoogleLogin}
        leftIcon={<FaGoogle />}
        variant="outline"
        borderColor={colors.border}
        color={colors.textPrimary}
        _hover={{
          bg: colors.backgroundTertiary,
          borderColor: colors.borderHover,
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)"
        }}
        _active={{
          transform: "translateY(0)"
        }}
        padding={'20px'}
        width="100%"
        fontSize="md"
        fontWeight="medium"
      >
        Continue with Google
      </Button>

      <Center position="relative" py={2} width="100%">
        <Divider borderColor={colors.border} />
        <Text 
          color={colors.textSecondary} 
          bg={colors.background} 
          px={3} 
          position="absolute"
          fontSize="sm"
          mt={-6}
        >
          or continue with email
        </Text>
      </Center>

      {/* Email/Username Login Form */}
      <FormControl isInvalid={touched.username && errors.username}>
        <FormLabel color={colors.textPrimary}>Email or Username</FormLabel>
        <Input
          name="username"
          value={loginData.username}
          onChange={handleInputChange}
          onBlur={handleBlur}
          bg="transparent"
          border="1px solid"
          borderColor={errors.username ? colors.error : colors.border}
          color={colors.textPrimary}
          _hover={{
            borderColor: errors.username ? colors.error : colors.borderHover,
          }}
          _focus={{
            border: "1px solid",
            borderColor: errors.username ? colors.error : colors.pink,
            boxShadow: errors.username ? `0 0 10px ${colors.error}40` : `0 0 10px ${colors.pink}40`,
            outline: "none"
          }}
          placeholder="Enter your email or username"
          padding={'15px'}
          width="100%"
        />
        <FormErrorMessage color={colors.error}>
          {errors.username}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={touched.password && errors.password}>
        <FormLabel color={colors.textPrimary}>Password</FormLabel>
        <Input
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleInputChange}
          onBlur={handleBlur}
          bg="transparent"
          border="1px solid"
          borderColor={errors.password ? colors.error : colors.border}
          color={colors.textPrimary}
          _hover={{
            borderColor: errors.password ? colors.error : colors.borderHover,
          }}
          _focus={{
            border: "1px solid",
            borderColor: errors.password ? colors.error : colors.pink,
            boxShadow: errors.password ? `0 0 10px ${colors.error}40` : `0 0 10px ${colors.pink}40`,
            outline: "none"
          }}
          placeholder="Enter your password"
          padding={'15px'}
          width="100%"
        />
        <FormErrorMessage color={colors.error}>
          {errors.password}
        </FormErrorMessage>
      </FormControl>

      {/* Login Button */}
      <Button
        type="submit"
        isLoading={isLoading}
        loadingText="Signing in..."
        bgGradient={colors.gradientPrimary}
        color={colors.textPrimary}
        _hover={{
          bgGradient: colors.gradientHover,
          transform: "translateY(-2px)",
          boxShadow: `0 10px 20px ${colors.pink}40`
        }}
        _active={{
          transform: "translateY(0)"
        }}
        padding={'20px'}
        width="100%"
        fontSize="md"
        fontWeight="bold"
        mt={2}
        isDisabled={!isFormValid() && !isLoading}
        _disabled={{
          bg: colors.backgroundTertiary,
          color: colors.textTertiary,
          cursor: 'not-allowed',
          transform: 'none',
          boxShadow: 'none',
          _hover: {
            bg: colors.backgroundTertiary,
            transform: 'none',
            boxShadow: 'none'
          }
        }}
      >
        Sign In
      </Button>

      {/* Additional Links */}
      <HStack justify="space-between" width="100%" pt={2}>
        <Button
          variant="link"
          color={colors.textSecondary}
          _hover={{ 
            color: colors.pink,
            textDecoration: "none"
          }}
          fontSize="sm"
          onClick={onForgotPassword}
        >
          Forgot Password?
        </Button>
        <Button
          variant="link"
          color={colors.textSecondary}
          _hover={{ 
            color: colors.pink,
            textDecoration: "none"
          }}
          fontSize="sm"
          onClick={onSignUp}
        >
          Sign Up
        </Button>
      </HStack>
    </VStack>
  );
};

export default LoginForm;