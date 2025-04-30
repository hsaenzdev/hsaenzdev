import { Box, Typography, Paper, useTheme, LinearProgress, Tooltip, Button } from "@mui/material";
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CloudIcon from '@mui/icons-material/Cloud';
import BuildIcon from '@mui/icons-material/Build';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { GlowingText } from "../components/GlowingText";

interface SkillItemProps {
  name: string;
  level: number;
  color: string;
  isUnlocked: boolean;
  handleUnlock?: () => void;
}

const SkillItem = ({ name, level, color, isUnlocked, handleUnlock }: SkillItemProps) => {  
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isUnlocked && (
            <Box 
              component="span" 
              sx={{ 
                display: 'inline-block',
                width: 16, 
                height: 16, 
                mr: 1, 
                bgcolor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                position: 'relative',
                '&::after': {
                  content: '"?"',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fff',
                  fontSize: '10px',
                }
              }} 
            />
          )}
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: isUnlocked ? 1 : 0.6, 
              textDecoration: !isUnlocked ? 'line-through' : 'none',
              fontWeight: isUnlocked ? 'bold' : 'normal',
            }}
          >
            {name}
          </Typography>
        </Box>
        <Typography 
          variant="caption" 
          sx={{ 
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.6rem',
            opacity: isUnlocked ? 1 : 0.6,
          }}
        >
          LVL {isUnlocked ? level : '??'}
        </Typography>
      </Box>
      <Box sx={{ position: 'relative' }}>
        <LinearProgress 
          variant="determinate" 
          value={isUnlocked ? level * 10 : 0} 
          sx={{ 
            height: 12, 
            borderRadius: 1,
            border: '1px solid rgba(255,255,255,0.1)',
            bgcolor: 'rgba(0,0,0,0.2)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: isUnlocked ? color : 'grey',
              backgroundImage: isUnlocked ? 
                `repeating-linear-gradient(45deg, ${color} 0%, ${color} 10%, ${color}cc 10%, ${color}cc 20%)` : 
                'none',
              transition: 'transform 1s ease-in-out',
            }
          }} 
        />
        {!isUnlocked && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleUnlock}
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              minWidth: 0,
              padding: '0 8px',
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '0.5rem',
              borderColor: color,
              color: color,
              '&:hover': {
                borderColor: color,
                backgroundColor: `${color}20`,
              }
            }}
          >
            UNLOCK
          </Button>
        )}
      </Box>
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
  const [unlockedSkills, setUnlockedSkills] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(skills.slice(0, 2).map(skill => [skill.name, true]))
  );
  
  const handleUnlock = (skillName: string) => {
    setUnlockedSkills(prev => ({
      ...prev,
      [skillName]: true
    }));
  };
  
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(50% - 16px)' },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 3,
            border: `2px solid ${color}`,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: 80,
              height: 80,
              backgroundImage: `radial-gradient(circle at top right, ${color}30 0%, transparent 70%)`,
              pointerEvents: 'none',
              zIndex: 0,
            }
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
                justifyContent: 'center',
                boxShadow: `0 0 10px ${color}80`,
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
              isUnlocked={!!unlockedSkills[skill.name]}
              handleUnlock={() => handleUnlock(skill.name)}
            />
          ))}
        </Paper>
      </motion.div>
    </Box>
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
        { name: "TypeScript", level: 9 },
        { name: "JavaScript", level: 9 },
        { name: "Material UI", level: 8 },
        { name: "Vue.js", level: 7 },
        { name: "GraphQL", level: 7 },
        { name: "Three.js", level: 6 },
      ]
    },
    {
      title: "Backend",
      color: theme.palette.accent2.main,
      icon: <StorageIcon sx={{ color: 'white' }} />,
      skills: [
        { name: "Node.js", level: 8 },
        { name: "Express.js", level: 8 },
        { name: "Phoenix (Elixir)", level: 7 },
        { name: "Python", level: 7 },
        { name: "PHP", level: 7 },
        { name: "C#", level: 6 },
      ]
    },
    {
      title: "Databases",
      color: theme.palette.accent3.main,
      icon: <StorageOutlinedIcon sx={{ color: 'white' }} />,
      skills: [
        { name: "PostgreSQL", level: 8 },
        { name: "Snowflake", level: 7 },
        { name: "ClickHouse", level: 7 },
        { name: "SQL/NoSQL", level: 8 },
      ]
    },
    {
      title: "DevOps",
      color: theme.palette.primary.main,
      icon: <CloudIcon sx={{ color: 'white' }} />,
      skills: [
        { name: "AWS", level: 8 },
        { name: "Docker", level: 7 },
        { name: "Git (GitLab CI/CD)", level: 8 },
        { name: "Linux", level: 7 },
        { name: "LaunchDarkly", level: 7 },
      ]
    }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background game elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          opacity: 0.03,
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M30 0l30 30-30 30L0 30z" fill="${theme.palette.primary.main}" fill-opacity="1" fill-rule="evenodd"/%3E%3C/svg%3E')`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      
      <GlowingText 
        text="Skill Tree" 
        variant="h3" 
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          color: theme.palette.primary.main,
          mb: 4,
          textAlign: 'center'
        }}
        glowColor={theme.palette.primary.main}
      />
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            maxWidth: 'fit-content',
            backgroundColor: theme.palette.background.paper,
            border: `1px dashed ${theme.palette.primary.main}`,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '0.7rem',
              color: theme.palette.primary.main,
            }}
          >
            Skill points available: 3
          </Typography>
        </Paper>
      </Box>
      
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