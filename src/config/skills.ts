import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BuildIcon from '@mui/icons-material/Build';
import WebIcon from '@mui/icons-material/Web';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import TerminalIcon from '@mui/icons-material/Terminal';
import LaptopIcon from '@mui/icons-material/Laptop';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';

export interface Skill {
  name: string;
  level: number; // 1-10 for technical skills, can be used for proficiency in soft skills 
  description?: string;
  icon?: string;
  years?: number;
  firstUsed?: number; // year when first started using this skill
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: any; // React component
  color: string;
  description: string;
  skills: Skill[];
  yearsExperience?: number; // Total years of experience in this category
}

// Current year for calculating experience
const currentYear = new Date().getFullYear();

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Magic',
    icon: WebIcon,
    color: '#FF6B6B', // Coral Red
    description: 'Creating user interfaces that are as engaging as the best video games',
    yearsExperience: 10,
    skills: [
      { name: 'React', level: 9, years: 6, firstUsed: 2017, description: 'Building dynamic UIs with React ecosystem' },
      { name: 'TypeScript', level: 8, years: 4, firstUsed: 2019, description: 'Type-safe code for robust applications' },
      { name: 'JavaScript', level: 9, years: 10, firstUsed: 2013, description: 'ES6+ features, async programming' },
      { name: 'Material UI', level: 8, years: 5, firstUsed: 2018, description: 'Creating beautiful UI components' },
      { name: 'Vue.js', level: 7, years: 3, firstUsed: 2020, description: 'Progressive web applications' },
      { name: 'HTML/CSS', level: 9, years: 10, firstUsed: 2013, description: 'Semantic markup and responsive design' },
      { name: 'Three.js', level: 6, years: 2, firstUsed: 2021, description: '3D graphics and animations' },
      { name: 'GraphQL', level: 7, years: 3, firstUsed: 2020, description: 'Efficient data fetching' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend Powers',
    icon: StorageIcon,
    color: '#4ECDC4', // Teal
    description: 'Server-side skills to power up applications with solid foundations',
    yearsExperience: 8,
    skills: [
      { name: 'Node.js', level: 8, years: 5, firstUsed: 2018, description: 'Server-side JavaScript runtime' },
      { name: 'Express.js', level: 8, years: 5, firstUsed: 2018, description: 'Web application framework' },
      { name: 'Elixir/Phoenix', level: 7, years: 2, firstUsed: 2021, description: 'Functional programming for the web' },
      { name: 'Python', level: 6, years: 3, firstUsed: 2020, description: 'Data processing and automation' },
      { name: 'PHP', level: 7, years: 7, firstUsed: 2016, description: 'Web development and CMS integration' },
      { name: 'C#', level: 6, years: 3, firstUsed: 2014, description: '.NET development and integrations' },
      { name: 'API Design', level: 8, years: 6, firstUsed: 2017, description: 'RESTful and GraphQL APIs' },
    ]
  },
  {
    id: 'database',
    title: 'Data Mastery',
    icon: StorageIcon,
    color: '#FFD166', // Yellow
    description: 'Managing game save data and high scores with precision',
    yearsExperience: 8,
    skills: [
      { name: 'PostgreSQL', level: 8, years: 5, firstUsed: 2018, description: 'Relational database design and optimization' },
      { name: 'SQL', level: 9, years: 8, firstUsed: 2015, description: 'Complex queries and data manipulation' },
      { name: 'Snowflake', level: 7, years: 2, firstUsed: 2021, description: 'Cloud data warehousing' },
      { name: 'ClickHouse', level: 6, years: 1, firstUsed: 2022, description: 'Column-oriented DBMS' },
      { name: 'NoSQL', level: 7, years: 4, firstUsed: 2019, description: 'Document and key-value stores' },
      { name: 'Data Modeling', level: 8, years: 6, firstUsed: 2017, description: 'Designing efficient data structures' },
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Arsenal',
    icon: CloudIcon,
    color: '#6A0572', // Purple
    description: 'Deploying and managing applications in the cloud realm',
    yearsExperience: 6,
    skills: [
      { name: 'AWS', level: 8, years: 4, firstUsed: 2019, description: 'Cloud infrastructure and services' },
      { name: 'Docker', level: 7, years: 3, firstUsed: 2020, description: 'Containerization for consistent environments' },
      { name: 'Git/CI/CD', level: 8, years: 6, firstUsed: 2017, description: 'Version control and deployment pipelines' },
      { name: 'Linux', level: 7, years: 8, firstUsed: 2015, description: 'Server management and shell scripting' },
      { name: 'LaunchDarkly', level: 6, years: 2, firstUsed: 2021, description: 'Feature flag management' },
    ]
  },
  {
    id: 'tools',
    title: 'Power Tools',
    icon: BuildIcon,
    color: '#F78C6C', // Amber/Orange
    description: 'Utilities and tools to boost productivity and code quality',
    yearsExperience: 7,
    skills: [
      { name: 'Jira', level: 8, years: 5, firstUsed: 2018, description: 'Project management and issue tracking' },
      { name: 'Git', level: 9, years: 7, firstUsed: 2016, description: 'Version control expertise' },
      { name: 'Testing', level: 7, years: 4, firstUsed: 2019, description: 'Unit, integration, and E2E testing' },
      { name: 'VS Code', level: 9, years: 5, firstUsed: 2018, description: 'Efficient coding environment' },
      { name: 'Figma', level: 6, years: 2, firstUsed: 2021, description: 'UI design and prototyping' },
    ]
  },
  {
    id: 'soft-skills',
    title: 'Character Stats',
    icon: PsychologyIcon,
    color: '#5E72E4', // Indigo Blue
    description: 'Personal abilities that enhance teamwork and project success',
    yearsExperience: 10, // Professional experience overall
    skills: [
      { 
        name: 'Problem Solving', 
        level: 9, 
        description: 'Approaching complex problems with structured thinking and creative solutions'
      },
      { 
        name: 'Communication', 
        level: 8, 
        description: 'Clearly expressing ideas and actively listening to team members and clients'
      },
      { 
        name: 'Teamwork', 
        level: 9, 
        description: 'Collaborating effectively in diverse teams and contributing to group goals'
      },
      { 
        name: 'Adaptability', 
        level: 8, 
        description: 'Quickly adjusting to new technologies, methodologies, and project requirements'
      },
      { 
        name: 'Leadership', 
        level: 7, 
        description: 'Guiding teams, mentoring junior developers, and driving project initiatives'
      },
      { 
        name: 'Time Management', 
        level: 8, 
        description: 'Prioritizing tasks effectively and meeting deadlines consistently'
      },
      { 
        name: 'Critical Thinking', 
        level: 9, 
        description: 'Evaluating situations objectively and making sound decisions'
      },
      { 
        name: 'Empathy', 
        level: 8, 
        description: 'Understanding user needs and team dynamics to create better products'
      }
    ]
  },
  {
    id: 'languages',
    title: 'Languages',
    icon: LanguageIcon,
    color: '#2dce89', // Green
    description: 'Communication abilities across different languages',
    skills: [
      { 
        name: 'English', 
        level: 8, 
        description: 'Professional working proficiency in written and spoken English'
      },
      { 
        name: 'Spanish', 
        level: 10, 
        description: 'Native language with full professional proficiency'
      }
    ]
  }
];

// Function to get experience level description based on years
export const getExperienceLevel = (years?: number): string => {
  if (!years) return 'Proficient';
  if (years >= 8) return 'Master Tier';
  if (years >= 5) return 'Veteran';
  if (years >= 3) return 'Experienced';
  if (years >= 1) return 'Familiar';
  return 'Novice';
};

// Function to get a visual representation of experience timeline
export const getExperienceTimespan = (firstUsed?: number): string => {
  if (!firstUsed) return '';
  const span = currentYear - firstUsed;
  return `${firstUsed} → Present (${span} years)`;
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