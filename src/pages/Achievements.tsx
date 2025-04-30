import { Box, Typography, Paper, useTheme, Button } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SchoolIcon from '@mui/icons-material/School';
import CloudIcon from '@mui/icons-material/Cloud';
import LockIcon from '@mui/icons-material/Lock';
import { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlowingText } from "../components/GlowingText";

interface AchievementProps {
  title: string;
  date: string;
  description: string;
  icon: ReactNode;
  color: string;
  isLocked?: boolean;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  xp?: number;
}

const RARITY_COLORS = {
  common: '#9e9e9e',
  uncommon: '#4caf50',
  rare: '#2196f3',
  epic: '#9c27b0',
  legendary: '#ffc107'
};

const Achievement = ({ 
  title, 
  date, 
  description, 
  icon, 
  color, 
  isLocked = false,
  rarity = 'common',
  xp = 100
}: AchievementProps) => {
  const theme = useTheme();
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(!isLocked);
  
  // Handle unlocking animation
  const handleUnlock = () => {
    if (isLocked && !isUnlocking) {
      setIsUnlocking(true);
      setTimeout(() => {
        setIsUnlocked(true);
      }, 2000);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={!isLocked ? { 
        y: -10,
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        transition: { duration: 0.2 }
      } : {}}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          height: '100%',
          border: `2px solid ${isLocked ? 'rgba(255,255,255,0.1)' : color}`,
          background: isLocked 
            ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)` 
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${color}15 100%)`,
          filter: isLocked ? 'grayscale(1)' : 'none',
          opacity: isLocked ? 0.7 : 1,
          transition: 'all 0.5s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Rarity indicator */}
        {!isLocked && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 40px 40px 0',
              borderColor: `transparent ${RARITY_COLORS[rarity]} transparent transparent`,
              filter: 'drop-shadow(0 0 5px ${RARITY_COLORS[rarity]})',
            }}
          />
        )}
        
        {/* Unlocking animation effect */}
        {isUnlocking && (
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${color}40 0%, transparent 50%, ${color}40 100%)`,
              backgroundSize: '200% 200%',
              animation: 'shine 2s ease-in-out',
              '@keyframes shine': {
                '0%': { backgroundPosition: '0% 0%' },
                '50%': { backgroundPosition: '100% 100%' },
                '100%': { backgroundPosition: '0% 0%' },
              },
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        )}
        
        <Box 
          sx={{ 
            width: 70, 
            height: 70, 
            borderRadius: '50%', 
            bgcolor: isLocked ? 'rgba(255,255,255,0.1)' : color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            position: 'relative',
            boxShadow: isLocked ? 'none' : `0 0 15px ${color}80`,
            transition: 'all 0.5s ease',
          }}
        >
          {isLocked ? (
            <LockIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 30 }} />
          ) : (
            icon
          )}
          
          {/* XP indicator */}
          {!isLocked && (
            <Box
              sx={{
                position: 'absolute',
                bottom: -5,
                right: -5,
                bgcolor: theme.palette.background.paper,
                border: `2px solid ${color}`,
                borderRadius: '50%',
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                color: color,
              }}
            >
              {xp}
            </Box>
          )}
        </Box>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: isLocked ? 'rgba(255,255,255,0.5)' : color,
            mb: 1,
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.9rem',
            height: '2.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isLocked ? "???????????" : title}
        </Typography>
        
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block',
            mb: 2,
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.6rem',
            color: isLocked ? 'rgba(255,255,255,0.3)' : theme.palette.text.secondary,
          }}
        >
          {isLocked ? "LOCKED" : `UNLOCKED: ${date}`}
        </Typography>
        
        <Typography 
          variant="body2"
          sx={{
            color: isLocked ? 'rgba(255,255,255,0.3)' : theme.palette.text.primary,
            mb: 3,
            height: isLocked ? '3rem' : 'auto',
            overflow: 'hidden',
          }}
        >
          {isLocked ? "Complete special challenges to unlock this achievement." : description}
        </Typography>
        
        {isLocked && !isUnlocked && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleUnlock}
            disabled={isUnlocking}
            sx={{
              borderColor: 'rgba(255,255,255,0.3)',
              color: 'rgba(255,255,255,0.5)',
              '&:hover': {
                borderColor: color,
                backgroundColor: `${color}20`,
                color: color,
              },
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '0.6rem',
              padding: '4px 10px',
            }}
          >
            {isUnlocking ? "UNLOCKING..." : "REVEAL"}
          </Button>
        )}
      </Paper>
    </motion.div>
  );
};

export const Achievements = () => {
  const theme = useTheme();
  const [showTrophy, setShowTrophy] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTrophy(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const achievements: AchievementProps[] = [
    {
      title: "AWS Certified Cloud Practitioner",
      date: "2023",
      description: "Demonstrated foundational knowledge of AWS Cloud services, architecture, security, and deployment models.",
      icon: <CloudIcon sx={{ color: 'white', fontSize: 30 }} />,
      color: theme.palette.primary.main,
      rarity: 'rare',
      xp: 250
    },
    {
      title: "AWS Certified Developer",
      date: "2023",
      description: "Validated expertise in developing, deploying, and debugging cloud-based applications using AWS.",
      icon: <CloudIcon sx={{ color: 'white', fontSize: 30 }} />,
      color: theme.palette.accent1.main,
      rarity: 'epic',
      xp: 500
    },
    {
      title: "Data Visualization Expert",
      date: "2022",
      description: "Created interactive data dashboards using amCharts, delivering complex insights through intuitive visualizations.",
      icon: <WorkspacePremiumIcon sx={{ color: 'white', fontSize: 30 }} />,
      color: theme.palette.accent2.main,
      rarity: 'uncommon',
      xp: 150
    },
    {
      title: "Feature Flag Specialist",
      date: "2022",
      description: "Mastered the implementation of feature flags with LaunchDarkly, enabling controlled feature rollouts and experimentation.",
      icon: <MilitaryTechIcon sx={{ color: 'white', fontSize: 30 }} />,
      color: theme.palette.accent3.main,
      rarity: 'uncommon',
      xp: 180
    },
    {
      title: "Platform Architecture Master",
      date: "2023",
      description: "Designed and implemented key architectural improvements for platform V3, enhancing performance and scalability.",
      icon: <SchoolIcon sx={{ color: 'white', fontSize: 30 }} />,
      color: theme.palette.secondary.main,
      rarity: 'rare',
      xp: 320
    },
    {
      title: "Legendary Full-Stack",
      date: "????",
      description: "",
      icon: <EmojiEventsIcon sx={{ color: 'white', fontSize: 30 }} />,
      color: RARITY_COLORS.legendary,
      isLocked: true,
      rarity: 'legendary',
      xp: 1000
    },
    {
      title: "CI/CD Pipeline Master",
      date: "????",
      description: "",
      icon: <MilitaryTechIcon sx={{ color: 'white', fontSize: 30 }} />,
      color: theme.palette.primary.dark,
      isLocked: true,
      rarity: 'rare',
      xp: 420
    },
    {
      title: "Performance Guru",
      date: "????",
      description: "",
      icon: <EmojiEventsIcon sx={{ color: 'white', fontSize: 30 }} />,
      color: theme.palette.accent2.dark,
      isLocked: true,
      rarity: 'epic',
      xp: 750
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
      {/* Background trophy particle effect */}
      {showTrophy && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            overflow: 'hidden',
          }}
        >
          {[...Array(15)].map((_, i) => (
            <Box
              key={i}
              component={motion.div}
              sx={{
                position: 'absolute',
                width: 24,
                height: 24,
                opacity: 0.2,
                color: `hsl(${(i * 40) % 360}, 70%, 50%)`,
              }}
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: -50, 
                rotate: Math.random() * 360 
              }}
              animate={{ 
                y: '120%', 
                rotate: Math.random() * 720,
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ 
                duration: 15 + Math.random() * 20, 
                repeat: Infinity, 
                delay: i * 0.8,
                ease: 'linear'
              }}
            >
              <EmojiEventsIcon fontSize="small" />
            </Box>
          ))}
        </Box>
      )}
      
      <GlowingText 
        text="Trophy Room" 
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
          background: `linear-gradient(to right, transparent, ${theme.palette.primary.main}20, transparent)`,
          p: 1.5,
          mb: 4,
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        <Typography 
          variant="body2"
          sx={{
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.7rem',
            color: theme.palette.secondary.main,
          }}
        >
          5 / 8 Achievements Unlocked • Total XP: 1400
        </Typography>
      </Box>
      
      <Box 
        sx={{
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {achievements.map((achievement, index) => (
          <Achievement 
            key={index}
            title={achievement.title}
            date={achievement.date}
            description={achievement.description}
            icon={achievement.icon}
            color={achievement.color}
            isLocked={achievement.isLocked}
            rarity={achievement.rarity}
            xp={achievement.xp}
          />
        ))}
      </Box>
    </Box>
  );
}; 