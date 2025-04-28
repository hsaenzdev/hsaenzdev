import { Box, Typography, Paper, useTheme, LinearProgress } from "@mui/material";
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CloudIcon from '@mui/icons-material/Cloud';
import { ReactNode } from "react";

interface SkillItemProps {
  name: string;
  level: number;
  color: string;
}

const SkillItem = ({ name, level, color }: SkillItemProps) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2">{name}</Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.6rem'
          }}
        >
          LVL {level}
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={level * 10} 
        sx={{ 
          height: 10, 
          borderRadius: 1,
          '& .MuiLinearProgress-bar': {
            backgroundColor: color
          }
        }} 
      />
    </Box>
  );
};

interface Skill {
  name: string;
  level: number;
}

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  icon: ReactNode;
  color: string;
}

const SkillCategory = ({ title, skills, icon, color }: SkillCategoryProps) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(50% - 16px)' },
        p: 3,
        mb: 3,
        border: `2px solid ${color}`,
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box 
          sx={{ 
            mr: 2, 
            width: 50, 
            height: 50, 
            borderRadius: '50%', 
            bgcolor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            color: color,
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1rem'
          }}
        >
          {title}
        </Typography>
      </Box>
      {skills.map((skill: Skill, index: number) => (
        <SkillItem 
          key={index} 
          name={skill.name} 
          level={skill.level} 
          color={color} 
        />
      ))}
    </Paper>
  );
};

interface SkillCategory {
  title: string;
  color: string;
  icon: ReactNode;
  skills: Skill[];
}

export const Skills = () => {
  const theme = useTheme();
  
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      color: theme.palette.accent1.main,
      icon: <CodeIcon sx={{ color: 'white' }} />,
      skills: [
        { name: "React", level: 9 },
        { name: "TypeScript", level: 8 },
        { name: "HTML/CSS", level: 9 },
        { name: "Next.js", level: 7 },
      ]
    },
    {
      title: "Backend",
      color: theme.palette.accent2.main,
      icon: <StorageIcon sx={{ color: 'white' }} />,
      skills: [
        { name: "Node.js", level: 8 },
        { name: "Express", level: 7 },
        { name: "MongoDB", level: 7 },
        { name: "PostgreSQL", level: 6 },
      ]
    },
    {
      title: "UI/UX",
      color: theme.palette.accent3.main,
      icon: <DesignServicesIcon sx={{ color: 'white' }} />,
      skills: [
        { name: "Material UI", level: 8 },
        { name: "Responsive Design", level: 9 },
        { name: "Figma", level: 7 },
        { name: "Three.js", level: 6 },
      ]
    },
    {
      title: "DevOps",
      color: theme.palette.primary.main,
      icon: <CloudIcon sx={{ color: 'white' }} />,
      skills: [
        { name: "Git", level: 8 },
        { name: "Docker", level: 6 },
        { name: "AWS", level: 7 },
        { name: "CI/CD", level: 7 },
      ]
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          color: theme.palette.primary.main,
          mb: 4,
          textAlign: 'center'
        }}
      >
        Skill Tree
      </Typography>
      
      <Box 
        sx={{
          display: 'flex', 
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {skillCategories.map((category, index) => (
          <SkillCategory
            key={index}
            title={category.title}
            skills={category.skills}
            icon={category.icon}
            color={category.color}
          />
        ))}
      </Box>
    </Box>
  );
}; 