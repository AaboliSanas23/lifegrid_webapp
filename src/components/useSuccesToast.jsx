import { useToast, Box, HStack, VStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LuCheck, LuX } from "react-icons/lu"; 

const MotionBox = motion(Box);
const MotionText = motion(Text);

export const useSuccessToast = () => {
  const toast = useToast(); 

  const showEnhancedSuccessToast = (taskName) => {
    toast({
      position: "top-right",
      duration: 5000,
      isClosable: true,
      render: ({ onClose }) => ( 
        <MotionBox
          initial={{ x: 400, y: -100, opacity: 0, rotate: -15, scale: 0.8 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ x: 400, opacity: 0, rotate: 15, scale: 0.8 }}
          transition={{ 
            type: "spring", damping: 20, stiffness: 250, mass: 1
          }}
          position="relative"
          overflow="hidden"
          p={6}
          bg="linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)"
          borderRadius="24px"
          boxShadow="0 25px 50px -12px rgba(76, 175, 80, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)" 
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.3)"
          backdropFilter="blur(15px)"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.99 }}
        >
          {/* Animated background */}
          <MotionBox
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            background={`radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.2) 0%, transparent 60%), 
                       radial-gradient(circle at 80% 70%, rgba(255, 119, 198, 0.15) 0%, transparent 60%)`}
            animate={{
              background: [
                `radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.2) 0%, transparent 60%), 
                 radial-gradient(circle at 80% 70%, rgba(255, 119, 198, 0.15) 0%, transparent 60%)`,
                `radial-gradient(circle at 80% 30%, rgba(120, 119, 198, 0.2) 0%, transparent 60%), 
                 radial-gradient(circle at 20% 70%, rgba(255, 119, 198, 0.15) 0%, transparent 60%)`,
                `radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.2) 0%, transparent 60%), 
                 radial-gradient(circle at 80% 70%, rgba(255, 119, 198, 0.15) 0%, transparent 60%)`
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <HStack spacing={4} position="relative" zIndex={1} align="center">
            {/* Icon */}
            <MotionBox 
              position="relative" 
              p={3} 
              bg="rgba(255, 255, 255, 0.25)" 
              borderRadius="50%"
              border="1px solid rgba(255, 255, 255, 0.4)"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MotionBox
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <LuCheck size={28} color="white" />
              </MotionBox>
            </MotionBox>

            <VStack align="start" spacing={1} flex={1}>
              <MotionText 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                fontWeight="bold" 
                fontSize="xl" 
                color="white"
                bg="linear-gradient(45deg, #ffffff, #e0e7ff)"
                bgClip="text"
                css={{
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 3s ease infinite'
                }}
              >
                Task Created! 🎉
              </MotionText>
              <MotionText 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                fontSize="md" 
                color="white" 
                opacity={0.9} 
                fontWeight="medium"
              >
                "{taskName}" is now in your orbit
              </MotionText>
            </VStack>

            {/* Close button */}
            <MotionBox
              position="absolute"
              top={2}
              right={2}
              p={1.5}
              borderRadius="full"
              bg="rgba(255, 255, 255, 0.08)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              onClick={onClose}
              cursor="pointer"
              whileHover={{ 
                bg: "rgba(255, 255, 255, 0.2)",
                scale: 1.1
              }}
              whileTap={{ scale: 0.9 }}
            >
              <LuX size={14} color="white" />
            </MotionBox>
          </HStack>

          {/* Progress bar */}
          <MotionBox
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height="4px"
            bg="rgba(255, 255, 255, 0.2)"
            borderRadius="0 0 24px 24px"
            overflow="hidden"
          >
            <MotionBox
              height="100%"
              bg="linear-gradient(90deg, #ffd89b, #ffffff)"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </MotionBox>
        </MotionBox>
      ),
    });
  };

  return showEnhancedSuccessToast;
};