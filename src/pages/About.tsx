import { Box, Typography, Paper, useTheme, Button, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PsychologyIcon from '@mui/icons-material/Psychology';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';
import CloudIcon from '@mui/icons-material/Cloud';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState, useRef } from "react";
import { TypeWriter } from "../components/TypeWriter";
import { GlowingText } from "../components/GlowingText";

// Quest component - interactive quest log that points to different sections
interface QuestProps {
  title: string;
  description: string;
  section: string;
  reward: string;
  isActive: boolean;
  onClick: () => void;
}

const Quest = ({ title, description, section, reward, isActive, onClick }: QuestProps) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        p: 2,
        mb: 1.5,
        borderRadius: 1,
        border: `1px solid ${isActive ? theme.palette.primary.main : 'rgba(255,255,255,0.1)'}`,
        bgcolor: isActive ? `${theme.palette.primary.main}15` : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        transform: isActive ? 'scale(1.03)' : 'scale(1)',
        boxShadow: isActive ? `0 0 10px ${theme.palette.primary.main}40` : 'none',
        '&:hover': {
          bgcolor: `${theme.palette.primary.main}10`,
          borderColor: theme.palette.primary.main,
        },
        '&::after': isActive ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}20, transparent)`,
          animation: 'shine 1.5s infinite',
          '@keyframes shine': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          },
        } : {},
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.7rem',
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1,
            py: 0.2,
            borderRadius: '4px',
            bgcolor: isActive ? `${theme.palette.primary.main}30` : 'rgba(255,255,255,0.05)',
            border: `1px solid ${isActive ? theme.palette.primary.main : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '0.6rem',
              color: isActive ? theme.palette.primary.main : 'rgba(255,255,255,0.5)',
            }}
          >
            {section}
          </Typography>
        </Box>
      </Box>
      
      <Typography
        variant="body2"
        sx={{
          mb: 1.5,
          color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
          fontSize: '0.8rem',
        }}
      >
        {description}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.accent1.main,
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '0.6rem',
              mr: 0.5,
            }}
          >
            Reward:
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: isActive ? theme.palette.accent1.main : theme.palette.text.secondary,
            }}
          >
            {reward}
          </Typography>
        </Box>
        
        {isActive && (
          <ArrowRightAltIcon 
            sx={{ 
              color: theme.palette.primary.main,
              animation: 'bounce 1s infinite',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateX(0)' },
                '50%': { transform: 'translateX(5px)' },
              },
            }} 
          />
        )}
      </Box>
    </Box>
  );
};

