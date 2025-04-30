import { Box, Typography, useTheme, styled } from "@mui/material";
import { motion } from "framer-motion";
import { GlowingText } from "../../components/GlowingText";
import { TypeWriter } from "../../components/TypeWriter";
import { GREETING } from "./constants";

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

interface GreetingSectionProps {
  // Optional props for customization
  customGreeting?: typeof GREETING;
}

export const GreetingSection = ({ customGreeting }: GreetingSectionProps) => {
  const theme = useTheme();
  const greeting = customGreeting || GREETING;
  
  // Array of roles for the typing effect
  const roles = [
    "Full Stack Developer",
    "Frontend Specialist",
    "Backend Engineer",
    "UI/UX Enthusiast",
    "React Developer",
    "TypeScript Expert",
    "AWS Solutions Architect"
  ];

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
          overflow: 'visible'
        }}
      >
        <Typography
          variant="h1"
          component="span"
          sx={{
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
            textAlign: { xs: 'center', sm: 'left' },
            letterSpacing: '0.02em',
            textShadow: `0 0 10px ${theme.palette.primary.main}60`,
            display: 'block'
          }}
        >
          <Box component="span" sx={{ color: '#9c27b0', textShadow: '0 0 8px rgba(156, 39, 176, 0.6)' }}>I am</Box>{' '}
          <Box component="span" sx={{ color: theme.palette.primary.main }}>{greeting.name}</Box>
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
          typingSpeed={80}
          deletingSpeed={40}
          delayBetweenTexts={2000}
        />
      </Box>

      <Typography
        variant="h5"
        component={motion.h5}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: '600px',
          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
          textAlign: { xs: 'center', sm: 'left' },
          mb: 4
        }}
      >
        {greeting.tagline}
      </Typography>
    </Box>
  );
}; 