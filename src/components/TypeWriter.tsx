import { useState, useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface TypeWriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  initialDelay?: number;
  initialText?: string;
  stopAfterFullCycle?: boolean;
  className?: string;
}

export const TypeWriter = ({
  texts,
  typingSpeed = 15,
  deletingSpeed = 8,
  delayBetweenTexts = 1500,
  initialDelay = 3000,
  initialText,
  stopAfterFullCycle = false,
  className
}: TypeWriterProps) => {
  const theme = useTheme();
  const firstText = initialText || (texts.length > 0 ? texts[0] : '');
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [isInitialTextVisible, setIsInitialTextVisible] = useState(false);
  
  const textsWithFinalText = useRef<string[]>([]);
  
  useEffect(() => {
    if (stopAfterFullCycle && initialText) {
      const filteredTexts = texts.filter(text => text !== initialText);
      textsWithFinalText.current = filteredTexts;
    } else {
      textsWithFinalText.current = [...texts];
    }
  }, [texts, initialText, stopAfterFullCycle]);
  
  const timerRef = useRef<number | null>(null);
  
  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  
  // Show initial text with a pop-in animation
  useEffect(() => {
    if (firstText && !isInitialTextVisible) {
      // Add a small delay before showing the initial text
      timerRef.current = window.setTimeout(() => {
        setDisplayText(firstText);
        setCharIndex(firstText.length);
        setIsInitialTextVisible(true);
        
        // Start the typing animation after initialDelay
        if (texts.length > 0 && !hasStarted) {
          timerRef.current = window.setTimeout(() => {
            setHasStarted(true);
            
            // Start deleting character by character after the delay
            timerRef.current = window.setTimeout(() => {
              setIsTyping(false);
            }, delayBetweenTexts);
          }, initialDelay);
        }
      }, 300); // Small delay for initial text appearance
    }
  }, [texts, delayBetweenTexts, initialDelay, hasStarted, firstText, isInitialTextVisible]);
  
  // Handle the typing/deleting animation
  useEffect(() => {
    if (!texts.length || !hasStarted || isComplete) return;
    
    // Clear existing timer
    if (timerRef.current) clearTimeout(timerRef.current);
    
    const currentTexts = textsWithFinalText.current;
    
    if (isTyping) {
      // Typing animation
      if (charIndex < currentTexts[textIndex].length) {
        timerRef.current = window.setTimeout(() => {
          setDisplayText(currentTexts[textIndex].substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        // Finished typing a word, pause before deleting
        timerRef.current = window.setTimeout(() => {
          // If we should stop after cycle and we've completed one cycle
          if (stopAfterFullCycle && cycleCount >= 1) {
            // Set the final text (initial text) and mark as complete
            setDisplayText(initialText || texts[0]);
            setIsComplete(true);
          } else {
            setIsTyping(false);
          }
        }, delayBetweenTexts);
      }
    } else {
      // Deleting animation - For the first deletion after initial display, use firstText
      const textToDelete = cycleCount === 0 && textIndex === 0 ? firstText : currentTexts[textIndex];
      
      if (charIndex > 0) {
        timerRef.current = window.setTimeout(() => {
          setDisplayText(textToDelete.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next word
        const nextIndex = (textIndex + 1) % currentTexts.length;
        
        // If we've reached the start again, increment the cycle count
        if (nextIndex === 0) {
          setCycleCount(prev => prev + 1);
        }
        
        setTextIndex(nextIndex);
        setIsTyping(true);
      }
    }
  }, [texts, textIndex, charIndex, isTyping, typingSpeed, deletingSpeed, delayBetweenTexts, hasStarted, stopAfterFullCycle, cycleCount, isComplete, initialText]);
  
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isInitialTextVisible ? 1 : 0,
        scale: isInitialTextVisible ? 1 : 0.9,
      }}
      transition={{ duration: 0.4, type: "spring" }}
      className={className} 
      sx={{ 
        display: 'inline-block',
        position: 'relative',
        minWidth: '10ch',
        '&::after': {
          content: hasStarted && !isComplete ? '"|"' : '""',
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