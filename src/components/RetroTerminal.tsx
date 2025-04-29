import { Box, useTheme, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { TypeWriter } from './TypeWriter';
import { useState, useEffect, memo, useMemo, useRef } from 'react';

interface RetroTerminalProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  terminalTitle?: string;
}

// Create a separate memoized component for the time display to prevent re-renders of the parent
const TerminalClock = memo(() => {
  const theme = useTheme();
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <Box
      sx={{
        fontSize: '0.7rem',
        color: theme.palette.accent1.main,
      }}
    >
      {time.toTimeString().substring(0, 8)}
    </Box>
  );
});

// Memoize the static content
const TerminalHistory = memo(({ date }: { date: string }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ mb: 2, opacity: 0.7 }}>
      <Typography component="div" variant="caption" sx={{ color: theme.palette.accent3.main, mb: 0.5, fontSize: '0.7rem' }}>
        // System loaded - {date}
      </Typography>
      <Typography component="div" variant="caption" sx={{ color: theme.palette.accent1.main, mb: 0.5, fontSize: '0.7rem' }}>
        $ initializing skills module
      </Typography>
      <Typography component="div" variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1, fontSize: '0.7rem' }}>
        &gt; Ready. Type 'list-skills' for commands
      </Typography>
    </Box>
  );
});

// Command line component with typing animation
const CommandLine = memo(({ onCommandComplete }: { onCommandComplete: () => void }) => {
  const theme = useTheme();
  const [showCommand, setShowCommand] = useState(true);
  const [commandText, setCommandText] = useState('');
  const commandRef = useRef<any>(null);
  
  useEffect(() => {
    // Simulate typing "list-skills" command
    const command = 'list-skills';
    let currentIndex = 0;
    
    const typeCommand = () => {
      if (currentIndex <= command.length) {
        setCommandText(command.substring(0, currentIndex));
        currentIndex++;
        commandRef.current = setTimeout(typeCommand, 100);
      } else {
        // Command completed, wait a bit then trigger callback
        commandRef.current = setTimeout(() => {
          setShowCommand(false);
          onCommandComplete();
        }, 500);
      }
    };
    
    // Start typing after a short delay
    commandRef.current = setTimeout(typeCommand, 1000);
    
    return () => {
      if (commandRef.current) {
        clearTimeout(commandRef.current);
      }
    };
  }, [onCommandComplete]);
  
  if (!showCommand) return null;
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, position: 'relative', zIndex: 2 }}>
      <Box sx={{ color: theme.palette.accent1.main, mr: 1, fontWeight: 'bold' }}>
        $
      </Box>
      <Box component="span" sx={{ color: theme.palette.accent2.main, mr: 1, fontSize: '0.8rem' }}>
        user@portfolio:~
      </Box>
      <Box 
        sx={{ 
          position: 'relative',
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
        {commandText}
      </Box>
    </Box>
  );
});

// Scrolling output that displays each skill one by one
const ScrollingOutput = memo(({ skills, isActive }: { skills: string[], isActive: boolean }) => {
  const theme = useTheme();
  const [displayedSkills, setDisplayedSkills] = useState<string[]>([]);
  const [commandActive, setCommandActive] = useState(true);
  const outputRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<any>(null);
  const skillIndexRef = useRef(0);
  
  // Auto-scroll effect whenever displayed skills change
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [displayedSkills]);
  
  useEffect(() => {
    if (!isActive || !skills.length) return;
    
    // Reset state when component activates
    skillIndexRef.current = 0;
    setCommandActive(true);
    
    // First, show the command result header
    setDisplayedSkills([
      '> Running list-skills...',
      '> Found ' + skills.length + ' skills:',
      ''
    ]);
    
    // Start displaying skills one by one
    const addSkill = () => {
      if (skillIndexRef.current < skills.length) {
        setDisplayedSkills(prev => [...prev, '- ' + skills[skillIndexRef.current]]);
        skillIndexRef.current++;
      } else {
        // When all skills are displayed, end the command
        setDisplayedSkills(prev => [
          ...prev, 
          '',
          '> Command completed.',
          '> Session ended.'
        ]);
        
        // Clear the interval to stop adding skills
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        
        // Set command as inactive
        setCommandActive(false);
        
        // Setup to restart the command after a pause
        setTimeout(() => {
          // Add a new prompt without clearing old content
          setDisplayedSkills(prev => [
            ...prev,
            '',
            '$ list-skills',
            '> Running list-skills...',
            '> Found ' + skills.length + ' skills:',
            ''
          ]);
          
          // Start displaying skills again after a short delay
          setTimeout(() => {
            skillIndexRef.current = 0;
            setCommandActive(true);
            intervalRef.current = setInterval(addSkill, 800);
          }, 500);
        }, 4000); // 4 second pause before restarting
      }
    };
    
    // Start adding skills after a delay
    setTimeout(() => {
      // Add a skill every 800ms
      intervalRef.current = setInterval(addSkill, 800);
    }, 500);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, skills]);
  
  if (!isActive) return null;
  
  return (
    <Box 
      ref={outputRef}
      sx={{ 
        height: '250px',
        width: '100%',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
        pointerEvents: 'none', // Disable manual scrolling
        msOverflowStyle: 'none', // Hide scrollbar in IE/Edge
        scrollbarWidth: 'none', // Hide scrollbar in Firefox
        '&::-webkit-scrollbar': {
          display: 'none', // Hide scrollbar in Chrome/Safari
        },
      }}
    >
      {displayedSkills.map((skill, index) => (
        <Typography 
          key={index}
          component="div"
          variant="caption" 
          sx={{ 
            color: skill.startsWith('$') 
              ? theme.palette.accent2.main
              : skill.startsWith('>') 
                ? theme.palette.accent3.main 
                : skill.startsWith('-') 
                  ? theme.palette.accent1.main 
                  : 'rgba(255,255,255,0.7)', 
            mb: 0.5, 
            fontSize: '0.75rem',
            fontFamily: 'monospace',
          }}
        >
          {skill}
        </Typography>
      ))}
      {/* Blinking cursor at the end - only show when command is active */}
      {commandActive && (
        <Box
          component={motion.div}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          sx={{ 
            height: '2px', 
            width: '8px', 
            backgroundColor: theme.palette.primary.main,
            mt: 1,
            ml: 2
          }}
        />
      )}
    </Box>
  );
});

export const RetroTerminal = ({
  texts,
  typingSpeed = 80,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
  terminalTitle = 'skills.exe'
}: RetroTerminalProps) => {
  const theme = useTheme();
  const [commandComplete, setCommandComplete] = useState(false);
  
  // Current date for the terminal header
  const currentDate = useMemo(() => {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }, []);
  
  const handleCommandComplete = () => {
    setCommandComplete(true);
  };
  
  return (
    <Box 
      sx={{
        bgcolor: 'rgba(0, 0, 0, 0.9)',
        borderRadius: '8px',
        p: 1.5,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Terminal Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 1,
          pb: 1,
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Traffic lights */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f57' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#febc2e' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#28c841' }} />
        </Box>
        
        {/* Terminal title */}
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.8rem',
            fontFamily: 'monospace',
          }}
        >
          {terminalTitle}
        </Typography>
        
        {/* Clock */}
        <TerminalClock />
      </Box>
      
      {/* Terminal Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '300px' }}>
        <TerminalHistory date={currentDate} />
        <CommandLine onCommandComplete={handleCommandComplete} />
        <ScrollingOutput skills={texts} isActive={commandComplete} />
      </Box>
    </Box>
  );
}; 