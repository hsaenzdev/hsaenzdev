import { useState, useEffect, useRef } from 'react';
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
  typingSpeed = 10, // Much faster default speed
  deletingSpeed = 5, // Much faster default deletion
  delayBetweenTexts = 1500,
  className
}: TypeWriterProps) => {
  const theme = useTheme();
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  
  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  
  // Initialize with first text immediately
  useEffect(() => {
    if (texts.length > 0) {
      setDisplayText(texts[0]);
      setTextIndex(0);
      setCharIndex(texts[0].length);
      // Start deleting after delay
      timerRef.current = window.setTimeout(() => {
        setIsTyping(false);
      }, delayBetweenTexts);
    }
  }, [texts, delayBetweenTexts]);
  
  // Handle the typing/deleting animation
  useEffect(() => {
    if (!texts.length) return;
    
    // Clear existing timer
    if (timerRef.current) clearTimeout(timerRef.current);
    
    if (isTyping) {
      // Typing animation
      if (charIndex < texts[textIndex].length) {
        timerRef.current = window.setTimeout(() => {
          setDisplayText(texts[textIndex].substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        // Finished typing a word, pause before deleting
        timerRef.current = window.setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      }
    } else {
      // Deleting animation
      if (charIndex > 0) {
        timerRef.current = window.setTimeout(() => {
          setDisplayText(texts[textIndex].substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next word
        const nextIndex = (textIndex + 1) % texts.length;
        setTextIndex(nextIndex);
        setIsTyping(true);
      }
    }
  }, [texts, textIndex, charIndex, isTyping, typingSpeed, deletingSpeed, delayBetweenTexts]);
  
  return (
    <Box 
      className={className} 
      sx={{ 
        display: 'inline-block',
        position: 'relative',
        minWidth: '10ch',
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
      {displayText}
    </Box>
  );
}; 