import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SchoolIcon from '@mui/icons-material/School';
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';

export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: any; // React component
  color: string;
  rarity: AchievementRarity;
  xp: number;
  category: 'certification' | 'project' | 'skill' | 'award';
  badgeImage?: string;
}

// Rarity colors for achievements
export const rarityColors = {
  common: '#9e9e9e',
  uncommon: '#4caf50',
  rare: '#2196f3',
  epic: '#9c27b0',
  legendary: '#ffc107'
};

// Achievement data
export const achievements: Achievement[] = [
  {
    id: "aws-developer",
    title: "AWS Certified Developer - Associate",
    date: "2020",
    description: "Mastered AWS services and best practices for developing, deploying, and debugging cloud-based applications.",
    icon: CloudIcon,
    color: '#FF9900', // AWS Orange
    rarity: 'epic',
    xp: 500,
    category: 'certification',
    badgeImage: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23232F3E' stroke='%23FF9900' stroke-width='5'/%3E%3Ctext fill='%23FF9900' font-family='monospace' font-size='20' font-weight='bold' x='100' y='90' text-anchor='middle'%3EAWS%3C/text%3E%3Ctext fill='%23FF9900' font-family='monospace' font-size='14' font-weight='bold' x='100' y='120' text-anchor='middle'%3EDEVELOPER%3C/text%3E%3C/svg%3E"
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    date: "2020",
    description: "Demonstrated foundational understanding of AWS Cloud services, security, architecture, pricing, and support.",
    icon: CloudIcon,
    color: '#FF9900', // AWS Orange
    rarity: 'rare',
    xp: 300,
    category: 'certification',
    badgeImage: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23232F3E' stroke='%23FF9900' stroke-width='5'/%3E%3Ctext fill='%23FF9900' font-family='monospace' font-size='20' font-weight='bold' x='100' y='90' text-anchor='middle'%3EAWS%3C/text%3E%3Ctext fill='%23FF9900' font-family='monospace' font-size='14' font-weight='bold' x='100' y='120' text-anchor='middle'%3EPRACTITIONER%3C/text%3E%3C/svg%3E"
  },
  {
    id: "react-master",
    title: "React Maestro",
    date: "2022",
    description: "Achieved mastery of React ecosystem through years of experience building complex applications.",
    icon: CodeIcon,
    color: '#61DAFB', // React Blue
    rarity: 'epic',
    xp: 450,
    category: 'skill',
    badgeImage: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23222222' stroke='%2361DAFB' stroke-width='5'/%3E%3Ctext fill='%2361DAFB' font-family='monospace' font-size='20' font-weight='bold' x='100' y='90' text-anchor='middle'%3EREACT%3C/text%3E%3Ctext fill='%2361DAFB' font-family='monospace' font-size='14' font-weight='bold' x='100' y='120' text-anchor='middle'%3EMAESTRO%3C/text%3E%3C/svg%3E"
  },
  {
    id: "typescript-expert",
    title: "TypeScript Virtuoso",
    date: "2022",
    description: "Demonstrated exceptional TypeScript skills through complex project implementation and mentoring.",
    icon: CodeIcon,
    color: '#3178C6', // TypeScript Blue
    rarity: 'rare',
    xp: 350,
    category: 'skill',
    badgeImage: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23152740' stroke='%233178C6' stroke-width='5'/%3E%3Ctext fill='%233178C6' font-family='monospace' font-size='20' font-weight='bold' x='100' y='90' text-anchor='middle'%3ETS%3C/text%3E%3Ctext fill='%233178C6' font-family='monospace' font-size='14' font-weight='bold' x='100' y='120' text-anchor='middle'%3EVIRTUOSO%3C/text%3E%3C/svg%3E"
  },
  {
    id: "document-system",
    title: "Document System Architect",
    date: "2021",
    description: "Led the successful design and implementation of an enterprise document management system.",
    icon: StorageIcon,
    color: '#5D4BE1', // Purple
    rarity: 'legendary',
    xp: 800,
    category: 'project',
    badgeImage: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23343131' stroke='%235D4BE1' stroke-width='5'/%3E%3Ctext fill='%235D4BE1' font-family='monospace' font-size='20' font-weight='bold' x='100' y='90' text-anchor='middle'%3EARCHITECT%3C/text%3E%3Ctext fill='%235D4BE1' font-family='monospace' font-size='14' font-weight='bold' x='100' y='120' text-anchor='middle'%3EDOCUMENTER%3C/text%3E%3C/svg%3E"
  },
  {
    id: "performance-guru",
    title: "Performance Optimization Guru",
    date: "2023",
    description: "Recognized for exceptional skills in diagnosing and resolving performance bottlenecks in web applications.",
    icon: SpeedIcon,
    color: '#4ECDC4', // Teal
    rarity: 'epic',
    xp: 600,
    category: 'skill',
    badgeImage: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%232A2A2A' stroke='%234ECDC4' stroke-width='5'/%3E%3Ctext fill='%234ECDC4' font-family='monospace' font-size='20' font-weight='bold' x='100' y='90' text-anchor='middle'%3ESPEED%3C/text%3E%3Ctext fill='%234ECDC4' font-family='monospace' font-size='14' font-weight='bold' x='100' y='120' text-anchor='middle'%3EOPTIMIZER%3C/text%3E%3C/svg%3E"
  },
  {
    id: "data-visualization",
    title: "Data Visualization Expert",
    date: "2022",
    description: "Created complex data visualization dashboards that transformed raw data into actionable business insights.",
    icon: BuildIcon,
    color: '#FF6B6B', // Coral
    rarity: 'rare',
    xp: 450,
    category: 'skill',
    badgeImage: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23333333' stroke='%23FF6B6B' stroke-width='5'/%3E%3Ctext fill='%23FF6B6B' font-family='monospace' font-size='20' font-weight='bold' x='100' y='90' text-anchor='middle'%3EDATA%3C/text%3E%3Ctext fill='%23FF6B6B' font-family='monospace' font-size='14' font-weight='bold' x='100' y='120' text-anchor='middle'%3EVISUALIZER%3C/text%3E%3C/svg%3E"
  },
  {
    id: "security-champion",
    title: "Security Champion",
    date: "2021",
    description: "Implemented robust security measures and best practices in application development.",
    icon: SecurityIcon,
    color: '#6A0572', // Purple
    rarity: 'uncommon',
    xp: 250,
    category: 'skill',
    badgeImage: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23272727' stroke='%236A0572' stroke-width='5'/%3E%3Ctext fill='%236A0572' font-family='monospace' font-size='20' font-weight='bold' x='100' y='90' text-anchor='middle'%3ESECURITY%3C/text%3E%3Ctext fill='%236A0572' font-family='monospace' font-size='14' font-weight='bold' x='100' y='120' text-anchor='middle'%3ECHAMPION%3C/text%3E%3C/svg%3E"
  },
  {
    id: "feature-flags",
    title: "Feature Flag Pioneer",
    date: "2022",
    description: "Designed and implemented an advanced feature flag system that enhanced deployment safety and A/B testing capabilities.",
    icon: BuildIcon,
    color: '#9B5DE5', // Purple
    rarity: 'uncommon',
    xp: 300,
    category: 'project',
    badgeImage: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23333333' stroke='%239B5DE5' stroke-width='5'/%3E%3Ctext fill='%239B5DE5' font-family='monospace' font-size='20' font-weight='bold' x='100' y='90' text-anchor='middle'%3EFEATURE%3C/text%3E%3Ctext fill='%239B5DE5' font-family='monospace' font-size='14' font-weight='bold' x='100' y='120' text-anchor='middle'%3EFLAGS%3C/text%3E%3C/svg%3E"
  },
  {
    id: "elixir-phoenix",
    title: "Elixir/Phoenix Adventurer",
    date: "2022",
    description: "Embraced functional programming with Elixir and Phoenix to build highly concurrent and fault-tolerant applications.",
    icon: CodeIcon,
    color: '#4E2A8E', // Elixir Purple
    rarity: 'rare',
    xp: 400,
    category: 'skill',
    badgeImage: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23333333' stroke='%234E2A8E' stroke-width='5'/%3E%3Ctext fill='%234E2A8E' font-family='monospace' font-size='20' font-weight='bold' x='100' y='90' text-anchor='middle'%3EELIXIR%3C/text%3E%3Ctext fill='%234E2A8E' font-family='monospace' font-size='14' font-weight='bold' x='100' y='120' text-anchor='middle'%3EADVENTURER%3C/text%3E%3C/svg%3E"
  }
];

// Categorize achievements for better organization
export const achievementCategories = {
  certification: achievements.filter(a => a.category === 'certification'),
  project: achievements.filter(a => a.category === 'project'),
  skill: achievements.filter(a => a.category === 'skill'),
  award: achievements.filter(a => a.category === 'award')
};

// Get experience points from achievements
export const getTotalXP = (): number => {
  return achievements.reduce((total, achievement) => total + achievement.xp, 0);
};

// Get achievement count by rarity
export const getAchievementCountByRarity = (): Record<AchievementRarity, number> => {
  return achievements.reduce((counts, achievement) => {
    counts[achievement.rarity] = (counts[achievement.rarity] || 0) + 1;
    return counts;
  }, {} as Record<AchievementRarity, number>);
};

// Get rarity description
export const getRarityDescription = (rarity: AchievementRarity): string => {
  switch (rarity) {
    case 'common': return 'Basic accomplishment achieved by most developers';
    case 'uncommon': return 'Notable accomplishment showing dedication';
    case 'rare': return 'Significant achievement requiring expertise';
    case 'epic': return 'Outstanding mastery that few developers attain';
    case 'legendary': return 'Exceptional achievement at the highest level';
    default: return '';
  }
}; 