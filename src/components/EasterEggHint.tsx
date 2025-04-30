import { Box, Typography, useTheme } from '@mui/material';
import { useGameContext } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const EasterEggHint = () => {
  const theme = useTheme();
  const { isGameEnabled, score } = useGameContext();
  const [showHint, setShowHint] = useState(false);
  
  // Show hint after 5 seconds, but only if the game hasn't been discovered yet
  useEffect(() => {
    if (isGameEnabled && score === 0) {
      const timer = setTimeout(() => {
        setShowHint(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      setShowHint(false);
    }
  }, [isGameEnabled, score]);
  
  return (
    <AnimatePresence>
      {showHint && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          sx={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 10px ${theme.palette.primary.main}`,
            maxWidth: '80%',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.8rem',
              fontFamily: '"Press Start 2P", cursive',
              color: theme.palette.primary.light,
              textShadow: `0 0 5px ${theme.palette.primary.main}`,
            }}
          >
            Psst! Try pressing the arrow keys...
          </Typography>
        </Box>
      )}
    </AnimatePresence>
  );
}; 