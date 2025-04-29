import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { GlowingText } from "../../components/GlowingText";
import { GAME_OBJECTIVE, CONTROLS } from "./constants";

interface GameObjectiveSectionProps {
  gameObjective?: typeof GAME_OBJECTIVE;
  controls?: typeof CONTROLS;
}

export const GameObjectiveSection = ({ 
  gameObjective = GAME_OBJECTIVE,
  controls = CONTROLS 
}: GameObjectiveSectionProps) => {
  const theme = useTheme();

  // Function to get color based on palette key
  const getColorFromPalette = (colorKey: string) => {
    switch(colorKey) {
      case 'accent1':
        return theme.palette.accent1.main;
      case 'accent2':
        return theme.palette.accent2.main;
      case 'accent3':
        return theme.palette.accent3.main;
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      default:
        return '#ffffff';
    }
  };

  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: { xs: '100%', sm: '500px', md: '550px' },
        ml: { xs: 1, sm: 2, md: 3 },
        zIndex: 9,
      }}
    >
      <GlowingText 
        text={gameObjective.title}
        variant="h4"
        color="#ffffff"
        glowColor={theme.palette.accent3.main}
        glowIntensity={10}
        sx={{ 
          fontFamily: '"Press Start 2P", monospace',
          fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' },
          mb: 1,
        }}
      />
      
      <Typography
        variant="body1"
        sx={{
          color: '#ffffff',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.75rem' },
          lineHeight: 1.8,
          letterSpacing: '0.05em',
          textShadow: '0 0 10px rgba(0,0,0,0.7)',
        }}
      >
        {gameObjective.subtitle}
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          fontFamily: 'Roboto, sans-serif',
          fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
          lineHeight: 1.8,
        }}
      >
        {gameObjective.description}
      </Typography>
      
      <Box component="div" sx={{ mt: 1 }}>
        <Typography
          variant="body1"
          sx={{
            color: '#ffffff',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.75rem' },
            lineHeight: 1.8,
            letterSpacing: '0.05em',
            mb: 1.5,
            textShadow: '0 0 10px rgba(0,0,0,0.7)',
          }}
        >
          {controls.title}
        </Typography>
        
        {controls.items.map((item, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{
              color: getColorFromPalette(item.color),
              fontFamily: '"Press Start 2P", monospace',
              fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
              lineHeight: 1.8,
              letterSpacing: '0.05em',
              mb: index < controls.items.length - 1 ? 0.5 : 0,
            }}
          >
            &gt; {item.text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}; 