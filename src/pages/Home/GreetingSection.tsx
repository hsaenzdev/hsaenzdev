import { Box, Typography, useTheme, styled } from "@mui/material";
import { motion } from "framer-motion";
import { GlowingText } from "../../components/GlowingText";
import { TypeWriter } from "../../components/TypeWriter";
import { GREETING } from "./constants";
import { useState, useEffect } from "react";

// Styled TypeWriter component with custom styling
const StyledTypeWriter = styled(TypeWriter)(({ theme }) => ({
  color: '#00F5D4 !important',
  fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
  letterSpacing: '0.03em',
  textShadow: '0 0 10px rgba(0, 245, 212, 0.7)',
  fontSize: '1.1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '1.1rem',
  },
}));

// Custom glowing name component with letter hover effect
const GlowingName = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
  color: theme.palette.primary.main,
  textShadow: `0 0 15px ${theme.palette.primary.main}, 0 0 20px ${theme.palette.primary.main}70`,
  '& .letter': {
    display: 'inline-block',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: theme.palette.primary.light,
      textShadow: `0 0 20px ${theme.palette.primary.main}`,
      transform: 'translateY(-3px)'
    }
  }
}));

interface GreetingSectionProps {
  // Optional props for customization
  customGreeting?: typeof GREETING;
}

export const GreetingSection = ({ customGreeting }: GreetingSectionProps) => {
  const theme = useTheme();
  const greeting = customGreeting || GREETING;
  
  // Enhanced roles based on resume
  const roles = [
    "Full Stack Developer",
    "JavaScript/TypeScript Expert",
    "React Developer",
    "AWS Certified Developer",
    "Node.js Engineer",
    "UI/Material Design Specialist",
    "DevOps Engineer"
  ];

  // Split name into individual letters for hover effect
  const nameLetters = greeting.name.split('');

  return (
    <Box
      sx={{
        pt: { xs: 4, md: 5 },
        pl: { xs: 1, sm: 2, md: 3 },
        zIndex: 10,
        maxWidth: { xs: '95%', sm: '60%', md: '50%' },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GlowingText 
          text={greeting.hello}
          variant="h2"
          color="#ffffff"
          glowColor={theme.palette.secondary.main}
          glowIntensity={12}
          sx={{ 
            fontSize: { xs: '1.7rem', sm: '2rem', md: '2.3rem' },
            letterSpacing: '0.05em',
            textAlign: { xs: 'center', sm: 'left' }
          }}
        />
      </motion.div>
      
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        sx={{
          mt: 2,
          whiteSpace: 'nowrap',
          overflow: 'visible',
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h1"
          component="span"
          sx={{
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: { xs: '2.2rem', sm: '2.6rem', md: '3.2rem' },
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: { xs: '0.5rem', sm: '0.75rem' }
          }}
        >
          <GlowingText 
            text="I am"
            variant="h1"
            color="#9c27b0"
            glowColor="#9c27b0"
            glowIntensity={15}
            sx={{ 
              display: 'inline',
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: 'inherit',
              fontWeight: 'bold',
            }}
          />
          <GlowingName>
            {nameLetters.map((letter, index) => (
              <motion.span 
                key={index} 
                className="letter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + (index * 0.05) }}
              >
                {letter}
              </motion.span>
            ))}
          </GlowingName>
        </Typography>
      </Box>

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        sx={{
          mt: 2,
          mb: 3,
          whiteSpace: 'nowrap',
          overflow: 'visible',
          height: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <StyledTypeWriter
          texts={roles}
          typingSpeed={8}  // Extremely fast typing
          deletingSpeed={5} // Fast deleting
          delayBetweenTexts={2500} // Longer pause between role changes
        />
      </Box>

      <Box
        component={motion.h5}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <GlowingText
          text={greeting.tagline}
          variant="h5"
          color={theme.palette.text.secondary}
          glowColor={theme.palette.primary.main}
          glowIntensity={6}
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            maxWidth: '600px',
            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
            textAlign: { xs: 'center', sm: 'left' },
            mb: 4,
            lineHeight: 1.8,
            letterSpacing: '0.02em'
          }}
        />
      </Box>
    </Box>
  );
}; 