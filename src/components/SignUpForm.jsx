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
  Checkbox,
  Fade,
  Box,
  FormErrorMessage
} from "@chakra-ui/react";
import { FaGoogle, FaCheckCircle, FaEnvelope } from "react-icons/fa";

const SignUpForm = ({ 
  onSubmit, 
  onGoogleLogin, 
  onLogin, // This should switch to login form in parent
  isLoading = false,
  isSuccess = false,
  onContinue,
  successMessage = "Your account has been created successfully! Please check your email to verify your account."
}) => {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
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
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'Full name is required';
        } else if (value.trim().length < 2) {
          newErrors.fullName = 'Full name must be at least 2 characters';
        } else {
          delete newErrors.fullName;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'username':
        if (!value.trim()) {
          newErrors.username = 'Username is required';
        } else if (value.trim().length < 3) {
          newErrors.username = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newErrors.username = 'Username can only contain letters, numbers, and underscores';
        } else {
          delete newErrors.username;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        } else {
          delete newErrors.password;
        }
        
        if (touched.confirmPassword && value !== signupData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else if (touched.confirmPassword) {
          delete newErrors.confirmPassword;
        }
        break;

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (value !== signupData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case 'agreeToTerms':
        if (!value) {
          newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        } else {
          delete newErrors.agreeToTerms;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setSignupData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (touched[name] || name === 'password' || name === 'confirmPassword') {
      validateField(name, newValue);
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
    Object.keys(signupData).forEach(key => {
      newTouched[key] = true;
    });
    setTouched(newTouched);

    const fieldsValid = Object.keys(signupData).every(key => 
      validateField(key, signupData[key])
    );

    return fieldsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(signupData);
    }
  };

  // Handle the "Sign In" link click
  const handleLoginClick = () => {
    console.log("Sign In link clicked - switching to login form");
    if (onLogin) {
      onLogin(); // This should tell parent to switch to login form
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
            Registration Successful! 🎉
          </Text>
          <Text color={colors.textSecondary} fontSize="lg" textAlign="center">
            {successMessage}
          </Text>
          
          <VStack spacing={3} bg={colors.backgroundTertiary} p={4} borderRadius="md" width="100%">
            <Box color={colors.blue} fontSize="2xl">
              <FaEnvelope />
            </Box>
            <Text fontSize="sm" color={colors.textPrimary} fontWeight="medium">
              Verification Email Sent
            </Text>
            <Text fontSize="xs" color={colors.textTertiary} textAlign="center">
              We've sent a confirmation link to your email address. 
              Please check your inbox and spam folder.
            </Text>
          </VStack>

          <Button
            onClick={onContinue || onLogin}
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
            mt={4}
          >
            Continue to Login
          </Button>
        </VStack>
      </Fade>
    );
  }

  const isFormValid = () => {
    return Object.keys(errors).length === 0 && 
           signupData.fullName && 
           signupData.email && 
           signupData.username && 
           signupData.password && 
           signupData.confirmPassword && 
           signupData.agreeToTerms;
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
      <FormControl isInvalid={touched.fullName && errors.fullName}>
        <FormLabel color={colors.textPrimary}>Full Name</FormLabel>
        <Input
          name="fullName"
          value={signupData.fullName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          bg="transparent"
          border="1px solid"
          borderColor={errors.fullName ? colors.error : colors.border}
          color={colors.textPrimary}
          _hover={{
            borderColor: errors.fullName ? colors.error : colors.borderHover,
          }}
          _focus={{
            border: "1px solid",
            borderColor: errors.fullName ? colors.error : colors.pink,
            boxShadow: errors.fullName ? `0 0 10px ${colors.error}40` : `0 0 10px ${colors.pink}40`,
            outline: "none"
          }}
          placeholder="Enter your full name"
          padding={'15px'}
          width="100%"
        />
        <FormErrorMessage color={colors.error}>
          {errors.fullName}
        </FormErrorMessage>
      </FormControl>

      {/* Email */}
      <FormControl isInvalid={touched.email && errors.email}>
        <FormLabel color={colors.textPrimary}>Email</FormLabel>
        <Input
          name="email"
          type="email"
          value={signupData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          bg="transparent"
          border="1px solid"
          borderColor={errors.email ? colors.error : colors.border}
          color={colors.textPrimary}
          _hover={{
            borderColor: errors.email ? colors.error : colors.borderHover,
          }}
          _focus={{
            border: "1px solid",
            borderColor: errors.email ? colors.error : colors.pink,
            boxShadow: errors.email ? `0 0 10px ${colors.error}40` : `0 0 10px ${colors.pink}40`,
            outline: "none"
          }}
          placeholder="Enter your email"
          padding={'15px'}
          width="100%"
        />
        <FormErrorMessage color={colors.error}>
          {errors.email}
        </FormErrorMessage>
      </FormControl>

      {/* Username */}
      <FormControl isInvalid={touched.username && errors.username}>
        <FormLabel color={colors.textPrimary}>Username</FormLabel>
        <Input
          name="username"
          value={signupData.username}
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
          placeholder="Choose a username"
          padding={'15px'}
          width="100%"
        />
        <FormErrorMessage color={colors.error}>
          {errors.username}
        </FormErrorMessage>
      </FormControl>

      {/* Password */}
      <FormControl isInvalid={touched.password && errors.password}>
        <FormLabel color={colors.textPrimary}>Password</FormLabel>
        <Input
          name="password"
          type="password"
          value={signupData.password}
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
          placeholder="Create a password (min. 6 characters)"
          padding={'15px'}
          width="100%"
        />
        <FormErrorMessage color={colors.error}>
          {errors.password}
        </FormErrorMessage>
      </FormControl>

      {/* Confirm Password */}
      <FormControl isInvalid={touched.confirmPassword && errors.confirmPassword}>
        <FormLabel color={colors.textPrimary}>Confirm Password</FormLabel>
        <Input
          name="confirmPassword"
          type="password"
          value={signupData.confirmPassword}
          onChange={handleInputChange}
          onBlur={handleBlur}
          bg="transparent"
          border="1px solid"
          borderColor={errors.confirmPassword ? colors.error : colors.border}
          color={colors.textPrimary}
          _hover={{
            borderColor: errors.confirmPassword ? colors.error : colors.borderHover,
          }}
          _focus={{
            border: "1px solid",
            borderColor: errors.confirmPassword ? colors.error : colors.pink,
            boxShadow: errors.confirmPassword ? `0 0 10px ${colors.error}40` : `0 0 10px ${colors.pink}40`,
            outline: "none"
          }}
          placeholder="Confirm your password"
          padding={'15px'}
          width="100%"
        />
        <FormErrorMessage color={colors.error}>
          {errors.confirmPassword}
        </FormErrorMessage>
      </FormControl>

      {/* Terms Agreement */}
      <FormControl isInvalid={touched.agreeToTerms && errors.agreeToTerms}>
        <Checkbox
          name="agreeToTerms"
          isChecked={signupData.agreeToTerms}
          onChange={handleInputChange}
          color={colors.textPrimary}
          colorScheme="pink"
        >
          <Text marginTop={'18px'} color={colors.textSecondary} fontSize="sm">
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
        {errors.agreeToTerms && (
          <Text color={colors.error} fontSize="sm" mt={1}>
            {errors.agreeToTerms}
          </Text>
        )}
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
          onClick={handleLoginClick} // Use the handler function
          marginTop={'-18px'}
        >
          Sign In
        </Button>
      </HStack>
    </VStack>
  );
};

export default SignUpForm;