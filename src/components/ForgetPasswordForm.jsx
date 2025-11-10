import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

const ForgotPasswordForm = ({ 
  onSubmit, 
  onBackToLogin,
  isLoading = false 
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <VStack spacing={4}>
        <Alert status="success" borderRadius="md">
          <AlertIcon />
          Password reset instructions have been sent to your email!
        </Alert>
        <Text color={colors.textSecondary} textAlign="center" fontSize="sm">
          Check your inbox for a link to reset your password. If you don't see it, check your spam folder.
        </Text>
        <Button
          onClick={onBackToLogin}
          variant="outline"
          color={colors.textPrimary}
          borderColor={colors.border}
          _hover={{
            bg: colors.backgroundTertiary,
            borderColor: colors.borderHover
          }}
          width="100%"
          mt={4}
        >
          Back to Login
        </Button>
      </VStack>
    );
  }

  return (
    <VStack spacing={4} as="form" onSubmit={handleSubmit}>
      <Text color={colors.textSecondary} textAlign="center" fontSize="sm">
        Enter your email address and we'll send you instructions to reset your password.
      </Text>

      <FormControl>
        <FormLabel color={colors.textPrimary}>Email Address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          placeholder="Enter your email address"
          padding={'15px'}
          width="100%"
          required
        />
      </FormControl>

      <Button
        type="submit"
        isLoading={isLoading}
        loadingText="Sending instructions..."
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
      >
        Send Reset Instructions
      </Button>

      <Button
        variant="link"
        color={colors.textSecondary}
        _hover={{ 
          color: colors.pink,
          textDecoration: "none"
        }}
        fontSize="sm"
        onClick={onBackToLogin}
      >
        Back to Login
      </Button>
    </VStack>
  );
};

export default ForgotPasswordForm;