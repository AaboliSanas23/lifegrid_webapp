import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskForm from "./TaskForm";

// Enhanced sample realistic tasks for student planner with more variety
const SAMPLE_TASKS = [
  // ==================== 2024 TASKS (ALL COMPLETED) ====================
  // January 2024
  {
    id: 401,
    taskType: "personal",
    needsBudget: false,
    needsReminder: true,
    taskName: "Set 2024 Financial Goals",
    dueDate: "2024-01-05",
    description: "Determine savings targets and investment allocation for the year.",
    startTime: "19:00",
    endTime: "20:00",
    completed: true,
    priority: "medium"
  },
  {
    id: 1,
    taskType: "study",
    needsBudget: false,
    needsReminder: true,
    taskName: "React & Next.js Fundamentals",
    dueDate: "2024-01-15",
    description: "Master React hooks, context API and Next.js 14 App Router",
    startTime: "09:00",
    endTime: "12:00",
    completed: true,
    priority: "high"
  },
  {
    id: 2,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "E-commerce Website MVP",
    dueDate: "2024-01-25",
    description: "Build full-stack e-commerce with payment integration",
    startTime: "14:00",
    endTime: "18:00",
    completed: true,
    budgetItems: [
      { name: "Stripe fees", price: "25" },
      { name: "Hosting", price: "15" }
    ],
    priority: "high"
  },

  // February 2024
  {
    id: 4,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "Portfolio Website",
    dueDate: "2024-02-10",
    description: "Modern portfolio with animations and responsive design",
    startTime: "09:00",
    endTime: "17:00",
    completed: true,
    budgetItems: [
      { name: "Domain", price: "12" },
      { name: "UI Assets", price: "20" }
    ],
    priority: "high"
  },
  {
    id: 5,
    taskType: "exam",
    needsBudget: false,
    needsReminder: true,
    taskName: "JavaScript Algorithms Test",
    dueDate: "2024-02-20",
    description: "Data structures and problem solving assessment",
    startTime: "14:00",
    endTime: "16:00",
    completed: true,
    priority: "medium"
  },
  {
    id: 402,
    taskType: "fitness",
    needsBudget: false,
    needsReminder: false,
    taskName: "Complete 10k steps 15 times",
    dueDate: "2024-02-29",
    description: "Achieve the physical activity goal for the month.",
    startTime: "07:00",
    endTime: "21:00",
    completed: true,
    priority: "low"
  },

  // March 2024
  {
    id: 7,
    taskType: "study",
    needsBudget: true,
    needsReminder: true,
    taskName: "Node.js Backend Development",
    dueDate: "2024-03-05",
    description: "REST APIs, authentication and database integration",
    startTime: "10:00",
    endTime: "13:00",
    completed: true,
    budgetItems: [
      { name: "Backend course", price: "45" },
      { name: "Database hosting", price: "10" }
    ],
    priority: "high"
  },
  {
    id: 8,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "Real-time Chat Application",
    dueDate: "2024-03-15",
    description: "WebSocket-based chat with rooms and file sharing",
    startTime: "14:00",
    endTime: "18:00",
    completed: true,
    budgetItems: [
      { name: "WebSocket server", price: "18" },
      { name: "File storage", price: "12" }
    ],
    priority: "medium"
  },
  {
    id: 403,
    taskType: "maintenance",
    needsBudget: false,
    needsReminder: true,
    taskName: "Change Smoke Detector Batteries",
    dueDate: "2024-03-25",
    description: "Replace batteries in all smoke detectors for safety.",
    startTime: "19:00",
    endTime: "20:00",
    completed: true,
    priority: "high"
  },

  // April 2024
  {
    id: 10,
    taskType: "study",
    needsBudget: false,
    needsReminder: true,
    taskName: "MongoDB & Database Design",
    dueDate: "2024-04-10",
    description: "NoSQL database design and optimization",
    startTime: "13:00",
    endTime: "16:00",
    completed: true,
    priority: "medium"
  },
  {
    id: 11,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "Task Management App",
    dueDate: "2024-04-22",
    description: "Full-stack task manager with drag-drop functionality",
    startTime: "09:00",
    endTime: "17:00",
    completed: true,
    budgetItems: [
      { name: "Hosting", price: "15" },
      { name: "UI library", price: "25" }
    ],
    priority: "high"
  },
  {
    id: 404,
    taskType: "personal",
    needsBudget: false,
    needsReminder: true,
    taskName: "File Q1 Estimated Taxes",
    dueDate: "2024-04-30",
    description: "Submit Q1 estimated taxes to avoid penalties.",
    startTime: "18:00",
    endTime: "21:00",
    completed: true,
    priority: "high"
  },

  // May 2024
  {
    id: 405,
    taskType: "study",
    needsBudget: false,
    needsReminder: true,
    taskName: "Introduction to Kubernetes",
    dueDate: "2024-05-18",
    description: "Understand basic Kubernetes concepts, pods, and services.",
    startTime: "10:00",
    endTime: "13:00",
    completed: true,
    priority: "medium"
  },
  {
    id: 406,
    taskType: "personal",
    needsBudget: false,
    needsReminder: false,
    taskName: "Spring Cleaning of Home Office",
    dueDate: "2024-05-25",
    description: "Declutter desk, organize cables, and shred old documents.",
    startTime: "09:00",
    endTime: "12:00",
    completed: true,
    priority: "low"
  },

  // June 2024
  {
    id: 407,
    taskType: "fitness",
    needsBudget: false,
    needsReminder: true,
    taskName: "Schedule Yearly Eye Exam",
    dueDate: "2024-06-10",
    description: "Book and attend annual eye checkup.",
    startTime: "16:00",
    endTime: "17:00",
    completed: true,
    priority: "medium"
  },
  {
    id: 408,
    taskType: "maintenance",
    needsBudget: true,
    needsReminder: true,
    taskName: "Inspect Car Tires and Brakes",
    dueDate: "2024-06-28",
    description: "Take the car in for a mid-year safety inspection.",
    startTime: "10:00",
    endTime: "12:00",
    completed: true,
    budgetItems: [
      { name: "Inspection fee", price: "50" }
    ],
    priority: "medium"
  },

  // September 2024
  {
    id: 12,
    taskType: "study",
    needsBudget: false,
    needsReminder: true,
    taskName: "AWS Cloud Fundamentals",
    dueDate: "2024-09-05",
    description: "Cloud computing concepts and basic AWS services (EC2, S3)",
    startTime: "09:00",
    endTime: "12:00",
    completed: true,
    priority: "medium"
  },
  {
    id: 13,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "Serverless API (Lambda)",
    dueDate: "2024-09-18",
    description: "Build serverless functions with AWS Lambda and API Gateway",
    startTime: "14:00",
    endTime: "17:00",
    completed: true,
    budgetItems: [
      { name: "AWS credits", price: "20" }
    ],
    priority: "medium"
  },
  {
    id: 409,
    taskType: "personal",
    needsBudget: true,
    needsReminder: true,
    taskName: "Renew Professional Membership",
    dueDate: "2024-09-30",
    description: "Pay for annual membership to industry resource site.",
    startTime: "19:00",
    endTime: "20:00",
    completed: true,
    budgetItems: [
      { name: "Membership fee", price: "120" }
    ],
    priority: "high"
  },

  // October 2024
  {
    id: 15,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "AI Blog Generator (OpenAI)",
    dueDate: "2024-10-08",
    description: "Integrate OpenAI API for automated content generation",
    startTime: "14:00",
    endTime: "17:00",
    completed: true,
    budgetItems: [
      { name: "OpenAI API credits", price: "30" },
      { name: "Deployment", price: "15" }
    ],
    priority: "high"
  },
  {
    id: 16,
    taskType: "study",
    needsBudget: true,
    needsReminder: false,
    taskName: "Python for Automation",
    dueDate: "2024-10-20",
    description: "Python scripting for task automation (requests, os libraries)",
    startTime: "15:00",
    endTime: "17:00",
    completed: true,
    budgetItems: [
      { name: "Python course", price: "40" }
    ],
    priority: "medium"
  },
  {
    id: 410,
    taskType: "personal",
    needsBudget: false,
    needsReminder: true,
    taskName: "Book Flu Shot Appointment",
    dueDate: "2024-10-25",
    description: "Schedule annual flu vaccination.",
    startTime: "17:00",
    endTime: "18:00",
    completed: true,
    priority: "medium"
  },

  // November 2024
  {
    id: 17,
    taskType: "study",
    needsBudget: true,
    needsReminder: false,
    taskName: "React Native Basics",
    dueDate: "2024-11-05",
    description: "Mobile development with React Native and Expo",
    startTime: "15:00",
    endTime: "17:00",
    completed: true,
    budgetItems: [
      { name: "Mobile development course", price: "35" }
    ],
    priority: "medium"
  },
  {
    id: 18,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "Fitness Tracking App",
    dueDate: "2024-11-18",
    description: "Mobile app for workout tracking and progress monitoring",
    startTime: "09:00",
    endTime: "18:00",
    completed: true,
    budgetItems: [
      { name: "App store fees", price: "25" },
      { name: "Backend services", price: "20" }
    ],
    priority: "high"
  },
  {
    id: 411,
    taskType: "personal",
    needsBudget: false,
    needsReminder: true,
    taskName: "Review Health Insurance Plan",
    dueDate: "2024-11-28",
    description: "Check for changes and finalize enrollment during open season.",
    startTime: "20:00",
    endTime: "21:00",
    completed: true,
    priority: "high"
  },

  // December 2024
  {
    id: 412,
    taskType: "personal",
    needsBudget: true,
    needsReminder: true,
    taskName: "Purchase & Wrap Holiday Gifts",
    dueDate: "2024-12-15",
    description: "Finish all gift shopping and preparation.",
    startTime: "10:00",
    endTime: "14:00",
    completed: true,
    budgetItems: [
      { name: "Gift budget", price: "300" }
    ],
    priority: "medium"
  },
  {
    id: 413,
    taskType: "project",
    needsBudget: false,
    needsReminder: false,
    taskName: "Final Portfolio Polish",
    dueDate: "2024-12-24",
    description: "Ensure all new projects are documented and links are valid.",
    startTime: "14:00",
    endTime: "17:00",
    completed: true,
    priority: "low"
  },
  {
    id: 414,
    taskType: "personal",
    needsBudget: false,
    needsReminder: true,
    taskName: "2024 Year-End Financial Audit",
    dueDate: "2024-12-31",
    description: "Reconcile all bank and credit card accounts for the year.",
    startTime: "20:00",
    endTime: "22:00",
    completed: true,
    priority: "high"
  },

  // ==================== 2025 TASKS (JAN - OCT COMPLETED) ====================
  // January 2025
  {
    id: 20,
    taskType: "study",
    needsBudget: true,
    needsReminder: true,
    taskName: "Advanced React Patterns",
    dueDate: "2025-01-08",
    description: "Compound components, render props and state machines (XState)",
    startTime: "09:00",
    endTime: "12:00",
    completed: true,
    budgetItems: [
      { name: "Advanced React course", price: "55" }
    ],
    priority: "high"
  },
  {
    id: 21,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "SaaS Dashboard Prototype",
    dueDate: "2025-01-20",
    description: "Admin dashboard with analytics and user management",
    startTime: "14:00",
    endTime: "18:00",
    completed: true,
    budgetItems: [
      { name: "Chart libraries", price: "25" },
      { name: "Hosting", price: "20" }
    ],
    priority: "high"
  },
  {
    id: 501,
    taskType: "maintenance",
    needsBudget: false,
    needsReminder: true,
    taskName: "Schedule Annual Furnace Tune-Up",
    dueDate: "2025-01-25",
    description: "Book HVAC technician for routine winter maintenance.",
    startTime: "15:00",
    endTime: "16:00",
    completed: true,
    priority: "medium"
  },

  // February 2025
  {
    id: 502,
    taskType: "fitness",
    needsBudget: false,
    needsReminder: false,
    taskName: "Start Strength Training Routine",
    dueDate: "2025-02-01",
    description: "Begin a consistent 3-day per week strength routine.",
    startTime: "06:30",
    endTime: "07:30",
    completed: true,
    priority: "medium"
  },
  {
    id: 23,
    taskType: "study",
    needsBudget: false,
    needsReminder: true,
    taskName: "GraphQL & Apollo",
    dueDate: "2025-02-12",
    description: "Modern API development with GraphQL schema definition",
    startTime: "10:00",
    endTime: "13:00",
    completed: true,
    priority: "medium"
  },
  {
    id: 24,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "GraphQL API Implementation",
    dueDate: "2025-02-24",
    description: "Convert REST API to GraphQL with caching",
    startTime: "14:00",
    endTime: "18:00",
    completed: true,
    budgetItems: [
      { name: "GraphQL tools", price: "18" },
      { name: "Caching service", price: "12" }
    ],
    priority: "high"
  },

  // March 2025
  {
    id: 25,
    taskType: "exam",
    needsBudget: false,
    needsReminder: true,
    taskName: "System Design Assessment",
    dueDate: "2025-03-10",
    description: "Large-scale system architecture design practice",
    startTime: "14:00",
    endTime: "16:00",
    completed: true,
    priority: "high"
  },
  {
    id: 26,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "Open Source Contribution",
    dueDate: "2025-03-25",
    description: "Contribute to major React or Next.js open source project",
    startTime: "09:00",
    endTime: "17:00",
    completed: true,
    budgetItems: [
      { name: "Development tools", price: "30" }
    ],
    priority: "medium"
  },
  {
    id: 503,
    taskType: "personal",
    needsBudget: false,
    needsReminder: true,
    taskName: "Organize Investment Statements",
    dueDate: "2025-03-29",
    description: "Gather necessary documents for year's tax preparation.",
    startTime: "19:00",
    endTime: "21:00",
    completed: true,
    priority: "high"
  },

  // April 2025
  {
    id: 27,
    taskType: "study",
    needsBudget: true,
    needsReminder: true,
    taskName: "Docker & Containerization",
    dueDate: "2025-04-07",
    description: "Container management and orchestration basics (Dockerfiles)",
    startTime: "13:00",
    endTime: "16:00",
    completed: true,
    budgetItems: [
      { name: "Docker course", price: "35" }
    ],
    priority: "medium"
  },
  {
    id: 504,
    taskType: "personal",
    needsBudget: true,
    needsReminder: false,
    taskName: "Attend Industry Conference",
    dueDate: "2025-04-18",
    description: "Networking and professional development event.",
    startTime: "09:00",
    endTime: "17:00",
    completed: true,
    budgetItems: [
      { name: "Ticket cost", price: "150" }
    ],
    priority: "low"
  },
  {
    id: 28,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "Microservices Setup (Docker)",
    dueDate: "2025-04-21",
    description: "Dockerize existing application with multiple services",
    startTime: "09:00",
    endTime: "17:00",
    completed: true,
    budgetItems: [
      { name: "Container registry", price: "15" },
      { name: "Monitoring tools", price: "20" }
    ],
    priority: "high"
  },

  // May 2025
  {
    id: 505,
    taskType: "study",
    needsBudget: false,
    needsReminder: true,
    taskName: "Advanced TypeScript (Monorepos)",
    dueDate: "2025-05-20",
    description: "Deep dive into advanced TypeScript patterns and Lerna/Nx setup.",
    startTime: "14:00",
    endTime: "17:00",
    completed: true,
    priority: "high"
  },
  {
    id: 506,
    taskType: "maintenance",
    needsBudget: false,
    needsReminder: false,
    taskName: "Replace Kitchen Faucet Filter",
    dueDate: "2025-05-31",
    description: "Routine replacement of water filtration element.",
    startTime: "18:00",
    endTime: "19:00",
    completed: true,
    priority: "low"
  },

  // September 2025
  {
    id: 29,
    taskType: "study",
    needsBudget: true,
    needsReminder: true,
    taskName: "Machine Learning Fundamentals",
    dueDate: "2025-09-04",
    description: "Python, TensorFlow and basic ML concepts (linear regression)",
    startTime: "10:00",
    endTime: "13:00",
    completed: true,
    budgetItems: [
      { name: "ML Course", price: "65" },
      { name: "Cloud GPU hours", price: "40" }
    ],
    priority: "high"
  },
  {
    id: 30,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "AI Image Recognition",
    dueDate: "2025-09-18",
    description: "Build image classification model with TensorFlow.js",
    startTime: "14:00",
    endTime: "18:00",
    completed: true,
    budgetItems: [
      { name: "Training data", price: "25" },
      { name: "Model hosting", price: "35" }
    ],
    priority: "high"
  },
  {
    id: 507,
    taskType: "fitness",
    needsBudget: true,
    needsReminder: true,
    taskName: "Run Local 5K Race",
    dueDate: "2025-09-21",
    description: "Participate in local race as a fitness goal.",
    startTime: "08:00",
    endTime: "10:00",
    completed: true,
    budgetItems: [
      { name: "Registration fee", price: "40" }
    ],
    priority: "medium"
  },

  // October 2025
  {
    id: 32,
    taskType: "study",
    needsBudget: false,
    needsReminder: false,
    taskName: "DevOps & CI/CD Pipelines",
    dueDate: "2025-10-14",
    description: "Continuous integration and deployment strategies (GitHub Actions)",
    startTime: "15:00",
    endTime: "17:00",
    completed: true,
    priority: "medium"
  },
  {
    id: 33,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "Automated Deployment System",
    dueDate: "2025-10-28",
    description: "Set up GitHub Actions for automated testing and deployment",
    startTime: "09:00",
    endTime: "17:00",
    completed: true,
    budgetItems: [
      { name: "CI/CD tools", price: "20" }
    ],
    priority: "high"
  },
  {
    id: 508,
    taskType: "maintenance",
    needsBudget: false,
    needsReminder: true,
    taskName: "Change Air Conditioner Filters",
    dueDate: "2025-10-31",
    description: "Replace filters and prepare unit for winter storage.",
    startTime: "16:00",
    endTime: "17:00",
    completed: true,
    priority: "medium"
  },

  // ==================== 2025 TASKS (NOV - DEC PENDING) ====================
  // November 2025
  {
    id: 34,
    taskType: "project",
    needsBudget: true,
    needsReminder: true,
    taskName: "Microservices Architecture",
    dueDate: "2025-11-12",
    description: "Build scalable microservices with Docker and Kubernetes",
    startTime: "09:00",
    endTime: "18:00",
    completed: false,
    budgetItems: [
      { name: "Cloud services", price: "50" },
      { name: "Monitoring tools", price: "25" }
    ],
    priority: "high"
  },
  {
    id: 509,
    taskType: "personal",
    needsBudget: false,
    needsReminder: false,
    taskName: "Update Will/Estate Documents",
    dueDate: "2025-11-20",
    description: "Review and update legal documents with current assets/goals.",
    startTime: "20:00",
    endTime: "22:00",
    completed: false,
    priority: "low"
  },
  {
    id: 35,
    taskType: "exam",
    needsBudget: false,
    needsReminder: true,
    taskName: "AWS Solutions Architect",
    dueDate: "2025-11-26",
    description: "Advanced cloud architecture certification practice test.",
    startTime: "10:00",
    endTime: "13:00",
    completed: false,
    priority: "high"
  },

  // December 2025
  {
    id: 510,
    taskType: "study",
    needsBudget: false,
    needsReminder: false,
    taskName: "Review Cloud Security Basics",
    dueDate: "2025-12-10",
    description: "Focus on IAM policies and encryption best practices.",
    startTime: "15:00",
    endTime: "17:00",
    completed: false,
    priority: "medium"
  },
  {
    id: 511,
    taskType: "personal",
    needsBudget: false,
    needsReminder: true,
    taskName: "Year-End Financial Planning 2026",
    dueDate: "2025-12-27",
    description: "Set budget and investment strategy for the upcoming year.",
    startTime: "19:00",
    endTime: "21:00",
    completed: false,
    priority: "high"
  },
  {
    id: 512,
    taskType: "project",
    needsBudget: false,
    needsReminder: false,
    taskName: "Document All Open Source Contributions",
    dueDate: "2025-12-30",
    description: "Gather links and descriptions for portfolio updates.",
    startTime: "14:00",
    endTime: "17:00",
    completed: false,
    priority: "low"
  },

  // ==================== 2026 TASKS (ALL PENDING) ====================
  // January 2026
  {
    id: 601,
    taskType: "personal",
    needsBudget: true,
    needsReminder: true,
    taskName: "Pay Monthly Bills & Rent",
    dueDate: "2026-01-07",
    description: "Transfer funds for all regular monthly payments.",
    startTime: "18:00",
    endTime: "19:00",
    completed: false,
    budgetItems: [
      { name: "Rent/Mortgage", price: "1500" },
      { name: "Utilities", price: "250" }
    ],
    priority: "high"
  },
  {
    id: 602,
    taskType: "fitness",
    needsBudget: false,
    needsReminder: true,
    taskName: "Gym Session (Leg Day)",
    dueDate: "2026-01-12",
    description: "Scheduled strength training workout.",
    startTime: "18:00",
    endTime: "19:30",
    completed: false,
    priority: "medium"
  },
  {
    id: 36,
    taskType: "study",
    needsBudget: true,
    needsReminder: true,
    taskName: "Advanced AI & Neural Networks",
    dueDate: "2026-01-15",
    description: "Deep learning, CNN and transformer architectures",
    startTime: "09:00",
    endTime: "12:00",
    completed: false,
    budgetItems: [
      { name: "Advanced ML Course", price: "85" },
      { name: "Cloud computing", price: "60" }
    ],
    priority: "high"
  },
  {
    id: 603,
    taskType: "project",
    needsBudget: false,
    needsReminder: true,
    taskName: "Setup Advanced AI Project Repo",
    dueDate: "2026-01-20",
    description: "Initialize GitHub repository and install base dependencies for AI project.",
    startTime: "14:00",
    endTime: "17:00",
    completed: false,
    priority: "medium"
  },
  {
    id: 604,
    taskType: "maintenance",
    needsBudget: false,
    needsReminder: false,
    taskName: "Deep Clean Kitchen Appliances",
    dueDate: "2026-01-24",
    description: "Clean oven, refrigerator, and microwave thoroughly.",
    startTime: "10:00",
    endTime: "13:00",
    completed: false,
    priority: "low"
  },
  {
    id: 605,
    taskType: "personal",
    needsBudget: false,
    needsReminder: true,
    taskName: "Q4 2025 Tax Document Review",
    dueDate: "2026-01-29",
    description: "Gather and organize Q4 financial documents in preparation for annual filing.",
    startTime: "19:00",
    endTime: "21:00",
    completed: false,
    priority: "high"
  }
];

