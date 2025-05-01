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

// Simple glowing name component with no hover effects
const GlowingName = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
  color: theme.palette.primary.main,
  textShadow: `0 0 15px ${theme.palette.primary.main}, 0 0 20px ${theme.palette.primary.main}70`,
  letterSpacing: '0.02em',
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

  // Use first and last name
  const firstName = "Hector";
  const lastName = "Saenz";

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
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.1rem' },
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
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          sx={{ display: 'flex', gap: { xs: '0.5rem', sm: '0.75rem' }, alignItems: 'center' }}
        >
          <GlowingName variant="h1" sx={{ color: '#9c27b0', textShadow: `0 0 15px #9c27b0, 0 0 20px #9c27b070` }}>
            I'm
          </GlowingName>
          <GlowingName variant="h1">
            {firstName}
          </GlowingName>
          <GlowingName variant="h1">
            {lastName}
          </GlowingName>
        </Box>
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
          typingSpeed={18}  // Slightly slower typing
          deletingSpeed={20} // Slightly slower deleting
          delayBetweenTexts={2500} // Longer pause between role changes
          initialDelay={1800} // Start the typing effect sooner for better user experience
          initialText="Full Stack Developer" // Initial text that will be shown immediately
          stopAfterFullCycle={true} // Stop after going through all texts, ending with "Full Stack Developer"
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