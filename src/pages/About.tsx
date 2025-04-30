import { Box, Typography, Paper, useTheme, Button } from "@mui/material";
import { motion } from "framer-motion";
import PsychologyIcon from '@mui/icons-material/Psychology';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';
import CloudIcon from '@mui/icons-material/Cloud';
import { useEffect, useState } from "react";
import { TypeWriter } from "../components/TypeWriter";
import { GlowingText } from "../components/GlowingText";

export const About = () => {
  const theme = useTheme();
  const [characterLevel, setCharacterLevel] = useState(1);
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%', maxWidth: '1200px' }}
      >
        <GlowingText 
          text="Character Profile" 
          variant="h3" 
          sx={{ mb: 4, fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif', textAlign: 'center' }}
          glowColor={theme.palette.primary.main}
        />
        
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
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                  }}
                >
                  {characterLevel}
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
            
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.secondary.main,
                mb: 2,
                textAlign: 'center',
              }}
            >
              <TypeWriter texts={["Full-Stack Developer", "React Specialist", "TypeScript Expert"]} typingSpeed={100} />
            </Typography>
            
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

          {/* Stats and Info Section */}
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
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                color: theme.palette.secondary.main,
                mb: 3,
                fontSize: { xs: '0.9rem', sm: '1.1rem' },
              }}
            >
              CHARACTER STATS
            </Typography>
            
            <Box sx={{ mb: 3 }}>
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

            <Box sx={{ mb: 3, position: 'relative' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: theme.palette.primary.main }}>
                PLAYER BIO
              </Typography>
              
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
                }}
              >
                A highly experienced full-stack developer with over 10 years of experience crafting user-friendly and functional web applications. 
                Specializing in React, TypeScript, and various other tools, including AWS. Known for reliability, 
                a strong commitment to delivering results, and excellent teamwork and communication skills.
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}>
                SPECIAL ABILITIES
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 1.5,
                  border: `1px solid ${theme.palette.accent1.main}30`,
                  borderRadius: 2,
                  bgcolor: theme.palette.accent1.main + '10',
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
                }}>
                  <CloudIcon sx={{ fontSize: 24, color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="body2">Cloud Expert</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </motion.div>
    </Box>
  );
}; 