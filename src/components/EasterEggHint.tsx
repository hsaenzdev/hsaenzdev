import { Box, Typography, useTheme } from '@mui/material';
import { useGameContext } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const EasterEggHint = () => {
  const theme = useTheme();
  const { isGameEnabled, score } = useGameContext();
  const [showHint, setShowHint] = useState(false);
  const [arrowKeysUsed, setArrowKeysUsed] = useState(false);
  
  // Show hint after 5 seconds, but only if the game hasn't been discovered yet
  useEffect(() => {
    if (isGameEnabled && score === 0 && !arrowKeysUsed) {
      const timer = setTimeout(() => {
        setShowHint(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      setShowHint(false);
    }
  }, [isGameEnabled, score, arrowKeysUsed]);
  
  // Track arrow key usage
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        setArrowKeysUsed(true);
        setShowHint(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Reset arrowKeysUsed when isGameEnabled changes (new game session)
  useEffect(() => {
    if (!isGameEnabled) {
      setArrowKeysUsed(false);
    }
  }, [isGameEnabled]);
  
  // Adjust position to account for sidenav
  const sideNavWidth = 280; // Width of the sidenav in pixels
  
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
            left: `calc(50% + ${sideNavWidth / 2}px)`,
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