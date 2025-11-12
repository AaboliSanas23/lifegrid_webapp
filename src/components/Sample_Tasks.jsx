export const SAMPLE_TASKS = [
  // ==================== 2024 TASKS (High Density) ====================
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
    priority: "high"
  },

  // ==================== 2025 TASKS (High Density) ====================
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
    budgetItems: [
      { name: "Docker course", price: "35" }
    ],
    priority: "medium"
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
    completed: false,
    budgetItems: [
      { name: "Container registry", price: "15" },
      { name: "Monitoring tools", price: "20" }
    ],
    priority: "high"
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
    completed: false,
    budgetItems: [
      { name: "Ticket cost", price: "150" }
    ],
    priority: "low"
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
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
    completed: false,
    priority: "medium"
  },

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

  // ==================== 2026 TASKS (January Focus) ====================
  // January 2026
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

export default SAMPLE_TASKS;