import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, useTheme } from '@mui/material';

interface TypeWriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  className?: string;
}

export const TypeWriter = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
  className
}: TypeWriterProps) => {
  const theme = useTheme();
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  // Use refs for values that should not trigger re-renders when they change
  const textsRef = useRef(texts);
  const typingSpeedRef = useRef(typingSpeed);
  const deletingSpeedRef = useRef(deletingSpeed);
  const delayBetweenTextsRef = useRef(delayBetweenTexts);
  const cursorRef = useRef<any>(null);
  const currentIndexRef = useRef(0);
  
  // Update refs when props change
  useEffect(() => {
    textsRef.current = texts;
    typingSpeedRef.current = typingSpeed;
    deletingSpeedRef.current = deletingSpeed;
    delayBetweenTextsRef.current = delayBetweenTexts;
  }, [texts, typingSpeed, deletingSpeed, delayBetweenTexts]);
  
  // Memoized typing function to maintain stable reference
  const tick = useCallback(() => {
    if (!textsRef.current.length) return;
    
    const i = currentIndexRef.current % textsRef.current.length;
    const fullText = textsRef.current[i];
    
    // Calculate delay for next tick
    let delay = typingSpeedRef.current;
    
    if (isDeleting) {
      setCurrentText(text => text.substring(0, text.length - 1));
      delay = deletingSpeedRef.current;
      
      // When done deleting
      if (currentText.length === 1) {
        currentIndexRef.current = (currentIndexRef.current + 1) % textsRef.current.length;
        delay = 500; // Brief pause before starting the next word
        setIsDeleting(false);
      }
    } else {
      setCurrentText(text => fullText.substring(0, text.length + 1));
      
      // When done typing
      if (currentText.length === fullText.length - 1) {
        delay = delayBetweenTextsRef.current;
        setIsDeleting(true);
      }
    }
    
    cursorRef.current = setTimeout(tick, delay);
  }, [currentText, isDeleting]);
  
  // Start/restart typing animation
  useEffect(() => {
    if (!textsRef.current.length) return;
    
    // Initial timeout
    cursorRef.current = setTimeout(tick, 1000);
    
    // Cleanup function
    return () => {
      if (cursorRef.current) {
        clearTimeout(cursorRef.current);
      }
    };
  }, [tick]);

  return (
    <Box 
      className={className} 
      sx={{ 
        display: 'inline-block',
        position: 'relative',
        minWidth: '10ch', // Ensure the box has some width even when empty
        '&::after': {
          content: '"|"',
          color: theme.palette.primary.main,
          fontWeight: 'bold',
          marginLeft: '2px',
          animation: 'blink 0.7s infinite',
          '@keyframes blink': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0 },
            '100%': { opacity: 1 }
          }
        }
      }}
    >
      {currentText}
    </Box>
  );
}; 