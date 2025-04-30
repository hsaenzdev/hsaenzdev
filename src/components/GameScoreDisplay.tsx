import { Box, Typography } from '@mui/material';
import { useGameContext } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';

export const GameScoreDisplay = () => {
  const { score, isGameEnabled } = useGameContext();
  
  // Only show score if game is enabled and score is greater than 0
  const showScore = isGameEnabled && score > 0;
  
  return (
    <AnimatePresence>
      {showScore && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1000,
            padding: '4px 12px',
            borderRadius: '4px',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            border: '2px solid',
            borderColor: theme => theme.palette.primary.main,
            boxShadow: theme => `0 0 10px ${theme.palette.primary.main}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.8rem',
              color: '#fff',
              textShadow: theme => `0 0 5px ${theme.palette.primary.main}`,
            }}
          >
            SCORE: {score}
          </Typography>
        </Box>
      )}
    </AnimatePresence>
  );
}; 