// Projects configuration

export interface ProjectTag {
  name: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  github?: string;
  demo?: string;
  image: string;
  difficulty: number; // 1-5
  featured?: boolean;
  year?: number | string;
  achievements?: string[];
}

// Define project tags
export const projectTags: ProjectTag[] = [
  { name: "All", color: "#5D4BE1" }, // Primary purple
  { name: "React", color: "#61DAFB" }, // React blue
  { name: "TypeScript", color: "#3178C6" }, // TypeScript blue
  { name: "Node.js", color: "#68A063" }, // Node green
  { name: "AWS", color: "#FF9900" }, // AWS orange
  { name: "Three.js", color: "#049EF4" }, // Three.js blue
];

// Retro game themed project images (placeholder SVGs)
const projectImages = {
  documentSystem: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='225' viewBox='0 0 288 225'%3E%3Crect fill='%235D4BE1' width='288' height='225'/%3E%3Ctext fill='%23FFFFFF' font-family='monospace' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EDocument System%3C/text%3E%3C/svg%3E",
  dataDashboard: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='225' viewBox='0 0 288 225'%3E%3Crect fill='%234ECDC4' width='288' height='225'/%3E%3Ctext fill='%23000000' font-family='monospace' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EData Dashboard%3C/text%3E%3C/svg%3E",
  featureFlags: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='225' viewBox='0 0 288 225'%3E%3Crect fill='%239B5DE5' width='288' height='225'/%3E%3Ctext fill='%23FFFFFF' font-family='monospace' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EFeature Flags%3C/text%3E%3C/svg%3E",
  portfolio: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='225' viewBox='0 0 288 225'%3E%3Crect fill='%23FFD166' width='288' height='225'/%3E%3Ctext fill='%23000000' font-family='monospace' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3ERetro Portfolio%3C/text%3E%3C/svg%3E",
  cloudStorage: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='225' viewBox='0 0 288 225'%3E%3Crect fill='%23FF6B6B' width='288' height='225'/%3E%3Ctext fill='%23FFFFFF' font-family='monospace' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3ECloud Storage%3C/text%3E%3C/svg%3E",
  classification: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='225' viewBox='0 0 288 225'%3E%3Crect fill='%236A0572' width='288' height='225'/%3E%3Ctext fill='%23FFFFFF' font-family='monospace' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EFile Classification%3C/text%3E%3C/svg%3E",
};

// Project data
export const projects: Project[] = [
  {
    id: "document-mgmt",
    title: "Document Management System",
    description: "A comprehensive document management platform with secure cloud storage, file classification, and version control.",
    longDescription: "Developed a full-featured document management system that allows businesses to securely store, organize, and search through thousands of documents. The system includes role-based access control, document versioning, advanced search capabilities, and integrations with popular productivity tools.",
    tech: ["React", "Node.js", "AWS", "MongoDB"],
    github: "#",
    demo: "#",
    image: projectImages.documentSystem,
    difficulty: 5,
    featured: true,
    year: "2018-2021",
    achievements: [
      "Reduced document retrieval time by 75%",
      "Increased security compliance by implementing role-based access",
      "Streamlined workflows with custom approval processes"
    ]
  },
  {
    id: "data-dashboard",
    title: "Data Visualization Dashboard",
    description: "Interactive analytics dashboard that transforms complex data into insightful visualizations and actionable insights.",
    longDescription: "Created a customizable dashboard platform that helps businesses visualize and analyze their data in real-time. Features include interactive charts, filterable data views, scheduled reports, and integration with multiple data sources.",
    tech: ["React", "TypeScript", "amCharts", "Material UI"],
    github: "#",
    demo: "#",
    image: projectImages.dataDashboard,
    difficulty: 4,
    year: "2022-present",
    achievements: [
      "Improved decision-making speed with real-time data visualizations",
      "Enabled non-technical users to create custom reports",
      "Integrated with multiple data sources using custom connectors"
    ]
  },
  {
    id: "feature-flags",
    title: "Feature Flag Service",
    description: "A microservice for implementing feature flags, allowing controlled feature rollout and A/B testing capabilities.",
    longDescription: "Built a robust feature flag service that enables development teams to deploy code to production while controlling feature visibility. The system supports gradual rollouts, A/B testing, and targeted releases to specific user segments.",
    tech: ["Node.js", "AWS", "GraphQL", "React"],
    github: "#",
    demo: "#",
    image: projectImages.featureFlags,
    difficulty: 3,
    year: "2022",
    achievements: [
      "Reduced deployment risks with controlled feature releases",
      "Enabled data-driven decision making through A/B testing",
      "Simplified feature management across multiple applications"
    ]
  },
  {
    id: "portfolio",
    title: "Retro Gaming Portfolio",
    description: "A personal portfolio website with retro gaming aesthetics, interactive elements, and 3D graphics.",
    longDescription: "Designed and developed a creative portfolio website using React, Three.js, and TypeScript. The site features retro gaming aesthetics, interactive elements, and 3D graphics to showcase projects and skills in an engaging format.",
    tech: ["React", "TypeScript", "Three.js", "Material UI"],
    github: "#",
    demo: "#",
    image: projectImages.portfolio,
    difficulty: 3,
    featured: true,
    year: "2023",
    achievements: [
      "Created a unique and memorable user experience",
      "Implemented interactive 3D elements for engagement",
      "Optimized performance for both desktop and mobile devices"
    ]
  },
  {
    id: "cloud-storage",
    title: "Secure Cloud Storage",
    description: "Enterprise-grade secure cloud storage service with end-to-end encryption and advanced sharing features.",
    longDescription: "Developed a secure cloud storage solution with enterprise-grade security features including end-to-end encryption, secure sharing, access controls, and audit logging. The system prioritizes both security and usability.",
    tech: ["React", "Node.js", "AWS", "TypeScript"],
    github: "#",
    demo: "#",
    image: projectImages.cloudStorage,
    difficulty: 4,
    year: "2019",
    achievements: [
      "Implemented end-to-end encryption for maximum security",
      "Created intuitive sharing features with granular permissions",
      "Achieved compliance with industry security standards"
    ]
  },
  {
    id: "file-classification",
    title: "AI File Classification",
    description: "Intelligent system that automatically classifies and organizes documents using machine learning algorithms.",
    longDescription: "Created an AI-powered system that automatically analyzes, classifies, and organizes documents based on their content. The system uses machine learning to improve classification accuracy over time and adapts to specific organizational needs.",
    tech: ["Python", "TensorFlow", "AWS", "React"],
    github: "#",
    demo: "#",
    image: projectImages.classification,
    difficulty: 5,
    year: "2020",
    achievements: [
      "Reduced manual filing time by 90%",
      "Achieved 95% classification accuracy on standard documents",
      "Implemented continuous learning to improve over time"
    ]
  },
];

// Get difficulty level display (heart icons)
export const getDifficultyDisplay = (level: number): string => {
  const hearts = Array(5).fill('♡').map((heart, index) => index < level ? '♥' : heart).join(' ');
  return hearts;
};

// Get difficulty text based on numeric level
export const getDifficultyText = (level: number): string => {
  switch (level) {
    case 1: return 'Novice';
    case 2: return 'Easy';
    case 3: return 'Medium';
    case 4: return 'Hard';
    case 5: return 'Expert';
    default: return 'Unknown';
  }
}; 