import { Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { RetroTerminal } from "../../components/RetroTerminal";

export const RetroTerminalSection = () => {
  const theme = useTheme();

  return (
    <Box 
      marginTop="-200px"
      sx={{ 
        width: { xs: '400px', sm: '500px', md: '600px' },
        height: { xs: '450px', sm: '500px', md: '650px' },
        display: 'flex',
        alignItems: 'center',
        mr: { xs: 0, sm: 1, md: 4 },
      }}
    >
      {/* Terminal with Glowing Border and Floating Animation */}
      <motion.div
        animate={{ 
          y: [0, -10, 0], 
          x: [0, 5, 0, -5, 0],
          rotateZ: [0, 0.7, 0, -0.7, 0] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          repeatType: "loop",
          ease: "easeInOut"
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        {/* Outer glow effect around the terminal */}
        <Box 
          sx={{
            position: 'absolute',
            top: -3,
            left: -3,
            right: -3,
            bottom: -3,
            borderRadius: '12px',
            background: `radial-gradient(ellipse at center, ${theme.palette.primary.main}00 0%, ${theme.palette.primary.main}10 40%, ${theme.palette.primary.main}50 100%)`,
            filter: `blur(18px)`,
            opacity: 0.9,
            zIndex: -1,
          }}
        />
        
        {/* Terminal container with inner glow */}
        <Box 
          sx={{
            position: 'relative',
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: '10px',
            boxShadow: `0 0 15px ${theme.palette.primary.main}, 0 0 30px ${theme.palette.primary.main}40, inset 0 0 10px ${theme.palette.primary.main}30`,
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, transparent 50%, ${theme.palette.primary.main}10 100%)`,
              zIndex: 1,
              borderRadius: '8px',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
              backgroundSize: '100% 2px',
              pointerEvents: 'none',
              opacity: 0.5,
              zIndex: 2,
            },
          }}
        >
          <RetroTerminal />
        </Box>
      </motion.div>
    </Box>
  );
}; 