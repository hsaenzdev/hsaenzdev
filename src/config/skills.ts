import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BuildIcon from '@mui/icons-material/Build';
import WebIcon from '@mui/icons-material/Web';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import TerminalIcon from '@mui/icons-material/Terminal';
import LaptopIcon from '@mui/icons-material/Laptop';

export interface Skill {
  name: string;
  level: number; // 1-10
  description?: string;
  icon?: string;
  years?: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: any; // React component
  color: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Magic',
    icon: WebIcon,
    color: '#FF6B6B', // Coral Red
    description: 'Creating user interfaces that are as engaging as the best video games',
    skills: [
      { name: 'React', level: 9, years: 6, description: 'Building dynamic UIs with React ecosystem' },
      { name: 'TypeScript', level: 8, years: 4, description: 'Type-safe code for robust applications' },
      { name: 'JavaScript', level: 9, years: 10, description: 'ES6+ features, async programming' },
      { name: 'Material UI', level: 8, years: 5, description: 'Creating beautiful UI components' },
      { name: 'Vue.js', level: 7, years: 3, description: 'Progressive web applications' },
      { name: 'HTML/CSS', level: 9, years: 10, description: 'Semantic markup and responsive design' },
      { name: 'Three.js', level: 6, years: 2, description: '3D graphics and animations' },
      { name: 'GraphQL', level: 7, years: 3, description: 'Efficient data fetching' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend Powers',
    icon: StorageIcon,
    color: '#4ECDC4', // Teal
    description: 'Server-side skills to power up applications with solid foundations',
    skills: [
      { name: 'Node.js', level: 8, years: 5, description: 'Server-side JavaScript runtime' },
      { name: 'Express.js', level: 8, years: 5, description: 'Web application framework' },
      { name: 'Elixir/Phoenix', level: 7, years: 2, description: 'Functional programming for the web' },
      { name: 'Python', level: 6, years: 3, description: 'Data processing and automation' },
      { name: 'PHP', level: 7, years: 7, description: 'Web development and CMS integration' },
      { name: 'C#', level: 6, years: 3, description: '.NET development and integrations' },
      { name: 'API Design', level: 8, years: 6, description: 'RESTful and GraphQL APIs' },
    ]
  },
  {
    id: 'database',
    title: 'Data Mastery',
    icon: StorageIcon,
    color: '#FFD166', // Yellow
    description: 'Managing game save data and high scores with precision',
    skills: [
      { name: 'PostgreSQL', level: 8, years: 5, description: 'Relational database design and optimization' },
      { name: 'SQL', level: 9, years: 8, description: 'Complex queries and data manipulation' },
      { name: 'Snowflake', level: 7, years: 2, description: 'Cloud data warehousing' },
      { name: 'ClickHouse', level: 6, years: 1, description: 'Column-oriented DBMS' },
      { name: 'NoSQL', level: 7, years: 4, description: 'Document and key-value stores' },
      { name: 'Data Modeling', level: 8, years: 6, description: 'Designing efficient data structures' },
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Arsenal',
    icon: CloudIcon,
    color: '#6A0572', // Purple
    description: 'Deploying and managing applications in the cloud realm',
    skills: [
      { name: 'AWS', level: 8, years: 4, description: 'Cloud infrastructure and services' },
      { name: 'Docker', level: 7, years: 3, description: 'Containerization for consistent environments' },
      { name: 'Git/CI/CD', level: 8, years: 6, description: 'Version control and deployment pipelines' },
      { name: 'Linux', level: 7, years: 8, description: 'Server management and shell scripting' },
      { name: 'LaunchDarkly', level: 6, years: 2, description: 'Feature flag management' },
    ]
  },
  {
    id: 'tools',
    title: 'Power Tools',
    icon: BuildIcon,
    color: '#F78C6C', // Amber/Orange
    description: 'Utilities and tools to boost productivity and code quality',
    skills: [
      { name: 'Jira', level: 8, years: 5, description: 'Project management and issue tracking' },
      { name: 'Git', level: 9, years: 7, description: 'Version control expertise' },
      { name: 'Testing', level: 7, years: 4, description: 'Unit, integration, and E2E testing' },
      { name: 'VS Code', level: 9, years: 5, description: 'Efficient coding environment' },
      { name: 'Figma', level: 6, years: 2, description: 'UI design and prototyping' },
    ]
  }
];

// Pixel art style icons for skill levels
export const skillLevelIndicators = {
  beginner: '●○○○○',
  intermediate: '●●●○○',
  advanced: '●●●●○',
  expert: '●●●●●'
};

// Get skill level name based on numeric value
export const getSkillLevelName = (level: number): string => {
  if (level >= 9) return 'Master';
  if (level >= 7) return 'Expert';
  if (level >= 5) return 'Advanced';
  if (level >= 3) return 'Intermediate';
  return 'Beginner';
};

// Get skill level color based on numeric value
export const getSkillLevelColor = (level: number): string => {
  if (level >= 9) return '#FFD700'; // Gold
  if (level >= 7) return '#C0C0C0'; // Silver
  if (level >= 5) return '#CD7F32'; // Bronze
  if (level >= 3) return '#4CAF50'; // Green
  return '#2196F3'; // Blue
}; 