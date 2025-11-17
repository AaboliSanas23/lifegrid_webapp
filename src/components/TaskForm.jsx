import React from 'react'
import { 
  Button, 
  FormControl, 
  FormLabel, 
  FormErrorMessage,
  Input, 
  Stack, 
  Box, 
  Checkbox,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Text,
  VStack,
  IconButton,
  Select,
  useToast
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { LuDollarSign, LuClock, LuCalendar, LuPlus, LuTrash2, LuBell, LuBook, LuFileText, LuClipboardCheck } from "react-icons/lu"
import { useSuccessToast } from './useSuccesToast'

const TaskForm = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    clearErrors,
    setValue,
    getValues,
    reset
  } = useForm({
    defaultValues: {
      taskType: "study",
      needsBudget: false,
      needsReminder: false,
      budgetItems: []
    }
  })

  const toast = useToast()
  const showEnhancedSuccessToast = useSuccessToast()

  const taskType = watch("taskType")
  const needsBudget = watch("needsBudget")
  const needsReminder = watch("needsReminder")
  const startTime = watch("startTime")
  const endTime = watch("endTime")
  const dueDate = watch("dueDate")
  const budgetItems = watch("budgetItems") || []

  // State for custom task type
  const [showCustomInput, setShowCustomInput] = React.useState(false)
  const [customTaskType, setCustomTaskType] = React.useState("")

  // Task type options with icons
  const taskTypeOptions = [
    {
      value: "study",
      label: "Study Session",
      icon: LuBook,
    },
    {
      value: "exam",
      label: "Exam/Test",
      icon: LuClipboardCheck,
    },
    {
      value: "project",
      label: "Project Work",
      icon: LuFileText,
    },
    {
      value: "meeting",
      label: "Meeting",
      icon: LuClock,
    },
    {
      value: "personal",
      label: "Personal Task",
      icon: LuBell,
    },
    {
      value: "others",
      label: "Others",
      icon: LuPlus,
    }
  ]

  // Handle task type change
  const handleTaskTypeChange = (e) => {
    const value = e.target.value
    
    if (value === "others") {
      setShowCustomInput(true)
      setValue("taskType", "")
    } else {
      setShowCustomInput(false)
      setValue("taskType", value)
      setCustomTaskType("")
      clearErrors("taskType")
    }
  }

  // Handle custom task type input
  const handleCustomTaskTypeChange = (e) => {
    const value = e.target.value
    setCustomTaskType(value)
    if (value.trim()) {
      setValue("taskType", value.toLowerCase().replace(/\s+/g, '-'))
      clearErrors("taskType")
    }
  }

  // Get current task type display value
  const getDisplayValue = () => {
    if (showCustomInput && customTaskType) {
      return customTaskType
    }
    
    const selectedOption = taskTypeOptions.find(option => option.value === taskType)
    return selectedOption ? selectedOption.label : "Select task type"
  }

  // Validation function for due date (not in past)
  const validateDueDate = (date) => {
    if (!date) return "Due date is required"
    
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      return "Due date cannot be in the past"
    }
    
    return true
  }

  // Function to calculate duration between start and end time with validation
  const calculateDuration = () => {
    if (!startTime || !endTime) return { display: "Set start and end time", isValid: false }
    
    try {
      const start = new Date(`2000-01-01T${startTime}`)
      const end = new Date(`2000-01-01T${endTime}`)
      
      if (end < start) {
        end.setDate(end.getDate() + 1)
      }
      
      const diffMs = end - start
      const diffHours = diffMs / (1000 * 60 * 60)
      
      if (diffHours < 0) return { display: "Invalid time range", isValid: false }
      
      if (diffHours > 24) {
        return { 
          display: "Duration cannot exceed 24 hours", 
          isValid: false 
        }
      }
      
      const hours = Math.floor(diffHours)
      const minutes = Math.round((diffHours - hours) * 60)
      
      let displayText
      if (hours === 0) {
        displayText = `${minutes} minutes`
      } else if (minutes === 0) {
        displayText = `${hours} hours`
      } else {
        displayText = `${hours}h ${minutes}m`
      }
      
      return { display: displayText, isValid: true, hours: diffHours }
    } catch (error) {
      return { display: "Invalid time format", isValid: false }
    }
  }

  // Handle budget checkbox change
  const handleBudgetCheckboxChange = (e) => {
    const isChecked = e.target.checked
    setValue("needsBudget", isChecked)
    
    if (isChecked) {
      setValue("budgetItems", [{ name: "", price: 0 }])
    } else {
      setValue("budgetItems", [])
      clearErrors("budgetItems")
    }
  }

  // Handle reminder checkbox change
  const handleReminderCheckboxChange = (e) => {
    const isChecked = e.target.checked
    setValue("needsReminder", isChecked)
  }

  // Add new budget item
  const addBudgetItem = () => {
    const currentItems = getValues("budgetItems") || []
    const newItems = [...currentItems, { name: "", price: 0 }]
    setValue("budgetItems", newItems)
    clearErrors("budgetItems")
  }

  // Remove budget item
  const removeBudgetItem = (index) => {
    const currentItems = getValues("budgetItems") || []
    const newItems = currentItems.filter((_, i) => i !== index)
    setValue("budgetItems", newItems)
    
    if (newItems.length === 0) {
      setValue("needsBudget", false)
      clearErrors("budgetItems")
    } else {
      validateBudgetItems(newItems)
    }
  }

  // Update budget item
  const updateBudgetItem = (index, field, value) => {
    const currentItems = getValues("budgetItems") || []
    const newItems = currentItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    )
    setValue("budgetItems", newItems)
    validateBudgetItems(newItems)
  }

  // Validate budget items
  const validateBudgetItems = (items) => {
    if (!items || items.length === 0) {
      clearErrors("budgetItems")
      return true
    }

    const hasValidItems = items.some(item => item.name?.trim() && Number(item.price) > 0)
    
    if (!hasValidItems && items.length > 0) {
      setError("budgetItems", {
        type: "manual",
        message: "Please fill at least one budget item with name and price (price must be greater than 0)"
      })
      return false
    }

    clearErrors("budgetItems")
    return true
  }

  // Calculate total budget
  const calculateTotalBudget = () => {
    if (!budgetItems || budgetItems.length === 0) return 0
    const validItems = budgetItems.filter(item => item.name?.trim() && Number(item.price) > 0)
    return validItems.reduce((total, item) => total + (Number(item.price) || 0), 0)
  }

  // Validate time range whenever startTime or endTime changes
  React.useEffect(() => {
    if (startTime && endTime) {
      const durationResult = calculateDuration()
      
      if (!durationResult.isValid) {
        setError("timeRange", {
          type: "manual",
          message: durationResult.display
        })
      } else {
        clearErrors("timeRange")
      }
    } else {
      clearErrors("timeRange")
    }
  }, [startTime, endTime, setError, clearErrors])

  // Validate budget items when needsBudget changes
  React.useEffect(() => {
    if (needsBudget && budgetItems.length > 0) {
      validateBudgetItems(budgetItems)
    } else {
      clearErrors("budgetItems")
    }
  }, [needsBudget, budgetItems])

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      // Final validation before submission
      if (startTime || endTime) {
        const durationResult = calculateDuration()
        if (!durationResult.isValid || durationResult.display.includes("cannot exceed")) {
          setError("timeRange", {
            type: "manual",
            message: "Please fix time range issues before submitting"
          })
          return
        }
      }

      // Validate task type
      if (!data.taskType || !data.taskType.trim()) {
        setError("taskType", {
          type: "manual",
          message: "Task type is required"
        })
        return
      }

      // Validate budget items if budget planning is needed and there are items
      if (needsBudget && budgetItems.length > 0) {
        const isValid = validateBudgetItems(budgetItems)
        if (!isValid) {
          return
        }
      }
      
      // Filter out empty budget items
      const filteredBudgetItems = data.budgetItems 
        ? data.budgetItems.filter(item => item.name?.trim() && Number(item.price) > 0)
        : [];
      
      const submitData = {
        ...data,
        budgetItems: filteredBudgetItems
      };
      
      // Show success toast
      showEnhancedSuccessToast(data.taskName)
      
      // Reset form after successful submission
      reset({
        taskType: "study",
        needsBudget: false,
        needsReminder: false,
        budgetItems: []
      })
      
      if (onSubmit) {
        await onSubmit(submitData);
      }
      
      // Close the form/modal if onClose function is provided
      if (onClose) {
        onClose();
      }
    } catch (error) {
      // Show error toast if submission fails
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      })
    }
  })

  const durationResult = calculateDuration()
  const totalBudget = calculateTotalBudget()
  const hasValidBudgetItems = budgetItems.some(item => item.name?.trim() && Number(item.price) > 0)

  return (
    <Box 
      bg="rgb(2, 5, 24)" 
      p={{ base: 4, sm: 6 }} 
      borderRadius="lg" 
      width="100%"
      maxW="100vw"
      overflow="hidden"
    >
      {/* Custom styles for calendar and time inputs */}
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
          padding: 5px;
          border-radius: 3px;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
          padding: 5px;
          border-radius: 3px;
        }
        
        input[type="time"]::-webkit-calendar-picker-indicator:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        select option {
          background: rgb(2, 5, 24);
          color: white;
        }
        
        select:focus option:checked {
          background: rgba(189, 8, 86, 0.3);
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Mobile optimizations */
        @media (max-width: 480px) {
          input, select {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
        }
      `}</style>
      
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={4} width="100%">
          
          {/* Task Name Input */}
          <FormControl isInvalid={errors.taskName}>
            <FormLabel color="white" fontSize={{ base: "sm", sm: "md" }}>Task Name</FormLabel>
            <Input 
              {...register("taskName", { required: "Task name is required" })}
              bg="transparent"
              border="1px solid"
              borderColor="gray.600"
              color="white"
              _hover={{
                borderColor: "gray.400",
              }}
              _focus={{
                border: "1px solid",
                borderColor: "pink.400",
                boxShadow: "0 0 10px rgba(189, 8, 86, 0.3)",
                outline: "none"
              }}
              placeholder="Enter task name"
              padding={{ base: '16px', sm: '20px' }}
              fontSize={{ base: "sm", sm: "md" }}
              width="100%"
            />
            <FormErrorMessage fontSize={{ base: "xs", sm: "sm" }}>{errors.taskName?.message}</FormErrorMessage>
          </FormControl>

          {/* Task Type Dropdown */}
          <FormControl isInvalid={errors.taskType}>
            <FormLabel color="white" fontSize={{ base: "sm", sm: "md" }}>Task Type</FormLabel>
            
            {!showCustomInput ? (
              <Select
                {...register("taskType", { required: "Task type is required" })}
                value={taskType}
                onChange={handleTaskTypeChange}
                bg="transparent"
                border="1px solid"
                borderColor="gray.600"
                color="white"
                _hover={{
                  borderColor: "gray.400",
                }}
                _focus={{
                  border: "1px solid",
                  borderColor: "pink.400",
                  boxShadow: "0 0 10px rgba(189, 8, 86, 0.3)",
                  outline: "none",
                }}
                width="100%"
                fontSize={{ base: "sm", sm: "md" }}
                // height={{ base: "48px", sm: "auto" }}
                iconColor="white"
                sx={{
                  '> option': {
                    background: 'rgb(2, 5, 24)',
                    color: 'white',
                    fontSize: { base: "sm", sm: "md" }
                  }
                }}
              >
                {taskTypeOptions.map((option) => {
                  const IconComponent = option.icon
                  return (
                    <option 
                      key={option.value} 
                      value={option.value}
                      style={{ 
                        background: 'rgb(2, 5, 24)', 
                        color: 'white',
                        padding: '10px'
                      }}
                    >
                      {option.label}
                    </option>
                  )
                })}
              </Select>
            ) : (
              <Input
                value={customTaskType}
                onChange={handleCustomTaskTypeChange}
                bg="transparent"
                border="1px solid"
                borderColor="gray.600"
                color="white"
                _hover={{
                  borderColor: "gray.400",
                }}
                _focus={{
                  border: "1px solid",
                  borderColor: "pink.400",
                  boxShadow: "0 0 10px rgba(189, 8, 86, 0.3)",
                  outline: "none"
                }}
                placeholder="Enter custom task type"
                padding={{ base: '16px', sm: '20px' }}
                fontSize={{ base: "sm", sm: "md" }}
                width="100%"
                autoFocus
              />
            )}
            
            {showCustomInput && (
              <Text 
                color="gray.400" 
                fontSize={{ base: "xs", sm: "sm" }} 
                mt={2} 
                cursor="pointer"
                _hover={{ color: "pink.400" }}
                onClick={() => {
                  setShowCustomInput(false)
                  setCustomTaskType("")
                  setValue("taskType", "study")
                }}
              >
                ← Back to predefined types
              </Text>
            )}
            
            <FormErrorMessage fontSize={{ base: "xs", sm: "sm" }}>{errors.taskType?.message}</FormErrorMessage>
          </FormControl>

          {/* Calendar Date Input */}
          <FormControl isInvalid={errors.dueDate}>
            <FormLabel color="white" fontSize={{ base: "sm", sm: "md" }}>Due Date</FormLabel>
            <InputGroup>
              <Input 
                type="date"
                {...register("dueDate", {
                  required: "Due date is required",
                  validate: validateDueDate
                })}
                bg="transparent"
                border="1px solid"
                borderColor="gray.600"
                color="white"
                _hover={{
                  borderColor: "gray.400",
                }}
                _focus={{
                  border: "1px solid",
                  borderColor: "pink.400",
                  boxShadow: "0 0 10px rgba(189, 8, 86, 0.3)",
                  outline: "none",
                }}
                padding={{ base: '16px', sm: '20px' }}
                fontSize={{ base: "sm", sm: "md" }}
                width="100%"
                sx={{
                  '&::-webkit-calendar-picker-indicator': {
                    backgroundColor: 'white',
                    borderRadius: '3px',
                    padding: '2px',
                    marginRight: '8px'
                  }
                }}
              />
            </InputGroup>
            <FormErrorMessage fontSize={{ base: "xs", sm: "sm" }}>{errors.dueDate?.message}</FormErrorMessage>
          </FormControl>

          {/* Description Input */}
          <FormControl isInvalid={errors.description}>
            <FormLabel color="white" fontSize={{ base: "sm", sm: "md" }}>Description</FormLabel>
            <Input 
              {...register("description", { required: "Description is required" })}
              bg="transparent"
              border="1px solid"
              borderColor="gray.600"
              color="white"
              _hover={{
                borderColor: "gray.400",
              }}
              _focus={{
                border: "1px solid",
                borderColor: "pink.400",
                boxShadow: "0 0 10px rgba(189, 8, 86, 0.3)",
                outline: "none"
              }}
              placeholder="Enter task description"
              padding={{ base: '16px', sm: '20px' }}
              fontSize={{ base: "sm", sm: "md" }}
              width="100%"
            />
            <FormErrorMessage fontSize={{ base: "xs", sm: "sm" }}>{errors.description?.message}</FormErrorMessage>
          </FormControl>

          {/* Time Fields - Show for all task types except personal */}
          {taskType !== "personal" && (
            <>
              {/* Start Time and End Time - Stack vertically on mobile */}
              <Stack 
                spacing={4} 
                width="100%" 
                direction={{ base: "column", sm: "row" }}
              >
                <FormControl isInvalid={errors.startTime} flex={1}>
                  <FormLabel color="white" fontSize={{ base: "sm", sm: "md" }}>Start Time</FormLabel>
                  <InputGroup position="relative">
                    <Input 
                      type="time"
                      {...register("startTime", {
                        required: taskType !== "personal" ? "Start time is required" : false
                      })}
                      bg="transparent"
                      border="1px solid"
                      borderColor="gray.600"
                      color="white"
                      _hover={{
                        borderColor: "gray.400",
                      }}
                      _focus={{
                        border: "1px solid",
                        borderColor: "pink.400",
                        boxShadow: "0 0 10px rgba(189, 8, 86, 0.3)",
                        outline: "none",
                      }}
                      padding={{ base: '16px', sm: '20px' }}
                      fontSize={{ base: "sm", sm: "md" }}
                      width="100%"
                      sx={{
                        '&::-webkit-calendar-picker-indicator': {
                          background: 'transparent',
                          color: 'transparent',
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          top: 0,
                          left: 0,
                          cursor: 'pointer',
                          opacity: 1,
                          zIndex: 1
                        },
                        '&::before': {
                          content: '"⌚"',
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'white',
                          pointerEvents: 'none',
                          zIndex: 0,
                          fontSize: { base: '16px', sm: '18px' }
                        }
                      }}
                    />
                  </InputGroup>
                  <FormErrorMessage fontSize={{ base: "xs", sm: "sm" }}>{errors.startTime?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.endTime} flex={1}>
                  <FormLabel color="white" fontSize={{ base: "sm", sm: "md" }}>End Time</FormLabel>
                  <InputGroup position="relative">
                    <Input 
                      type="time"
                      {...register("endTime", {
                        required: taskType !== "personal" ? "End time is required" : false
                      })}
                      bg="transparent"
                      border="1px solid"
                      borderColor="gray.600"
                      color="white"
                      _hover={{
                        borderColor: "gray.400",
                      }}
                      _focus={{
                        border: "1px solid",
                        borderColor: "pink.400",
                        boxShadow: "0 0 10px rgba(189, 8, 86, 0.3)",
                        outline: "none",
                      }}
                      padding={{ base: '16px', sm: '20px' }}
                      fontSize={{ base: "sm", sm: "md" }}
                      width="100%"
                      sx={{
                        '&::-webkit-calendar-picker-indicator': {
                          background: 'transparent',
                          color: 'transparent',
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          top: 0,
                          left: 0,
                          cursor: 'pointer',
                          opacity: 1,
                          zIndex: 1
                        },
                        '&::before': {
                          content: '"⌚"',
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'white',
                          pointerEvents: 'none',
                          zIndex: 0,
                          fontSize: { base: '16px', sm: '18px' }
                        }
                      }}
                    />
                  </InputGroup>
                  <FormErrorMessage fontSize={{ base: "xs", sm: "sm" }}>{errors.endTime?.message}</FormErrorMessage>
                </FormControl>
              </Stack>

              {/* Time Range Validation Error */}
              {errors.timeRange && (
                <Text color="red.400" fontSize={{ base: "xs", sm: "sm" }} mt={-2}>
                  {errors.timeRange.message}
                </Text>
              )}

              {/* Duration Display */}
              {(startTime || endTime) && (
                <FormControl isInvalid={!durationResult.isValid} width="100%">
                  <FormLabel color="white" fontSize={{ base: "sm", sm: "md" }}>Total Duration</FormLabel>
                  <Input 
                    value={durationResult.display}
                    bg="transparent"
                    border="1px solid"
                    borderColor={durationResult.isValid ? "gray.600" : "red.500"}
                    color={
                      durationResult.isValid 
                        ? (startTime && endTime ? "green.300" : "gray.400")
                        : "red.400"
                    }
                    padding={{ base: '16px', sm: '20px' }}
                    fontSize={{ base: "sm", sm: "md" }}
                    isReadOnly
                    _focus={{
                      border: "1px solid",
                      borderColor: durationResult.isValid ? "gray.600" : "red.500",
                      boxShadow: "none",
                      outline: "none"
                    }}
                    fontWeight={startTime && endTime ? "medium" : "normal"}
                    width="100%"
                  />
                  {!durationResult.isValid && durationResult.display !== "Set start and end time" && (
                    <FormErrorMessage fontSize={{ base: "xs", sm: "sm" }}>{durationResult.display}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            </>
          )}

          {/* Budget Planning Checkbox */}
          <FormControl>
            <Checkbox 
              colorScheme="pink"
              isChecked={needsBudget}
              onChange={handleBudgetCheckboxChange}
              size={{ base: "md", sm: "lg" }}
            >
              <Box color="white" fontSize={{ base: "sm", sm: "md" }}>Did your task need budget planning?</Box>
            </Checkbox>
          </FormControl>

          {/* Reminder Checkbox */}
          <FormControl>
            <Checkbox 
              colorScheme="pink"
              isChecked={needsReminder}
              onChange={handleReminderCheckboxChange}
              size={{ base: "md", sm: "lg" }}
            >
              <Box color="white" fontSize={{ base: "sm", sm: "md" }}>Do you need a reminder for this task?</Box>
            </Checkbox>
          </FormControl>

          {/* Conditional Fields for Budget Planning */}
          {needsBudget && (
            <FormControl isInvalid={errors.budgetItems} width="100%">
              <FormLabel color="white" fontSize={{ base: "sm", sm: "md" }}>Budget Items</FormLabel>
              <VStack spacing={3} width="100%" align="stretch">
                {budgetItems.map((item, index) => (
                  <Stack 
                    key={index} 
                    spacing={3} 
                    width="100%" 
                    direction={{ base: "column", sm: "row" }}
                    align={{ base: "stretch", sm: "center" }}
                  >
                    <Input
                      value={item.name}
                      onChange={(e) => updateBudgetItem(index, "name", e.target.value)}
                      bg="transparent"
                      border="1px solid"
                      borderColor={!item.name?.trim() && errors.budgetItems ? "red.500" : "gray.600"}
                      color="white"
                      _hover={{
                        borderColor: !item.name?.trim() && errors.budgetItems ? "red.400" : "gray.400",
                      }}
                      _focus={{
                        border: "1px solid",
                        borderColor: "pink.400",
                        boxShadow: "0 0 10px rgba(189, 8, 86, 0.3)",
                        outline: "none"
                      }}
                      placeholder="Item name"
                      padding={{ base: '12px', sm: '15px' }}
                      
                      fontSize={{ base: "sm", sm: "md" }}
                      flex={{ sm: 2 }}
                    />
                    <InputGroup flex={{ sm: 1 }}>
  {/* <InputLeftElement pointerEvents="none">
    <LuDollarSign color="white" size={16} />
  </InputLeftElement> */}

  <NumberInput
    value={item.price}
    min={0}
    onChange={(valueString) => updateBudgetItem(index, "price", valueString)}
    width="100%"
  >
    <NumberInputField
      pl="32px"   // <-- ensures icon + input stay inline
      bg="transparent"
      border="1px solid"
      borderColor={(Number(item.price) <= 0 && errors.budgetItems) ? "red.500" : "gray.600"}
      color="white"
      _hover={{
        borderColor: (Number(item.price) <= 0 && errors.budgetItems) ? "red.400" : "gray.400",
      }}
      _focus={{
        border: "1px solid",
        borderColor: "pink.400",
        boxShadow: "0 0 10px rgba(189, 8, 86, 0.3)",
        outline: "none"
      }}
      padding={{ base: '12px', sm: '15px' }}
      fontSize={{ base: "sm", sm: "md" }}
    />
  </NumberInput>
</InputGroup>
                    <IconButton
                      icon={<LuTrash2 color="white" size={16} />}
                      onClick={() => removeBudgetItem(index)}
                      colorScheme="red"
                      variant="outline"
                      aria-label="Remove item"
                      padding={{ base: '12px', sm: '15px' }}
                      flexShrink={0}
                      minW="auto"
                      _hover={{
                        bg: "red.500",
                        borderColor: "red.500"
                      }}
                    />
                  </Stack>
                ))}
                
                <Button
                  leftIcon={<LuPlus color="pink.400" size={18} />}
                  onClick={addBudgetItem}
                  variant="outline"
                  colorScheme="pink"
                  borderColor="pink.400"
                  color="pink.400"
                  _hover={{
                    bg: "pink.400",
                    color: "white"
                  }}
                  padding={{ base: '12px', sm: '15px' }}
                  fontSize={{ base: "sm", sm: "md" }}
                  width="100%"
                >
                  Add Budget Item
                </Button>

                {/* Total Budget Display */}
                {hasValidBudgetItems && (
                  <Box 
                    bg="transparent" 
                    border="1px solid" 
                    borderColor="green.500"
                    borderRadius="md" 
                    p={3}
                    mt={2}
                    width="100%"
                  >
                    <HStack justify="space-between">
                      <Text color="white" fontWeight="bold" fontSize={{ base: "sm", sm: "md" }}>Total Budget:</Text>
                      <Text color="green.300" fontWeight="bold" fontSize={{ base: "md", sm: "lg" }}>
                        ${totalBudget.toFixed(2)}
                      </Text>
                    </HStack>
                  </Box>
                )}
              </VStack>
              <FormErrorMessage fontSize={{ base: "xs", sm: "sm" }}>{errors.budgetItems?.message}</FormErrorMessage>
            </FormControl>
          )}

          {/* Action Buttons */}
          <Stack 
            spacing={4} 
            width="100%" 
            mt={4}
            direction={{ base: "column", sm: "row" }}
          >
            <Button 
              type="submit"
              flex={2}
              bgGradient="linear(145deg, #bd0856, #f79bcc, #f48d7b)"
              color="white"
              _hover={{
                bgGradient: "linear(145deg, #a5074a, #e589b8, #e07a6a)",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 20px rgba(189, 8, 86, 0.4)"
              }}
              _active={{
                transform: "translateY(0)"
              }}
              padding={{ base: '20px', sm: '25px' }}
              fontSize={{ base: "sm", sm: "md" }}
              isLoading={isSubmitting}
              isDisabled={
                !!errors.timeRange || 
                !!errors.budgetItems || 
                !!errors.taskType
              }
            >
              Add Task
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  )
}

export default TaskForm