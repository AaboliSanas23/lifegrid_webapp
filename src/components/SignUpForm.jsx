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
  Checkbox
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

const SignUpForm = ({ 
  onSubmit, 
  onGoogleLogin, 
  onLogin,
  isLoading = false 
}) => {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
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
    const { name, value, type, checked } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (!signupData.agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    
    onSubmit(signupData);
  };

  return (
    <VStack spacing={4} as="form" onSubmit={handleSubmit}>
      {/* Google Sign Up Button */}
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
        Sign up with Google
      </Button>

      <Center position="relative" py={2} width="100%">
        <Divider borderColor={colors.border} />
        <Text 
          color={colors.textSecondary} 
          bg={colors.background} 
          px={3} 
          position="absolute"
          fontSize="sm"
        >
          or sign up with email
        </Text>
      </Center>

      {/* Full Name */}
      <FormControl>
        <FormLabel color={colors.textPrimary}>Full Name</FormLabel>
        <Input
          name="fullName"
          value={signupData.fullName}
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
          placeholder="Enter your full name"
          padding={'15px'}
          width="100%"
          required
        />
      </FormControl>

      {/* Email */}
      <FormControl>
        <FormLabel color={colors.textPrimary}>Email</FormLabel>
        <Input
          name="email"
          type="email"
          value={signupData.email}
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
          placeholder="Enter your email"
          padding={'15px'}
          width="100%"
          required
        />
      </FormControl>

      {/* Username */}
      <FormControl>
        <FormLabel color={colors.textPrimary}>Username</FormLabel>
        <Input
          name="username"
          value={signupData.username}
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
          placeholder="Choose a username"
          padding={'15px'}
          width="100%"
          required
        />
      </FormControl>

      {/* Password */}
      <FormControl>
        <FormLabel color={colors.textPrimary}>Password</FormLabel>
        <Input
          name="password"
          type="password"
          value={signupData.password}
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
          placeholder="Create a password"
          padding={'15px'}
          width="100%"
          required
        />
      </FormControl>

      {/* Confirm Password */}
      <FormControl>
        <FormLabel color={colors.textPrimary}>Confirm Password</FormLabel>
        <Input
          name="confirmPassword"
          type="password"
          value={signupData.confirmPassword}
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
          placeholder="Confirm your password"
          padding={'15px'}
          width="100%"
          required
        />
      </FormControl>

      {/* Terms Agreement */}
      <FormControl marginTop={'-15px'}>
        <Checkbox
          name="agreeToTerms"
          isChecked={signupData.agreeToTerms}
          onChange={handleInputChange}
          color={colors.textPrimary}
          colorScheme="pink"
          
        >
          <Text  marginTop={'18px'} color={colors.textSecondary} fontSize="sm">
            I agree to the{' '}
            <Button variant="link" color={colors.pink} fontSize="sm">
              Terms of Service
            </Button>{' '}
            and{' '}
            <Button variant="link" color={colors.pink} fontSize="sm">
              Privacy Policy
            </Button>
          </Text>
        </Checkbox>
      </FormControl>

      {/* Sign Up Button */}
      <Button
        type="submit"
        isLoading={isLoading}
        loadingText="Creating account..."
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
        Create Account
      </Button>

      {/* Login Link */}
      <HStack justify="center" width="100%" pt={2}>
        <Text color={colors.textSecondary} fontSize="sm">
          Already have an account?
        </Text>
        <Button
          variant="link"
          color={colors.pink}
          _hover={{ textDecoration: "none" }}
          fontSize="sm"
          onClick={onLogin}
          marginTop={'-18px'}
        >
          Sign In
        </Button>
      </HStack>
    </VStack>
  );
};

export default SignUpForm;