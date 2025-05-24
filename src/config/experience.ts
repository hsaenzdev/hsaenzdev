import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import CloudIcon from "@mui/icons-material/Cloud";

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  icon: React.ElementType; // React component
  color: string;
  type: "work" | "education" | "project";
  rewards?: string[];
  skills?: string[];
  skillsGained?: {
    name: string;
    level: number;
  }[];
  level?: number; // 1-10 for RPG level display
  shortDescription?: string;
}

export interface Timeline {
  year: string;
  events: ExperienceItem[];
}

// Experience data
export const experienceItems: ExperienceItem[] = [
  {
    id: "sonatafy",
    title: "Full Stack Developer",
    company: "Sonatafy Technology",
    period: "Jun 2022 - 2025",
    shortDescription:
      "Developing interactive data visualizations and full-stack features using TypeScript/React, Material UI, and Elixir/Phoenix.",
    description: [
      "Developed interactive data visualization dashboards using amCharts for enterprise clients.",
      "Collaborated on full-stack features using TypeScript/React, Material UI, Elixir/Phoenix, and Java.",
      "Implemented feature flags with Launch Darkly to enable controlled feature rollouts.",
      "Improved platform performance through caching, memoization, and workflow optimizations.",
      "Recommended and implemented key architectural changes for platform V3.",
      "Streamlined development processes by improving CI/CD pipelines.",
      "Participated in QA/UX reviews to ensure high-quality, user-friendly features.",
    ],
    icon: WorkIcon,
    color: "#4ECDC4", // Teal
    type: "work",
    rewards: [
      "Mastery of React/TypeScript",
      "Elixir/Phoenix experience",
      "Performance optimization skills",
    ],
    skills: [
      "React",
      "TypeScript",
      "Material UI",
      "Elixir",
      "Phoenix",
      "Java",
      "LaunchDarkly",
      "amCharts",
    ],
    skillsGained: [
      { name: "Front-End Development", level: 9 },
      { name: "Data Visualization", level: 8 },
      { name: "Feature Flag Management", level: 9 },
      { name: "Performance Optimization", level: 8 },
    ],
    level: 8,
  },
  {
    id: "aws-cert",
    title: "AWS Certification",
    company: "Amazon Web Services",
    period: "2024",
    shortDescription:
      "Earned AWS Certified Cloud Practitioner and Developer Associate certifications.",
    description: [
      "Achieved AWS Certified Cloud Practitioner certification.",
      "Earned AWS Certified Developer - Associate certification.",
      "Gained comprehensive knowledge of AWS services, architecture, and best practices for cloud deployments.",
    ],
    icon: CloudIcon,
    color: "#FF9900", // AWS Orange
    type: "education",
    rewards: [
      "AWS Cloud Practitioner",
      "AWS Developer Associate",
      "Cloud architecture knowledge",
    ],
    skills: ["AWS", "Cloud Computing", "Serverless", "S3", "EC2", "Lambda"],
    skillsGained: [
      { name: "Cloud Architecture", level: 8 },
      { name: "AWS Services", level: 7 },
      { name: "Serverless Computing", level: 7 },
      { name: "DevOps Practices", level: 6 },
    ],
    level: 6,
  },
  {
    id: "classifile",
    title: "Full Stack Developer",
    company: "Classifile de México",
    period: "2014 - 2021",
    shortDescription:
      "Led development of document management platform, cloud storage service, and enterprise integrations.",
    description: [
      "Led the development of a document management platform that streamlined document organization and retrieval.",
      "Developed a secure cloud storage and sync service with end-to-end encryption and controlled access.",
      "Created an intuitive file classification system using metadata and content analysis.",
      "Built custom integrations using C# to connect with enterprise software systems.",
      "Led all aspects of development from design and implementation to testing and deployment, using PHP, JavaScript, and C#.",
    ],
    icon: WorkIcon,
    color: "#FF6B6B", // Coral Red
    type: "work",
    rewards: [
      "Project leadership experience",
      "Document management expertise",
      "Integration development skills",
    ],
    skills: ["PHP", "JavaScript", "C#", "SQL", "AWS", "Document Management"],
    skillsGained: [
      { name: "Back-End Development", level: 9 },
      { name: "Database Design", level: 8 },
      { name: "Systems Integration", level: 8 },
      { name: "Security Implementation", level: 7 },
    ],
    level: 7,
  },
  {
    id: "university",
    title: "Computer Science",
    company: "Universidad Autónoma de Tamaulipas",
    period: "2010 - 2015",
    shortDescription:
      "Computer Science degree with focus on programming fundamentals and database systems.",
    description: [
      "Completed coursework in Computer Science with focus on programming, algorithms, and database systems.",
      "Built a student database system for the university library that improved book tracking and borrowing processes.",
      "Participated in programming competitions and hackathons, developing problem-solving skills and teamwork abilities.",
    ],
    icon: SchoolIcon,
    color: "#FFD166", // Yellow
    type: "education",
    rewards: [
      "Computer Science foundation",
      "Database design skills",
      "Problem-solving abilities",
    ],
    skills: ["Programming", "Data Structures", "Algorithms", "Database Design"],
    skillsGained: [
      { name: "Programming Fundamentals", level: 7 },
      { name: "Database Management", level: 6 },
      { name: "Algorithm Design", level: 7 },
      { name: "Team Collaboration", level: 6 },
    ],
    level: 5,
  },
];

// Experience timeline for chronological display (newest to oldest)
export const experienceTimeline: Timeline[] = [
  {
    year: "2024",
    events: [experienceItems.find((item) => item.id === "aws-cert")!],
  },
  {
    year: "2022+",
    events: [experienceItems.find((item) => item.id === "sonatafy")!],
  },
  {
    year: "2014-2021",
    events: [experienceItems.find((item) => item.id === "classifile")!],
  },
  {
    year: "2010-2015",
    events: [experienceItems.find((item) => item.id === "university")!],
  },
];

// RPG level indicators
export const experienceLevelIcons = {
  1: "🔰", // Beginner
  2: "🥉", // Bronze
  3: "🥈", // Silver
  4: "🥇", // Gold
  5: "💎", // Diamond
  6: "⚡", // Energized
  7: "🔥", // Fire
  8: "⭐", // Star
  9: "🌟", // Super Star
  10: "👑", // Crown
};

// Get experience level title based on numeric value
export const getExperienceLevelTitle = (level: number): string => {
  switch (level) {
    case 1:
      return "Apprentice";
    case 2:
      return "Novice";
    case 3:
      return "Junior";
    case 4:
      return "Journeyman";
    case 5:
      return "Adept";
    case 6:
      return "Expert";
    case 7:
      return "Veteran";
    case 8:
      return "Master";
    case 9:
      return "Grandmaster";
    case 10:
      return "Legendary";
    default:
      return "Unknown";
  }
};