export const About = () => {
  const theme = useTheme();
  const [characterLevel, setCharacterLevel] = useState(1);
  const [activeQuest, setActiveQuest] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [showCheatCode, setShowCheatCode] = useState(false);
  const [secretActivated, setSecretActivated] = useState(false);
  const bioRef = useRef<HTMLDivElement>(null);
  const maxLevel = 10;

  // Simulate level up animation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (characterLevel < maxLevel) {
        setCharacterLevel(prev => prev + 1);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [characterLevel]);
  
  // Auto-rotate active quests
  useEffect(() => {
    const questRotationInterval = setInterval(() => {
      setActiveQuest(prev => (prev + 1) % quests.length);
    }, 6000);
    
    return () => clearInterval(questRotationInterval);
  }, []);
  
  // Hide scroll indicator after a while
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle cheat code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret konami code
      const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
      const keyPressed = e.key.toLowerCase();
      
      if (keyPressed === 'escape') {
        setShowCheatCode(false);
        return;
      }
      
      if (!showCheatCode && (keyPressed === '/')) {
        setShowCheatCode(true);
        e.preventDefault();
      }
      
      if (showCheatCode && keyPressed === 'enter') {
        setSecretActivated(true);
        setShowCheatCode(false);
        setTimeout(() => setSecretActivated(false), 3000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCheatCode]);
  
  const scrollToBio = () => {
    if (bioRef.current) {
      bioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const quests = [
    {
      title: "Master of Skills",
      description: "Discover Hector's extensive skillset and tech mastery across multiple languages and frameworks.",
      section: "Skills",
      reward: "Unlock skill tree details and hidden technologies",
    },
    {
      title: "Chronicles of Experience",
      description: "Explore Hector's 10+ year journey through various projects and companies.",
      section: "Experience",
      reward: "Reveal project accomplishments and strategies",
    },
    {
      title: "Achievement Hunter",
      description: "Uncover earned certifications, awards, and professional milestones.",
      section: "Achievements",
      reward: "Gain insight into professional growth patterns",
    },
    {
      title: "Project Showcase",
      description: "Browse through interactive demos of significant development projects.",
      section: "Projects",
      reward: "Access to code repositories and live demos",
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Pixel art background elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 20,
          left: 20,
          width: 40,
          height: 40,
          opacity: 0.2,
          background: `url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h10v10H0zm10 10h10v10H10zm10 0h10v10H20zm10 0h10v10H30zM0 20h10v10H0zm10 10h10v10H10zm10 0h10v10H20zm10 0h10v10H30z" fill="${theme.palette.primary.main}" fill-opacity="0.5" fill-rule="evenodd"/%3E%3C/svg%3E')`,
        }}
      />
      
      <Box 
        sx={{ 
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 40,
          height: 40,
          opacity: 0.2,
          background: `url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h20v20H0zm20 20h20v20H20z" fill="${theme.palette.secondary.main}" fill-opacity="0.5" fill-rule="evenodd"/%3E%3C/svg%3E')`,
        }}
      />
      
      {/* Animated grid lines */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `linear-gradient(${theme.palette.primary.main}20 1px, transparent 1px), 
                            linear-gradient(90deg, ${theme.palette.primary.main}20 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          zIndex: -1,
          animation: 'gridMove 30s linear infinite',
          '@keyframes gridMove': {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '20px 20px' },
          }
        }}
      />
      
      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, index) => (
        <Box
          key={index}
          component={motion.div}
          sx={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: index % 3 === 0 
              ? theme.palette.primary.main 
              : index % 3 === 1 
                ? theme.palette.secondary.main 
                : theme.palette.accent1.main,
            opacity: 0.4,
            zIndex: -1,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 15 + Math.random() * 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Secret cheat code console */}
      <AnimatePresence>
        {showCheatCode && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'fixed',
              bottom: 30,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              width: '80%',
              maxWidth: '600px',
            }}
          >
            <Paper
              elevation={5}
              sx={{
                p: 2,
                bgcolor: 'rgba(0,0,0,0.8)',
                border: `1px solid ${theme.palette.primary.main}`,
                boxShadow: `0 0 20px ${theme.palette.primary.main}50`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.primary.main,
                    fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '0.7rem',
                  }}
                >
                  DEV CONSOLE &gt;
                </Typography>
              </Box>
              <Box
                component="input"
                sx={{
                  width: '100%',
                  bgcolor: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'monospace',
                  '&::placeholder': {
                    color: 'rgba(255,255,255,0.3)',
                  },
                }}
                placeholder="Enter cheat code... (try 'konami')"
                autoFocus
              />
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 1,
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.7rem',
                }}
              >
                Press ENTER to execute, ESC to cancel
              </Typography>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Secret activated flash */}
      <AnimatePresence>
        {secretActivated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: `${theme.palette.primary.main}20`,
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.primary.main,
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                textShadow: `0 0 10px ${theme.palette.primary.main}`,
              }}
            >
              GOD MODE ACTIVATED!
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%', maxWidth: '1200px' }}
      >
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <GlowingText 
            text="Player Profile" 
            variant="h2" 
            sx={{ 
              mb: 2, 
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif', 
              textAlign: 'center',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            }}
            glowColor={theme.palette.primary.main}
          />
          
          <Typography 
            variant="subtitle1"
            sx={{ 
              color: theme.palette.text.secondary,
              mb: 4,
            }}
          >
            <TypeWriter 
              texts={[
                "Full-Stack Developer and Problem Solver", 
                "Coding Adventures Since 2010", 
                "Tech Stack Collector and Explorer",
                "Press '/' for dev console"
              ]} 
              typingSpeed={70} 
            />
          </Typography>
          
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                onClick={scrollToBio}
                style={{ 
                  cursor: 'pointer',
                  display: 'inline-block',
                  marginBottom: '20px',
                }}
              >
                <KeyboardArrowDownIcon 
                  sx={{ 
                    fontSize: 24, 
                    color: theme.palette.primary.main,
                  }} 
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    color: theme.palette.primary.main,
                    fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '0.5rem',
                  }}
                >
                  SCROLL TO CONTINUE
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Character Profile Section */}
          <Paper
            elevation={3}
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 30%' },
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(circle at center, rgba(255,51,102,0.1) 0%, rgba(255,51,102,0) 70%)',
                pointerEvents: 'none',
              }
            }}
          >
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: `conic-gradient(${theme.palette.primary.main} ${characterLevel*10}%, ${theme.palette.background.paper} 0)`,
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `4px solid ${theme.palette.background.paper}`,
                boxShadow: `0 0 15px ${theme.palette.primary.main}`,
                position: 'relative',
                animation: secretActivated ? 'glow 1.5s infinite alternate' : 'none',
                '@keyframes glow': {
                  '0%': { boxShadow: `0 0 10px ${theme.palette.primary.main}` },
                  '100%': { boxShadow: `0 0 30px ${theme.palette.primary.main}, 0 0 50px ${theme.palette.primary.main}` },
                }
              }}
            >
              <Box sx={{
                width: '80%',
                height: '80%',
                borderRadius: '50%',
                bgcolor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <PsychologyIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
              </Box>
              
              {/* Level indicator */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: theme.palette.accent1.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${theme.palette.background.paper}`,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                  }}
                >
                  {secretActivated ? '99' : characterLevel}
                </Typography>
              </Box>
              
              {/* XP progress */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -15,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80%',
                  zIndex: 0,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 6,
                    bgcolor: 'rgba(0,0,0,0.3)',
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.2)',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: secretActivated ? '100%' : '65%',
                      bgcolor: theme.palette.accent1.main,
                      backgroundImage: `linear-gradient(90deg, ${theme.palette.accent1.main}, ${theme.palette.accent1.light})`,
                      transition: 'width 0.5s ease',
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '0.5rem',
                    mt: 0.5,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {secretActivated ? 'MAX XP' : 'XP: 6500 / 10000'}
                </Typography>
              </Box>
            </Box>
            
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                color: theme.palette.primary.main,
                mb: 2,
                textAlign: 'center',
                fontSize: { xs: '1rem', sm: '1.2rem' },
              }}
            >
              Hector Saenz
            </Typography>
            
            <Box sx={{ position: 'relative', mb: 2, minHeight: '2rem' }}>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.secondary.main,
                  textAlign: 'center',
                }}
              >
                <TypeWriter texts={["Full-Stack Developer", "React Specialist", "TypeScript Expert", "AWS Cloud Expert"]} typingSpeed={100} />
              </Typography>
            </Box>
            
            {/* Character stats */}
            <Box sx={{ 
              width: '100%', 
              mb: 3,
              p: 1.5,
              borderRadius: 1,
              border: `1px dashed ${theme.palette.primary.main}30`,
              bgcolor: `${theme.palette.primary.main}05`,
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>STR:</Typography>
                <Box sx={{ display: 'flex' }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      sx={{ 
                        fontSize: 14, 
                        color: i < 4 ? theme.palette.accent1.main : 'rgba(255,255,255,0.1)',
                        mr: 0.3
                      }} 
                    />
                  ))}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>INT:</Typography>
                <Box sx={{ display: 'flex' }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      sx={{ 
                        fontSize: 14, 
                        color: i < (secretActivated ? 5 : 4) ? theme.palette.accent2.main : 'rgba(255,255,255,0.1)',
                        mr: 0.3
                      }} 
                    />
                  ))}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>DEX:</Typography>
                <Box sx={{ display: 'flex' }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      sx={{ 
                        fontSize: 14, 
                        color: i < (secretActivated ? 5 : 3) ? theme.palette.accent3.main : 'rgba(255,255,255,0.1)',
                        mr: 0.3
                      }} 
                    />
                  ))}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>CHR:</Typography>
                <Box sx={{ display: 'flex' }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      sx={{ 
                        fontSize: 14, 
                        color: i < (secretActivated ? 5 : 4) ? theme.palette.secondary.main : 'rgba(255,255,255,0.1)',
                        mr: 0.3
                      }} 
                    />
                  ))}
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2, 
              mb: 3,
              flexWrap: 'wrap' 
            }}>
              {['JavaScript', 'TypeScript', 'React', 'AWS'].map((skill, index) => (
                <Box 
                  key={index}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    bgcolor: `${theme.palette.background.default}`,
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Box>
            
            <Button 
              variant="contained"
              sx={{ 
                bgcolor: theme.palette.accent1.main,
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: '0.6rem',
                py: 1.5,
                '&:hover': {
                  bgcolor: theme.palette.accent1.dark,
                  transform: 'translateY(-3px)',
                  boxShadow: `0 0 15px ${theme.palette.accent1.main}`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              DOWNLOAD RESUME
            </Button>
          </Paper>

          {/* Bio and Quest Section */}
          <Paper
            elevation={3}
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 70%' },
              p: 3,
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              border: `2px solid ${theme.palette.secondary.main}`,
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box ref={bioRef}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                pb: 2,
                borderBottom: `1px solid ${theme.palette.primary.main}30`,
              }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                    color: theme.palette.secondary.main,
                    fontSize: { xs: '0.9rem', sm: '1.1rem' },
                  }}
                >
                  CHARACTER BIO
                </Typography>
                
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}>
                  <Box 
                    sx={{ 
                      width: 12, 
                      height: 12, 
                      borderRadius: '50%', 
                      bgcolor: theme.palette.accent1.main,
                      animation: 'pulse 1.5s infinite',
                      '@keyframes pulse': {
                        '0%': { opacity: 0.4 },
                        '50%': { opacity: 1 },
                        '100%': { opacity: 0.4 },
                      }
                    }} 
                  />
                  <Typography variant="caption" sx={{ color: theme.palette.accent1.main }}>
                    ONLINE
                  </Typography>
                </Box>
              </Box>
             
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box
                    sx={{
                      flex: '1 1 calc(25% - 16px)',
                      minWidth: '120px',
                      p: 2,
                      textAlign: 'center',
                      border: `1px solid ${theme.palette.accent1.main}`,
                      borderRadius: '8px',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(to right, ${theme.palette.accent1.main}20 1px, transparent 1px), linear-gradient(to bottom, ${theme.palette.accent1.main}20 1px, transparent 1px)`,
                        backgroundSize: '10px 10px',
                        pointerEvents: 'none',
                      }
                    }}
                  >
                    <Typography variant="h6" color={theme.palette.accent1.main}>
                      10+
                    </Typography>
                    <Typography variant="body2">Years Exp</Typography>
                  </Box>
                  <Box
                    sx={{
                      flex: '1 1 calc(25% - 16px)',
                      minWidth: '120px',
                      p: 2,
                      textAlign: 'center',
                      border: `1px solid ${theme.palette.accent2.main}`,
                      borderRadius: '8px',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(to right, ${theme.palette.accent2.main}20 1px, transparent 1px), linear-gradient(to bottom, ${theme.palette.accent2.main}20 1px, transparent 1px)`,
                        backgroundSize: '10px 10px',
                        pointerEvents: 'none',
                      }
                    }}
                  >
                    <Typography variant="h6" color={theme.palette.accent2.main}>
                      2
                    </Typography>
                    <Typography variant="body2">AWS Certs</Typography>
                  </Box>
                  <Box
                    sx={{
                      flex: '1 1 calc(25% - 16px)',
                      minWidth: '120px',
                      p: 2,
                      textAlign: 'center',
                      border: `1px solid ${theme.palette.accent3.main}`,
                      borderRadius: '8px',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(to right, ${theme.palette.accent3.main}20 1px, transparent 1px), linear-gradient(to bottom, ${theme.palette.accent3.main}20 1px, transparent 1px)`,
                        backgroundSize: '10px 10px',
                        pointerEvents: 'none',
                      }
                    }}
                  >
                    <Typography variant="h6" color={theme.palette.accent3.main}>
                      5+
                    </Typography>
                    <Typography variant="body2">Languages</Typography>
                  </Box>
                  <Box
                    sx={{
                      flex: '1 1 calc(25% - 16px)',
                      minWidth: '120px',
                      p: 2,
                      textAlign: 'center',
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: '8px',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}20 1px, transparent 1px), linear-gradient(to bottom, ${theme.palette.primary.main}20 1px, transparent 1px)`,
                        backgroundSize: '10px 10px',
                        pointerEvents: 'none',
                      }
                    }}
                  >
                    <Typography variant="h6" color={theme.palette.primary.main}>
                      100%
                    </Typography>
                    <Typography variant="body2">Reliability</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mb: 4, position: 'relative' }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    mb: 3,
                    lineHeight: 1.8,
                    p: 2,
                    border: `1px dashed ${theme.palette.primary.main}20`,
                    borderRadius: 2,
                    position: 'relative',
                    textAlign: 'center',
                  }}
                >
                  A highly experienced full-stack developer with over 10 years of experience crafting user-friendly and functional web applications. 
                  Specializing in React, TypeScript, and various other tools, including AWS. Known for reliability, 
                  a strong commitment to delivering results, and excellent teamwork and communication skills.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: theme.palette.accent2.main }}>
                    <span style={{ fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif', fontSize: '0.7rem' }}>
                      ACTIVE QUESTS
                    </span>
                  </Typography>
                  
                  <IconButton 
                    size="small" 
                    onClick={() => setActiveQuest((prev) => (prev + 1) % quests.length)}
                    sx={{
                      color: theme.palette.accent2.main,
                      bgcolor: `${theme.palette.accent2.main}10`,
                      '&:hover': {
                        bgcolor: `${theme.palette.accent2.main}20`,
                      }
                    }}
                  >
                    <ArrowRightAltIcon fontSize="small" />
                  </IconButton>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  {quests.map((quest, index) => (
                    <Quest
                      key={index}
                      title={quest.title}
                      description={quest.description}
                      section={quest.section}
                      reward={quest.reward}
                      isActive={index === activeQuest}
                      onClick={() => setActiveQuest(index)}
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}>
                  <span style={{ fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif', fontSize: '0.7rem' }}>
                    SPECIAL ABILITIES
                  </span>
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 1.5,
                    border: `1px solid ${theme.palette.accent1.main}30`,
                    borderRadius: 2,
                    bgcolor: theme.palette.accent1.main + '10',
                    flex: '1 1 calc(50% - 16px)',
                    minWidth: '200px',
                  }}>
                    <CodeIcon sx={{ fontSize: 24, color: theme.palette.accent1.main, mr: 1 }} />
                    <Typography variant="body2">Front-End Mastery</Typography>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 1.5,
                    border: `1px solid ${theme.palette.accent2.main}30`,
                    borderRadius: 2,
                    bgcolor: theme.palette.accent2.main + '10',
                    flex: '1 1 calc(50% - 16px)',
                    minWidth: '200px',
                  }}>
                    <BuildIcon sx={{ fontSize: 24, color: theme.palette.accent2.main, mr: 1 }} />
                    <Typography variant="body2">Back-End Expertise</Typography>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 1.5,
                    border: `1px solid ${theme.palette.accent3.main}30`,
                    borderRadius: 2,
                    bgcolor: theme.palette.accent3.main + '10',
                    flex: '1 1 calc(50% - 16px)',
                    minWidth: '200px',
                  }}>
                    <SchoolIcon sx={{ fontSize: 24, color: theme.palette.accent3.main, mr: 1 }} />
                    <Typography variant="body2">Continuous Learning</Typography>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 1.5,
                    border: `1px solid ${theme.palette.primary.main}30`,
                    borderRadius: 2,
                    bgcolor: theme.palette.primary.main + '10',
                    flex: '1 1 calc(50% - 16px)',
                    minWidth: '200px',
                  }}>
                    <CloudIcon sx={{ fontSize: 24, color: theme.palette.primary.main, mr: 1 }} />
                    <Typography variant="body2">Cloud Expert</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </motion.div>
    </Box>
  );
}; 