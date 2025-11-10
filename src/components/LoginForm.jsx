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
  Divider
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

const LoginForm = ({ 
  onSubmit, 
  onGoogleLogin, 
  onForgotPassword, 
  onSignUp,
  isLoading = false 
}) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(loginData);
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
      <FormControl>
        <FormLabel color={colors.textPrimary}>Email or Username</FormLabel>
        <Input
          name="username"
          value={loginData.username}
          onChange={handleInputChange}
          bg="transparent"
          border="1px solid"
          borderColor={colors.border}
          color={colors.textPrimary}
          _hover={{
            borderColor: colors.borderHover,
          }}
          _focus={{
            border: "1px solid",
            borderColor: colors.pink,
            boxShadow: `0 0 10px ${colors.pink}40`,
            outline: "none"
          }}
          placeholder="Enter your email or username"
          padding={'15px'}
          width="100%"
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel color={colors.textPrimary}>Password</FormLabel>
        <Input
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleInputChange}
          bg="transparent"
          border="1px solid"
          borderColor={colors.border}
          color={colors.textPrimary}
          _hover={{
            borderColor: colors.borderHover,
          }}
          _focus={{
            border: "1px solid",
            borderColor: colors.pink,
            boxShadow: `0 0 10px ${colors.pink}40`,
            outline: "none"
          }}
          placeholder="Enter your password"
          padding={'15px'}
          width="100%"
          required
        />
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