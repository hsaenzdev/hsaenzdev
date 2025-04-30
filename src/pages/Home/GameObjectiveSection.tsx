import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { GlowingText } from "../../components/GlowingText";
import { GAME_OBJECTIVE } from "./constants";

interface GameObjectiveSectionProps {
  gameObjective?: typeof GAME_OBJECTIVE;
}

export const GameObjectiveSection = ({ 
  gameObjective = GAME_OBJECTIVE
}: GameObjectiveSectionProps) => {
  const theme = useTheme();
  
  // Enhanced description text that features career highlights
  const enhancedDescription = 
    "Full-stack developer with 10+ years crafting web applications. Specializing in React, TypeScript, and AWS. Successfully led the development of document management platforms, interactive dashboards, and secure cloud solutions.";

  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ 
        maxWidth: { xs: '100%', sm: '450px', md: '480px' },
        zIndex: 9,
        position: 'relative',
      }}
    >
      {/* Section Title with glowing effect */}
      <Box
        component={motion.div}
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GlowingText 
          text="DEVELOPER PROFILE"
          variant="h4"
          color="#ffffff"
          glowColor={theme.palette.accent3.main}
          glowIntensity={10}
          sx={{ 
            fontFamily: '"Press Start 2P", monospace',
            fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' },
            mb: 1.5,
          }}
        />
      </Box>
      
      {/* Character Name */}
      <Typography
        component={motion.div}
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        variant="body1"
        sx={{
          color: theme.palette.primary.main,
          fontFamily: '"Press Start 2P", monospace',
          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
          fontWeight: 'bold',
          lineHeight: 1.6,
          letterSpacing: '0.05em',
          textShadow: `0 0 10px ${theme.palette.primary.main}70`,
          mb: 1.5,
        }}
      >
        HECTOR SAENZ - LVL 10
      </Typography>
      
      {/* Main description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            fontFamily: '"Press Start 2P", monospace',
            fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
            lineHeight: 1.8,
            mb: 2,
            letterSpacing: '0.03em',
          }}
        >
          {enhancedDescription}
        </Typography>
      </motion.div>
    </Box>
  );
}; 