// Circular Progress Bar Component
const CircularProgressBar = ({ completed, total, size = 60, strokeWidth = 6 }) => {
  const progress = total === 0 ? 0 : (completed / total) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className="circular-progress-container"
      style={{ width: size, height: size, position: 'relative' }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FF2D95"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: '600',
        color: 'white'
      }}>
        <span>{completed}</span>
        <span style={{ fontSize: '10px', opacity: 0.6 }}>/{total}</span>
      </div>
    </motion.div>
  );
};

// Compact PieChart Component with Tooltips
const PieChart = ({ 
  data, 
  colors, 
  size = 120, 
  title,
  showPercentage = true,
  showValues = true,
  innerRadius = 0.4
}) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value > 0)
  );
  
  if (Object.keys(filteredData).length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        {title && <h4 style={{ marginBottom: '16px', color: 'white' }}>{title}</h4>}
        <div style={{ color: 'rgba(255,255,255,0.5)' }}>No data available</div>
      </div>
    );
  }

  let currentAngle = 0;
  const segments = Object.entries(filteredData).map(([label, value], index) => {
    const percentage = (value / total) * 100;
    const angle = (value / total) * 360;
    const segment = {
      label,
      value,
      percentage,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      color: colors[index % colors.length]
    };
    currentAngle += angle;
    return segment;
  });

  const radius = size / 2;
  const center = size / 2;
  const innerRadiusPx = radius * innerRadius;

  const handleMouseMove = (event, segment) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
    setHoveredSegment(segment);
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
  };

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      {title && <h4 style={{ marginBottom: '16px', color: 'white', fontSize: '18px', fontWeight: '600' }}>{title}</h4>}
      
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <svg 
          width={size} 
          height={size}
          onMouseLeave={handleMouseLeave}
        >
          {segments.map((segment, index) => {
            if (segment.value === 0) return null;
            
            const startAngleRad = (segment.startAngle - 90) * (Math.PI / 180);
            const endAngleRad = (segment.endAngle - 90) * (Math.PI / 180);
            
            const x1 = center + radius * Math.cos(startAngleRad);
            const y1 = center + radius * Math.sin(startAngleRad);
            const x2 = center + radius * Math.cos(endAngleRad);
            const y2 = center + radius * Math.sin(endAngleRad);
            
            const innerX1 = center + innerRadiusPx * Math.cos(startAngleRad);
            const innerY1 = center + innerRadiusPx * Math.sin(startAngleRad);
            const innerX2 = center + innerRadiusPx * Math.cos(endAngleRad);
            const innerY2 = center + innerRadiusPx * Math.sin(endAngleRad);
            
            const largeArcFlag = segment.endAngle - segment.startAngle <= 180 ? 0 : 1;
            
            const pathData = [
              `M ${innerX1} ${innerY1}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `L ${innerX2} ${innerY2}`,
              `A ${innerRadiusPx} ${innerRadiusPx} 0 ${largeArcFlag} 0 ${innerX1} ${innerY1}`,
              'Z'
            ].join(' ');
            
            return (
              <g key={index}>
                <path
                  d={pathData}
                  fill={segment.color}
                  stroke="#fff"
                  strokeWidth="1"
                  onMouseMove={(e) => handleMouseMove(e, segment)}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    filter: hoveredSegment === segment ? 'brightness(1.2)' : 'brightness(1)'
                  }}
                />
                {/* Invisible larger hit area for better hover */}
                <path
                  d={pathData}
                  fill="transparent"
                  stroke="transparent"
                  strokeWidth="10"
                  onMouseMove={(e) => handleMouseMove(e, segment)}
                  style={{ cursor: 'pointer' }}
                />
              </g>
            );
          })}
          
          <circle cx={center} cy={center} r={innerRadiusPx - 2} fill="white" />
        </svg>
        
        {/* Tooltip */}
        {hoveredSegment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'absolute',
              left: tooltipPosition.x + 10,
              top: tooltipPosition.y - 10,
              background: 'rgba(0, 0, 0, 0.85)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              pointerEvents: 'none',
              zIndex: 1000,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              minWidth: '120px',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '4px' 
            }}>
              <div 
                style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: hoveredSegment.color,
                  marginRight: '6px'
                }} 
              />
              <strong>{hoveredSegment.label}</strong>
            </div>
            <div>Value: {hoveredSegment.value}</div>
            <div>Percentage: {hoveredSegment.percentage.toFixed(1)}%</div>
          </motion.div>
        )}
        
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '24px', fontWeight: '700', color: '#FF2D95' }}>{total}</span>
          <br />
          <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>Total</span>
        </div>
      </div>
      
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        {segments.map((segment, index) => (
          <motion.div 
            key={index} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '8px',
              gap: '8px',
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={() => setHoveredSegment(segment)}
            onMouseLeave={() => setHoveredSegment(null)}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '3px',
              backgroundColor: segment.color,
              flexShrink: 0
            }}></div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: 'white' }}>{segment.label}</span>
              {showValues && (
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>
                  {segment.value}
                  {showPercentage && (
                    <span style={{ fontSize: '12px', marginLeft: '4px', color: 'rgba(255,255,255,0.6)' }}>
                      ({segment.percentage.toFixed(0)}%)
                    </span>
                  )}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Task Analytics Content Component with Tabs
const TaskAnalyticsContent = ({ tasks, statsData, detailedStats }) => {
  const [selectedChart, setSelectedChart] = useState('completion');
  const isMobile = window.innerWidth <= 768;
  const chartOptions = [
    {
      id: 'completion',
      label: 'Task Completion',
      icon: '📊',
      description: 'View completed vs pending tasks'
    },
    {
      id: 'taskTypes',
      label: 'Task Types',
      icon: '📝',
      description: 'Distribution by task categories'
    },
    {
      id: 'monthly',
      label: 'Monthly View',
      icon: '📅',
      description: 'Tasks across months'
    },
    {
      id: 'budget',
      label: 'Budget Analysis',
      icon: '💰',
      description: 'Budget distribution overview'
    }
  ];

  const chartColors = {
    completion: ['#10b981', '#f59e0b'],
    taskTypes: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
    monthly: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
    budget: ['#8b5cf6', '#6b7280']
  };

  const getChartData = (chartId) => {
    switch(chartId) {
      case 'completion':
        return detailedStats.taskCompletionData;
      case 'taskTypes':
        return detailedStats.taskTypeData;
      case 'monthly':
        return detailedStats.monthlyData;
      case 'budget':
        return detailedStats.budgetTasksData;
      default:
        return {};
    }
  };
  
  const getAdditionalInfo = (chartId) => {

    switch(chartId) {
      case 'completion':
        const completionRate = statsData.totalTasks > 0 
          ? ((statsData.completedTasks / statsData.totalTasks) * 100).toFixed(1)
          : 0;
        return (
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '16px'
            }}>Completion Insights</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Completion Rate:</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#FF2D95' }}>{completionRate}%</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Completed Tasks:</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#FF2D95' }}>{statsData.completedTasks}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Pending Tasks:</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#FF2D95' }}>{statsData.totalTasks - statsData.completedTasks}</span>
              </div>
            </div>
          </div>
        );
      
      case 'taskTypes':
        const topType = Object.entries(detailedStats.taskTypeData)
          .sort(([,a], [,b]) => b - a)[0];
        return (
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '16px'
            }}>Task Type Insights</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Most Common Type:</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#FF2D95' }}>{topType ? topType[0] : 'N/A'}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Categories:</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#FF2D95' }}>{Object.keys(detailedStats.taskTypeData).length}</span>
              </div>
            </div>
          </div>
        );
      
      case 'monthly':
        const monthCount = Object.keys(detailedStats.monthlyData).length;
        return (
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '16px'
            }}>Monthly Insights</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Active Months:</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#FF2D95' }}>{monthCount}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Avg Tasks/Month:</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#FF2D95' }}>
                  {monthCount > 0 ? Math.round(statsData.totalTasks / monthCount) : 0}
                </span>
              </div>
            </div>
          </div>
        );
      
      case 'budget':
        return (
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '16px'
            }}>Budget Insights</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Budget:</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#FF2D95' }}>${statsData.totalBudget}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Avg Budget/Task:</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#FF2D95' }}>
                  ${statsData.tasksWithBudget > 0 ? Math.round(statsData.totalBudget / statsData.tasksWithBudget) : 0}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 0'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Budget Tasks %:</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#FF2D95' }}>
                  {statsData.totalTasks > 0 ? Math.round((statsData.tasksWithBudget / statsData.totalTasks) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      {/* Tab Navigation */}
      <div style={{
  display: 'grid',
  gridTemplateColumns:'repeat(2, 1fr)',
  gap: '12px',
  marginBottom: '30px'
}}>
        {chartOptions.map((option) => (
          <motion.button
            key={option.id}
            style={{
              background: selectedChart === option.id 
                ? 'linear-gradient(135deg, rgba(255, 45, 149, 0.2), rgba(255, 45, 149, 0.1))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              border: selectedChart === option.id 
                ? '2px solid #FF2D95'
                : '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: selectedChart === option.id 
                ? '0 4px 20px rgba(255, 45, 149, 0.3)'
                : 'none'
            }}
            onClick={() => setSelectedChart(option.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span style={{ fontSize: '28px', flexShrink: 0 }}>{option.icon}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>
                {option.label}
              </span>
              <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                {option.description}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Chart Display Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedChart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
            borderRadius: '16px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
                      <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '40px',
              alignItems: 'center'
            }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <PieChart
                data={getChartData(selectedChart)}
                colors={chartColors[selectedChart]}
               size={isMobile ? 200 : 280}
                showPercentage={true}
                showValues={true}
                innerRadius={0.35}
              />
            </div>
            <div>
              {getAdditionalInfo(selectedChart)}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Task Card Component
const TaskCard = ({ 
  task, 
  editingTask, 
  setEditingTask, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onToggleReminder 
}) => {
  const calculateTaskProgress = (task) => {
    if (task.completed) return 100;

    const now = new Date();
    const today = new Date().toISOString().split("T")[0];

    if (task.dueDate !== today) return 0;

    const taskStart = new Date(`${task.dueDate}T${task.startTime}`);
    const taskEnd = new Date(`${task.dueDate}T${task.endTime}`);

    if (now < taskStart) return 0;
    if (now > taskEnd) return 100;

    const totalDuration = taskEnd - taskStart;
    const elapsed = now - taskStart;
    return Math.min((elapsed / totalDuration) * 100, 100);
  };

  const calculateTotalBudget = (budgetItems) => {
    return budgetItems.reduce((total, item) => total + parseInt(item.price || 0), 0);
  };

  const taskProgress = calculateTaskProgress(task);
  const isToday = task.dueDate === new Date().toISOString().split("T")[0];

  return (
    <motion.div
      className={`task-card ${task.completed ? "completed" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      layout
    >
      {task.completed && <div className="completion-line"></div>}

      {isToday && !task.completed && (
        <div className="task-progress-bar">
          <div className="progress-bar">
            <motion.div 
              className="progress-fill" 
              initial={{ width: 0 }}
              animate={{ width: `${taskProgress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            ></motion.div>
          </div>
          <div className="progress-time">
            {taskProgress === 100 ? 'Time elapsed' : `${Math.round(taskProgress)}% through task time`}
          </div>
        </div>
      )}

      <div className="task-time">
        {task.startTime} - {task.endTime}
      </div>
      
      <div className="task-content">
        {editingTask && editingTask.id === task.id ? (
          <TaskEditForm
            task={editingTask}
            setTask={setEditingTask}
            onSave={onEditTask}
            onCancel={() => setEditingTask(null)}
            onToggleReminder={onToggleReminder}
          />
        ) : (
          <>
            <div className="task-header">
              <h3 className="task-name">{task.taskName}</h3>
              <div className="task-actions">
                {task.needsBudget && (
                  <motion.span className="budget-badge" whileHover={{ scale: 1.1 }}>
                    💰 Budget
                  </motion.span>
                )}
                <div className="action-buttons">
                  <div className="tooltip-container">
                    <motion.button 
                      onClick={() => onToggleComplete(task.id)}
                      className={`complete-btn ${task.completed ? 'completed' : ''}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {task.completed ? '✓' : '○'}
                    </motion.button>
                    <span className="tooltip-text">
                      {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </span>
                  </div>
                  
                  <div className="tooltip-container">
                    <motion.button 
                      onClick={() => setEditingTask(task)}
                      className="edit-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✏️
                    </motion.button>
                    <span className="tooltip-text">Edit Task</span>
                  </div>
                  
                  <div className="tooltip-container">
                    <motion.button 
                      onClick={() => onDeleteTask(task.id)}
                      className="delete-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      🗑️
                    </motion.button>
                    <span className="tooltip-text">Delete Task</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="task-description">{task.description}</p>
            
            {task.needsBudget && task.budgetItems && task.budgetItems.length > 0 && (
              <motion.div 
                className="budget-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.2 }}
              >
                <h4>Budget Items:</h4>
                <div className="budget-items">
                  {task.budgetItems.map((item, itemIndex) => (
                    <motion.div 
                      key={itemIndex} 
                      className="budget-item"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">${item.price}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="budget-total">
                  Total: ${calculateTotalBudget(task.budgetItems)}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

// Task Edit Form Component
const TaskEditForm = ({ task, setTask, onSave, onCancel, onToggleReminder }) => {
  const updateField = (field, value) => {
    setTask(prev => ({ ...prev, [field]: value }));
  };

  const updateBudgetItem = (index, field, value) => {
    setTask(prev => ({
      ...prev,
      budgetItems: prev.budgetItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addBudgetItem = () => {
    setTask(prev => ({
      ...prev,
      budgetItems: [...prev.budgetItems, { name: "", price: "" }],
    }));
  };

  const removeBudgetItem = (index) => {
    setTask(prev => ({
      ...prev,
      budgetItems: prev.budgetItems.filter((_, i) => i !== index),
    }));
  };

  return (
    <motion.div 
      className="edit-form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        value={task.taskName}
        onChange={(e) => updateField('taskName', e.target.value)}
        className="edit-input"
        placeholder="Task Name"
      />
      <textarea
        value={task.description}
        onChange={(e) => updateField('description', e.target.value)}
        className="edit-textarea"
        placeholder="Description"
      />
      <div className="time-fields">
        <input
          type="time"
          value={task.startTime}
          onChange={(e) => updateField('startTime', e.target.value)}
          className="edit-input"
        />
        <input
        type="time"
        value={task.endTime}
        onChange={(e) => updateField('endTime', e.target.value)}
        className="edit-input"
      />
    </div>
    <label className="checkbox-label">
      <input
        type="checkbox"
        checked={task.needsBudget}
        onChange={(e) => updateField('needsBudget', e.target.checked)}
      />
      Needs Budget
    </label>
    
    <label className="checkbox-label">
      <input
        type="checkbox"
        checked={task.needsReminder}
        onChange={(e) => updateField('needsReminder', e.target.checked)}
      />
      Set Reminder (day before due date)
    </label>
    
    {task.needsBudget && (
      <div className="budget-edit-section">
        <h4>Budget Items:</h4>
        {task.budgetItems.map((item, itemIndex) => (
          <motion.div 
            key={itemIndex} 
            className="budget-item-edit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: itemIndex * 0.1 }}
          >
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateBudgetItem(itemIndex, 'name', e.target.value)}
              placeholder="Item name"
              className="budget-input"
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => updateBudgetItem(itemIndex, 'price', e.target.value)}
              placeholder="Price"
              className="budget-input"
            />
            <motion.button 
              type="button"
              onClick={() => removeBudgetItem(itemIndex)}
              className="remove-budget-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </motion.div>
        ))}
        <motion.button 
          type="button"
          onClick={addBudgetItem}
          className="add-budget-item-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          + Add Item
        </motion.button>
      </div>
    )}
    
    <div className="edit-actions">
      <motion.button 
        onClick={() => onSave(task)} 
        className="save-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Save
      </motion.button>
      <motion.button 
        onClick={onCancel} 
        className="cancel-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Cancel
      </motion.button>
    </div>
  </motion.div>
);
};

// Task Accordion Component
const TaskAccordion = ({ monthData, activeDate, setActiveDate, editingTask, setEditingTask, onToggleComplete, onEditTask, onDeleteTask, onToggleReminder }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getTaskCounts = (tasks) => {
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    return { completed, total };
  };

  const calculateTotalBudgetForMonth = () => {
    let totalBudget = 0;
    Object.values(monthData.dates).forEach(dateTasks => {
      dateTasks.forEach(task => {
        if (task.needsBudget && task.budgetItems) {
          totalBudget += task.budgetItems.reduce((sum, item) => sum + parseInt(item.price || 0), 0);
        }
      });
    });
    return totalBudget;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    };
  };

  const monthCounts = useMemo(() => {
    let totalTasks = 0;
    let completedTasks = 0;
    
    Object.values(monthData.dates).forEach(dateTasks => {
      totalTasks += dateTasks.length;
      completedTasks += dateTasks.filter(task => task.completed).length;
    });
    
    return { total: totalTasks, completed: completedTasks };
  }, [monthData]);

  const totalMonthBudget = calculateTotalBudgetForMonth();
  const dates = Object.keys(monthData.dates).sort();

  const handleDateAccordionClick = (date, event) => {
    if (activeDate === date) {
      setActiveDate(null);
    } else {
      setActiveDate(date);
    }
  };

  return (
    <div className="month-accordion">
      <motion.div 
        className="month-accordion-header"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="month-title">
          <h4>{monthData.display}</h4>
          <div className="month-progress">
            <CircularProgressBar
              completed={monthCounts.completed}
              total={monthCounts.total}
              size={40}
              strokeWidth={4}
            />
            <div className="month-stats-info">
              <span className="month-total">{monthCounts.total} tasks</span>
              <span className="month-completed">{monthCounts.completed} completed</span>
              {totalMonthBudget > 0 && (
                <span className="month-budget">${totalMonthBudget} budget</span>
              )}
            </div>
          </div>
        </div>
        <div className="accordion-indicator">
          {isExpanded ? "▼" : "▶"}
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="month-dates"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {dates.map((date) => {
              const formatted = formatDate(date);
              const isActive = activeDate === date;
              const { completed, total } = getTaskCounts(monthData.dates[date]);

              return (
                <motion.div
                  key={date}
                  className={`date-accordion ${isActive ? "active" : ""}`}
                  layout
                >
                  <motion.div
                    className="accordion-header"
                    onClick={(e) => handleDateAccordionClick(date, e)}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    <div className="date-display">
                      <div className="date-combined">
                        <span className="date-weekday">{formatted.weekday}</span>
                        <span className="date-day">{formatted.day}</span>
                        <span className="date-month">{formatted.month}</span>
                      </div>
                    </div>
                    <div className="date-task-info">
                      <div className="task-stats">
                        <span className="task-count">{total} tasks</span>
                        <span className="progress-percent">
                          {completed}/{total} completed
                        </span>
                      </div>
                    </div>
                    <div className="accordion-indicator">
                      {isActive ? "▼" : "▶"}
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="accordion-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AnimatePresence>
                          {monthData.dates[date].map((task, index) => (
                            <TaskCard
                              key={task.id}
                              task={task}
                              editingTask={editingTask}
                              setEditingTask={setEditingTask}
                              onToggleComplete={onToggleComplete}
                              onEditTask={onEditTask}
                              onDeleteTask={onDeleteTask}
                              onToggleReminder={onToggleReminder}
                            />
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Filter Component
const TaskFilter = ({ showFilter, setShowFilter, filters, setFilters, totalTasks, filteredTasksCount }) => {
  const yearOptions = ['2026', '2025', '2024', '2023'];
  const monthOptions = [
    { value: "0", label: "January" },
    { value: "1", label: "February" },
    { value: "2", label: "March" },
    { value: "3", label: "April" },
    { value: "4", label: "May" },
    { value: "5", label: "June" },
    { value: "6", label: "July" },
    { value: "7", label: "August" },
    { value: "8", label: "September" },
    { value: "9", label: "October" },
    { value: "10", label: "November" },
    { value: "11", label: "December" }
  ];

  const hasActiveFilters = () => {
    return filters.year || filters.month || filters.dateRange.start || filters.dateRange.end;
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleDateRangeChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, [field]: value }
    }));
  };

  const clearDateRange = () => {
    setFilters(prev => ({
      ...prev,
      dateRange: { start: "", end: "" }
    }));
  };

  const clearFilters = () => {
    setFilters({
      year: "",
      month: "",
      dateRange: { start: "", end: "" }
    });
  };

  return (
    <div className="filter-section">
      <motion.button
        className={`filter-btn ${hasActiveFilters() ? 'active' : ''}`}
        onClick={() => setShowFilter(!showFilter)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="filter-icon">🔍</span>
        Filter
        {hasActiveFilters() && <div className="filter-dot"></div>}
      </motion.button>

      <AnimatePresence>
        {showFilter && (
          <motion.div
            className="filter-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="filter-header">
              <h4>Filter Tasks</h4>
              {hasActiveFilters() && (
                <motion.button
                  className="clear-filters-btn"
                  onClick={clearFilters}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All
                </motion.button>
              )}
            </div>
            
            <div className="filter-fields">
              <div className="filter-field">
                <label>Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                >
                  <option value="">All Years</option>
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-field">
                <label>Month</label>
                <select
                  value={filters.month}
                  onChange={(e) => handleFilterChange('month', e.target.value)}
                >
                  <option value="">All Months</option>
                  {monthOptions.map(month => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="filter-field">
                <label>Date Range</label>
                <div className="date-range-fields">
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleDateRangeChange('start', e.target.value)}
                    placeholder="Start date"
                    className="date-input"
                  />
                  <span className="date-range-separator">to</span>
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleDateRangeChange('end', e.target.value)}
                    placeholder="End date"
                    className="date-input"
                  />
                </div>
                {(filters.dateRange.start || filters.dateRange.end) && (
                  <button 
                    className="clear-date-range-btn"
                    onClick={clearDateRange}
                    type="button"
                  >
                    Clear range
                  </button>
                )}
              </div>
            </div>
            
            <div className="filter-stats">
              <span>Showing {filteredTasksCount} of {totalTasks} tasks</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Updated DashboardSidebar with Analytics Modal
const DashboardSidebar = ({ 
  tasks, 
  yearMonthData, 
  activeDate, 
  setActiveDate, 
  statsData, 
  onOpenDialog,
  onShowAddTask,
  activeDialog,
  onCloseDialog,
  upcomingReminders,
  onCloseMobile,
  isMobile = false
}) => {
  const [expandedYears, setExpandedYears] = useState(new Set(['2026']));

  // Enhanced stats calculation for detailed views
  const detailedStats = useMemo(() => {
    const taskCompletionData = {
      'Completed': statsData.completedTasks,
      'Pending': statsData.totalTasks - statsData.completedTasks
    };

    const budgetTasksData = {
      'With Budget': statsData.tasksWithBudget,
      'Without Budget': statsData.totalTasks - statsData.tasksWithBudget
    };

    // Task type distribution
    const taskTypeData = tasks.reduce((acc, task) => {
      const type = task.taskType || 'Other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Monthly distribution
    const monthlyData = tasks.reduce((acc, task) => {
      if (!task.dueDate) return acc;
      const month = new Date(task.dueDate).toLocaleDateString('en-US', { month: 'long' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    // Budget by task type
    const budgetByType = tasks.reduce((acc, task) => {
      if (task.needsBudget && task.budgetItems) {
        const type = task.taskType || 'Other';
        const budget = task.budgetItems.reduce((sum, item) => sum + parseInt(item.price || 0), 0);
        acc[type] = (acc[type] || 0) + budget;
      }
      return acc;
    }, {});

    return {
      taskCompletionData,
      budgetTasksData,
      taskTypeData,
      monthlyData,
      budgetByType
    };
  }, [tasks, statsData]);

  const handleStatClick = (modalType) => {
    if (onOpenDialog) {
      onOpenDialog(modalType);
    }
  };

  const closeModal = () => {
    if (onCloseDialog) {
      onCloseDialog();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    };
  };

  const getTaskCounts = (tasks) => {
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    return { completed, total };
  };

  const getMonthTaskCounts = (monthData) => {
    let totalTasks = 0;
    let completedTasks = 0;
    
    Object.values(monthData.dates).forEach(dateTasks => {
      totalTasks += dateTasks.length;
      completedTasks += dateTasks.filter(task => task.completed).length;
    });
    
    return { total: totalTasks, completed: completedTasks };
  };

  const getYearTaskCounts = (yearData) => {
    let totalTasks = 0;
    let completedTasks = 0;
    
    Object.values(yearData.months).forEach(monthData => {
      Object.values(monthData.dates).forEach(dateTasks => {
        totalTasks += dateTasks.length;
        completedTasks += dateTasks.filter(task => task.completed).length;
      });
    });
    
    return { total: totalTasks, completed: completedTasks };
  };

  const toggleYear = (year) => {
    setExpandedYears(prev => {
      const newSet = new Set(prev);
      if (newSet.has(year)) {
        newSet.delete(year);
      } else {
        newSet.add(year);
      }
      return newSet;
    });
  };

  const yearKeys = Object.keys(yearMonthData).sort((a, b) => b - a);

  return (
    <>
      <motion.div
        className="dashboard-sidebar"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Mobile Close Button - Only show on mobile */}
        {isMobile && (
          <div className="mobile-sidebar-header pt-[100px]">
            <h2>Task Dashboard</h2>
            <motion.button 
              className="mobile-close-btn mt-60"
              onClick={onCloseMobile}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </div>
        )}

        <div className="dashboard-header ">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Task Management
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Organize tasks and track expenses efficiently
          </motion.p>
        </div>

        {/* ... rest of the DashboardSidebar content remains the same ... */}
        <motion.div
          className="stats-container"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          <motion.div 
            className="stat-card" 
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
            onClick={() => handleStatClick('analytics')}
            whileHover={{ scale: 1.05, cursor: "pointer" }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <h3>{statsData.totalTasks}</h3>
              <p>Total Tasks</p>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card" 
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
            onClick={() => handleStatClick('analytics')}
            whileHover={{ scale: 1.05, cursor: "pointer" }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{statsData.completedTasks}</h3>
              <p>Completed</p>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card" 
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
            onClick={() => handleStatClick('analytics')}
            whileHover={{ scale: 1.05, cursor: "pointer" }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>{statsData.tasksWithBudget}</h3>
              <p>With Budget</p>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card" 
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
            onClick={() => handleStatClick('analytics')}
            whileHover={{ scale: 1.05, cursor: "pointer" }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="stat-icon">💵</div>
            <div className="stat-info">
              <h3>${statsData.totalBudget}</h3>
              <p>Total Budget</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Info Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: 'rgba(255, 45, 149, 0.1)',
            border: '1px solid rgba(255, 45, 149, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            marginTop: '20px'
          }}
        >
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'white',
            margin: '0 0 8px 0'
          }}>
            📊 Click any stat card to view Task Analytics
          </h3>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 0,
            lineHeight: '1.6'
          }}>
            View detailed insights about your tasks with interactive pie charts and comprehensive statistics. 
            Switch between different analytics views using the tab navigation.
          </p>
        </motion.div>

        <motion.div
          className="add-task-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="add-task-btn-primary"
            onClick={onShowAddTask}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="add-icon">+</span>
            Add New Task
          </motion.button>
        </motion.div>

       <div className="upcoming-dates">
  <h3>Upcoming Dates</h3>
  <motion.div 
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
      }
    }}
  >
    {yearKeys
      .filter(year => {
        const currentYear = new Date().getFullYear();
        return parseInt(year) >= currentYear;
      })
      .map((year) => {
        const yearData = yearMonthData[year];
        const yearCounts = getYearTaskCounts(yearData);
        const isYearExpanded = expandedYears.has(year);
        
        // Filter months to only show current and future months
        const monthKeys = Object.keys(yearData.months)
          .filter(monthKey => {
            const [yearNum, monthNum] = monthKey.split('-').map(Number);
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            
            // Show if year is in future, or same year but month is current or future
            return yearNum > currentYear || 
                   (yearNum === currentYear && monthNum >= currentMonth);
          })
          .sort((a, b) => {
            const [yearA, monthA] = a.split('-').map(Number);
            const [yearB, monthB] = b.split('-').map(Number);
            if (yearA !== yearB) return yearA - yearB; // Ascending years
            return monthA - monthB; // Ascending months
          });

        // Don't show year if it has no relevant months
        if (monthKeys.length === 0) return null;

        return (
          <div key={year} className="year-section">
            <motion.div 
              className="year-header"
              onClick={() => toggleYear(year)}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div className="year-title">
                <h4>{year}</h4>
                <div className="year-stats">
                  <span className="year-task-count">{yearCounts.total} tasks</span>
                  <div className="year-indicator">
                    {isYearExpanded ? '▼' : '▶'}
                  </div>
                </div>
              </div>
            </motion.div>

           <AnimatePresence>
  {isYearExpanded && (
    <motion.div
      className="year-content"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.30 }} 
    >
      {monthKeys.map((monthKey) => {
        const monthData = yearData.months[monthKey];
        const monthCounts = getMonthTaskCounts(monthData);
        
        // Filter dates to only show current and future dates
        const dates = Object.keys(monthData.dates)
          .filter(date => {
            const taskDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return taskDate >= today;
          })
          .sort();

        if (dates.length === 0) return null;
        
        return (
          <div key={monthKey} className="month-section">
            <div className="month-header">
              <h5>{monthData.display}</h5>
              <div className="month-stats">
                <span className="month-task-count">{monthCounts.total} tasks</span>
              </div>
            </div>
            
            
            <motion.div
              className="dates-container"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.8
                  }
                }
              }}
            >
              {dates.map((date) => {
                const formatted = formatDate(date);
                const { completed, total } = getTaskCounts(monthData.dates[date]);

                return (
                  <motion.div
                    key={date}
                    className={`date-preview ${activeDate === date ? "active" : ""}`}
                    onClick={() => {
                      setActiveDate(date);
                      if (isMobile && onCloseMobile) {
                        onCloseMobile();
                      }
                    }}
                    variants={{
                      hidden: { 
                        opacity: 0, 
                        y: 8, 
                        scale: 0.95 
                      },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          type: "tween", 
                          duration: 0.70, 
                          ease: "easeOut"
                        }
                      }
                    }}
                    whileHover={{ 
                      scale: 1.06,
                      transition: { duration: 1 } 
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      transition: { duration: 1 } 
                    }}
                  >
                    <div className="date-preview-main">
                      <div className="date-preview-day">{formatted.day}</div>
                      <div className="date-preview-info">
                        <div className="date-preview-weekday">
                          {formatted.weekday}
                        </div>
                        <div className="date-preview-month">
                          {formatted.month}
                        </div>
                      </div>
                    </div>
                    <div className="date-progress-circular">
                      <CircularProgressBar
                        completed={completed}
                        total={total}
                        size={40}
                        strokeWidth={4}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  )}
</AnimatePresence>
          </div>
        );
      })}
  </motion.div>
</div>
      </motion.div>

      {/* Analytics Modal */}
      <AnimatePresence>
        {activeDialog === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                borderRadius: '24px',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '85vh',
                overflow: 'auto',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Modal Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 30px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'white',
                  margin: 0
                }}>
                  Task Analytics Dashboard
                </h2>
                <button
                  onClick={closeModal}
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
                </button>
              </div>

              {/* Analytics Content */}
              <TaskAnalyticsContent 
                tasks={tasks} 
                statsData={statsData}
                detailedStats={detailedStats}
              />

              {/* Modal Footer */}
              <div style={{
                padding: '20px 30px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <motion.button
                  onClick={closeModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'linear-gradient(135deg, #FF2D95, #FF6B9D)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 32px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #FF6B9D, #FF2D95)';
                    e.target.style.boxShadow = '0 4px 20px rgba(255, 45, 149, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #FF2D95, #FF6B9D)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ... (rest of the components remain the same until the main TaskListingPage)

// Updated TaskListSide with mobile menu button
const TaskListSide = ({
  tasks,
  yearMonthData,
  activeDate,
  setActiveDate,
  editingTask,
  setEditingTask,
  showFilter,
  setShowFilter,
  filters,
  setFilters,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onToggleReminder,
  onOpenMobileSidebar,
  isMobile = false
}) => {
  const [expandedYears, setExpandedYears] = useState(new Set(['2026']));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  const toggleYear = (year) => {
    setExpandedYears(prev => {
      const newSet = new Set(prev);
      if (newSet.has(year)) {
        newSet.delete(year);
      } else {
        newSet.add(year);
      }
      return newSet;
    });
  };

  const yearKeys = Object.keys(yearMonthData).sort((a, b) => b - a);

  return (
   <motion.div
  className="task-list-side w-full sm:h-screen sm:pb-[100px] md:mt-[80px] sm:mt-[0px]"
  // style={{
  //   height:"auto",
  //   padding: "20px",
  //   borderRadius: "8px"
  // }}
  initial={{ x: 50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
      <div className="task-list-header">
        <div className="header-main">
          {/* Mobile Menu Button - Only show on mobile */}
          {isMobile && (
            <div className="mobile-header">
              <motion.button 
                className="mobile-menu-btn" 
                onClick={onOpenMobileSidebar}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ☰
              </motion.button>
              <h2>My Tasks & Expenses</h2>
            </div>
          )}
          {!isMobile && (
            <>
              <h2>My Tasks & Expenses</h2>
              <div className="current-date">{formatDate(activeDate).full}</div>
            </>
          )}
        </div>
        
        <TaskFilter
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          filters={filters}
          setFilters={setFilters}
          totalTasks={tasks.length}
          filteredTasksCount={tasks.length}
        />
      </div>

      {isMobile && (
        <div className="current-date-mobile">
          {formatDate(activeDate).full}
        </div>
      )}

      <div className="year-accordions">
        <AnimatePresence mode="popLayout">
          {yearKeys.length > 0 ? (
            yearKeys.map((year) => {
              const yearData = yearMonthData[year];
              const isYearExpanded = expandedYears.has(year);
              const monthKeys = Object.keys(yearData.months).sort((a, b) => {
                const [yearA, monthA] = a.split('-').map(Number);
                const [yearB, monthB] = b.split('-').map(Number);
                if (yearA !== yearB) return yearA - yearB; // Ascending years
                return monthA - monthB; // Ascending months
              });

              return (
                <motion.div
                  key={year}
                  className="year-accordion"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="year-accordion-header"
                    onClick={() => toggleYear(year)}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    <div className="year-title-main">
                      <h3>{year}</h3>
                      <div className="year-indicator-main">
                        {isYearExpanded ? '▼' : '▶'}
                      </div>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {isYearExpanded && (
                      <motion.div
                        className="year-content-main"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {monthKeys.map((monthKey) => {
                          const monthData = yearData.months[monthKey];
                          
                          return (
                            <TaskAccordion
                              key={monthKey}
                              monthData={monthData}
                              activeDate={activeDate}
                              setActiveDate={setActiveDate}
                              editingTask={editingTask}
                              setEditingTask={setEditingTask}
                              onToggleComplete={onToggleComplete}
                              onEditTask={onEditTask}
                              onDeleteTask={onDeleteTask}
                              onToggleReminder={onToggleReminder}
                            />
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              className="no-tasks-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="no-tasks-icon">📝</div>
              <h3>No tasks found</h3>
              <p>Try adjusting your filters or add new tasks</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Task Form Modal Component (Replaces AddTaskModal)
const TaskFormModal = ({ isOpen, onClose, onAddTask }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 25 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  const handleTaskSubmit = (taskData) => {
    onAddTask(taskData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            marginTop:'20px'
          }}
        >
          <motion.div 
            // className="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              width:'600px',
              maxHeight: '85vh',
              overflow: 'auto',
               marginTop:'100px',
               padding:'0',
               margin:'0'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 30px',
              margin:'0px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
             
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'white',
                margin: 0,
                background: 'linear-gradient(135deg, #FF2D95, #7877FF)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Create New Task
              </h2>
              <button
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
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <TaskForm onClose={onClose} onSubmit={handleTaskSubmit} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Updated Main TaskListingPage Component
const TaskListingPage = ({ 
  onBackToLanding, 
  tasks: initialTasks = [], 
  setTasks,
  onTasksUpdate 
}) => {
  const [tasks, setLocalTasks] = useState(initialTasks.length > 0 ? initialTasks : SAMPLE_TASKS);
  const [activeDate, setActiveDate] = useState("2026-01-07");
  const [editingTask, setEditingTask] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    year: "",
    month: "",
    dateRange: { start: "", end: "" }
  });
  const [activeDialog, setActiveDialog] = useState(null);
  const [showReminders, setShowReminders] = useState(false);
  const [currentReminders, setCurrentReminders] = useState([]);
  const [snoozedTasks, setSnoozedTasks] = useState(new Set());
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // On mobile, start with sidebar closed
      if (mobile) {
        setShowMobileSidebar(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Update tasks when initialTasks changes
  React.useEffect(() => {
    if (initialTasks.length > 0) {
      setLocalTasks(initialTasks);
    }
  }, [initialTasks]);

  // Filter tasks based on selected filters
  const filteredTasks = useMemo(() => {
    if (!filters.year && !filters.month && !filters.dateRange.start && !filters.dateRange.end) {
      return tasks;
    }

    return tasks.filter(task => {
      if (!task.dueDate) return false;
      
      const taskDate = new Date(task.dueDate);
      const taskYear = taskDate.getFullYear().toString();
      const taskMonth = taskDate.getMonth().toString();
      
      let matches = true;
      
      if (filters.year && taskYear !== filters.year) {
        matches = false;
      }
      
      if (filters.month && taskMonth !== filters.month) {
        matches = false;
      }
      
      if (filters.dateRange.start && new Date(task.dueDate) < new Date(filters.dateRange.start)) {
        matches = false;
      }
      
      if (filters.dateRange.end && new Date(task.dueDate) > new Date(filters.dateRange.end)) {
        matches = false;
      }
      
      return matches;
    });
  }, [tasks, filters]);

  // Group tasks by year and month
  const yearMonthData = useMemo(() => {
    const grouped = {};
    
    filteredTasks.forEach(task => {
      const date = new Date(task.dueDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthYearKey = `${year}-${month}`;
      const monthDisplay = date.toLocaleDateString('en-US', { 
        month: 'long',
        year: 'numeric'
      });
      
      if (!grouped[year]) {
        grouped[year] = {
          months: {}
        };
      }
      
      if (!grouped[year].months[monthYearKey]) {
        grouped[year].months[monthYearKey] = {
          display: monthDisplay,
          year: year,
          month: month,
          dates: {}
        };
      }
      
      if (!grouped[year].months[monthYearKey].dates[task.dueDate]) {
        grouped[year].months[monthYearKey].dates[task.dueDate] = [];
      }
      grouped[year].months[monthYearKey].dates[task.dueDate].push(task);
    });
    
    return grouped;
  }, [filteredTasks]);

  // Stats data
  const statsData = useMemo(() => {
    const totalTasks = filteredTasks.length;
    const completedTasks = filteredTasks.filter(task => task.completed).length;
    const tasksWithBudget = filteredTasks.filter(task => task.needsBudget).length;
    const totalBudget = filteredTasks.reduce((total, task) => {
      if (task.needsBudget && task.budgetItems) {
        return total + task.budgetItems.reduce((sum, item) => sum + parseInt(item.price || 0), 0);
      }
      return total;
    }, 0);

    return {
      totalTasks,
      completedTasks,
      tasksWithBudget,
      totalBudget
    };
  }, [filteredTasks]);

  // Enhanced stats calculation for detailed views
  const detailedStats = useMemo(() => {
    const taskCompletionData = {
      'Completed': statsData.completedTasks,
      'Pending': statsData.totalTasks - statsData.completedTasks
    };

    const budgetTasksData = {
      'With Budget': statsData.tasksWithBudget,
      'Without Budget': statsData.totalTasks - statsData.tasksWithBudget
    };

    // Task type distribution
    const taskTypeData = tasks.reduce((acc, task) => {
      const type = task.taskType || 'Other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Monthly distribution
    const monthlyData = tasks.reduce((acc, task) => {
      if (!task.dueDate) return acc;
      const month = new Date(task.dueDate).toLocaleDateString('en-US', { month: 'long' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    return {
      taskCompletionData,
      budgetTasksData,
      taskTypeData,
      monthlyData
    };
  }, [tasks, statsData]);

  // Calculate upcoming reminders
  const upcomingReminders = useMemo(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    return tasks
      .filter(task => 
        task.needsReminder && 
        !task.completed &&
        !snoozedTasks.has(task.id) &&
        task.dueDate === tomorrowStr
      )
      .map(task => ({
        task,
        formattedDueDate: new Date(task.dueDate).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      }))
      .sort((a, b) => a.task.startTime.localeCompare(b.task.startTime));
  }, [tasks, snoozedTasks]);

  // Check for reminders periodically
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const shouldShowReminders = upcomingReminders.length > 0 && 
                                now.getHours() >= 9; // Show reminders after 9 AM

      if (shouldShowReminders && !showReminders) {
        setCurrentReminders(upcomingReminders);
        setShowReminders(true);
      }
    };

    // Check every minute
    const interval = setInterval(checkReminders, 60000);
    
    // Initial check
    checkReminders();

    return () => clearInterval(interval);
  }, [upcomingReminders, showReminders]);

  // Task actions
  const updateTasks = (updatedTasks) => {
    setLocalTasks(updatedTasks);
    if (setTasks) {
      setTasks(updatedTasks);
    }
    if (onTasksUpdate) {
      onTasksUpdate(updatedTasks);
    }
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    const updatedTasks = tasks.map(t => 
      t.id === task.id ? task : t
    );
    updateTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      updateTasks(updatedTasks);
    }
  };

  const handleToggleReminder = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, needsReminder: !task.needsReminder } : task
    );
    updateTasks(updatedTasks);
  };

  const handleAddTask = (newTaskData) => {
    const taskToAdd = {
      ...newTaskData,
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
      completed: false,
      budgetItems: newTaskData.needsBudget ? newTaskData.budgetItems : []
    };

    const updatedTasks = [...tasks, taskToAdd];
    updateTasks(updatedTasks);
    setShowAddTask(false);
  };

  // Handle reminder actions
  const handleDismissReminder = (taskId) => {
    if (taskId === 'all') {
      setShowReminders(false);
      // Add all current reminder task IDs to snoozed to prevent immediate reappearance
      const newSnoozed = new Set(snoozedTasks);
      currentReminders.forEach(reminder => newSnoozed.add(reminder.task.id));
      setSnoozedTasks(newSnoozed);
    } else {
      setCurrentReminders(prev => prev.filter(reminder => reminder.task.id !== taskId));
      if (currentReminders.length === 1) {
        setShowReminders(false);
      }
      // Add to snoozed to prevent immediate reappearance
      setSnoozedTasks(prev => new Set(prev).add(taskId));
    }
  };

  const handleSnoozeReminder = (taskId) => {
    // Remove from current reminders
    setCurrentReminders(prev => prev.filter(reminder => reminder.task.id !== taskId));
    
    // Add to snoozed set (will be automatically removed after 1 hour)
    setSnoozedTasks(prev => new Set(prev).add(taskId));
    
    // Remove from snoozed after 1 hour
    setTimeout(() => {
      setSnoozedTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }, 60 * 60 * 1000); // 1 hour

    if (currentReminders.length === 1) {
      setShowReminders(false);
    }
  };

  // Dialog handlers
  const handleOpenDialog = (dialogType) => {
    setActiveDialog(dialogType);
  };

  const handleCloseDialog = () => {
    setActiveDialog(null);
  };

  // Mobile sidebar handlers
  const handleOpenMobileSidebar = () => {
    setShowMobileSidebar(true);
  };

  const handleCloseMobileSidebar = () => {
    setShowMobileSidebar(false);
  };

  return (
    <div className="task-listing-container overflow-y-auto  ">
      <div className={`task-layout ${showMobileSidebar && isMobile ? 'mobile-sidebar-open' : ''}`}>
        {/* Left Side - Dashboard */}
        {/* Show sidebar on desktop always, on mobile only when showMobileSidebar is true */}
        {(!isMobile || showMobileSidebar) && (
          <DashboardSidebar
            tasks={filteredTasks}
            yearMonthData={yearMonthData}
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            statsData={statsData}
            onOpenDialog={handleOpenDialog}
            onShowAddTask={() => setShowAddTask(true)}
            activeDialog={activeDialog}
            onCloseDialog={handleCloseDialog}
            upcomingReminders={upcomingReminders}
            onCloseMobile={handleCloseMobileSidebar}
            isMobile={isMobile}
          />
        )}

        {/* Right Side - Task List */}
        {/* Show task list on desktop always, on mobile only when sidebar is closed */}
        {(!isMobile || !showMobileSidebar) && (
          <TaskListSide
            tasks={filteredTasks}
            yearMonthData={yearMonthData}
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            filters={filters}
            setFilters={setFilters}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleReminder={handleToggleReminder}
            onOpenMobileSidebar={handleOpenMobileSidebar}
            isMobile={isMobile}
          />
        )}
      </div>

      {/* Task Form Modal */}
      <TaskFormModal
        isOpen={showAddTask}
        onClose={() => setShowAddTask(false)}
        onAddTask={handleAddTask}
      />
      
      {/* Custom Scrollbar Styles */}
      <style>{`
        .dashboard-sidebar{
          max-height:93vh;
        }
        .task-list-side{
          max-height:93vh;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(220, 28, 124, 0.36) rgba(255, 255, 255, 0.05);
        }

        *::-webkit-scrollbar {
          width: 0.5px;
          height: 0.5px;
        }

        *::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        *::-webkit-scrollbar-thumb {
          background: rgba(255, 45, 149, 0.5);
          border-radius: 4px;
        }

        *::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 45, 149, 0.7);
        }

        @media (max-width: 768px) {
          .analytics-tabs {
            grid-template-columns: 1fr !important;
          }
          
          .chart-content-grid {
            grid-template-columns: 1fr !important;
          }

          /* Mobile responsive styles */
          .task-layout {
            grid-template-columns: 1fr;
          }

          .dashboard-sidebar {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 1000;
            background: rgb(2, 5, 24);
            padding: 20px;
            overflow-y: auto;
          }

          .task-layout.mobile-sidebar-open .dashboard-sidebar {
            display: block;
          }

          .task-layout.mobile-sidebar-open .task-list-side {
            display: none;
          }

          .mobile-sidebar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            margin-top:60px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .mobile-sidebar-header h2 {
            color: white;
            margin: 0;
            font-size: 1.5rem;
            background: linear-gradient(135deg, #FF2D95 0%, #7877FF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .mobile-close-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            font-size: 24px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .mobile-close-btn:hover {
            background: rgba(255, 45, 149, 0.3);
            transform: scale(1.1);
          }

          .mobile-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 10px;
          }

          .mobile-menu-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            font-size: 20px;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .mobile-menu-btn:hover {
            background: rgba(255, 45, 149, 0.3);
            transform: scale(1.1);
          }

          .task-list-header .header-main h2 {
            display: none;
          }

          .mobile-header h2 {
            color: white;
            margin: 0;
            font-size: 1.3rem;
            background: linear-gradient(135deg, #FF2D95 0%, #7877FF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .current-date-mobile {
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
            margin-bottom: 20px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            text-align: center;
          }

          .stats-container {
            flex-direction: column;
          }

          .stat-card {
            flex-direction: row;
            justify-content: flex-start;
          }

          .upcoming-dates {
            max-height: 40vh;
            overflow-y: auto;
          }
        }

        @media (min-width: 769px) {
          .mobile-sidebar-header,
          .mobile-menu-btn,
          .mobile-close-btn,
          .current-date-mobile {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default TaskListingPage;