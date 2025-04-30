import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { CONTROLS } from "./constants";

interface ControlsSectionProps {
  controls?: typeof CONTROLS;
}

export const ControlsSection = ({ controls = CONTROLS }: ControlsSectionProps) => {
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
      transition={{ duration: 0.7, delay: 0.6 }}
      sx={{ 
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        mb: 2,
        width: '100%',
        zIndex: 9,
      }}
    >
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
        {controls.title}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        {controls.items.map((item, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{
              color: getColorFromPalette(item.color),
              fontFamily: '"Press Start 2P", monospace',
              fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
              letterSpacing: '0.05em',
              textShadow: `0 0 8px ${getColorFromPalette(item.color)}80`,
            }}
          >
            &gt; {item.text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}; 