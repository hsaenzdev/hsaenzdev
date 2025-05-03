import { Box, useTheme, Typography, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, memo, useMemo, useRef } from 'react';
import resumePdf from '../assets/hsaenzresume.pdf';

interface RetroTerminalProps {
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

// Cursor component with blinking animation
const Cursor = memo(() => {
  const theme = useTheme();
  
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
      style={{ 
        display: 'inline-block',
        width: '8px',
        height: '16px',
        backgroundColor: theme.palette.primary.main,
        marginLeft: '2px'
      }}
    />
  );
});

// Typing animation for commands
const TypedLine = ({ text, duration = 1.5, onComplete }: { text: string; duration?: number; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    let currentIndex = 0;
    const charTime = duration * 1000 / text.length;
    
    intervalRef.current = window.setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex));
        currentIndex++;
        
        if (currentIndex > text.length && onComplete) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(onComplete, 300);
        }
      }
    }, charTime);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, duration, onComplete]);
  
  return <>{displayedText}</>;
};

// ASCII art components
const AsciiLogo = memo(() => {
  const theme = useTheme();
  
  return (
    <Box sx={{ fontFamily: 'monospace', fontSize: '0.85rem', mb: 2, color: theme.palette.primary.main, lineHeight: 1.2 }}>
      <pre style={{ margin: 0 }}>{`
 ██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
 ██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
 ██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
 ██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
 ╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
  ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
      `}</pre>
    </Box>
  );
});

// Matrix-like raining code effect for background
const MatrixRain = memo(() => {
  const theme = useTheme();
  const characters = useMemo(() => 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ', []);
  const [columns, setColumns] = useState<string[]>([]);
  
  useEffect(() => {
    // Create 20 columns of random characters
    const newColumns = [];
    for (let i = 0; i < 20; i++) {
      let column = '';
      const length = 5 + Math.floor(Math.random() * 10);
      for (let j = 0; j < length; j++) {
        column += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      newColumns.push(column);
    }
    setColumns(newColumns);
    
    // Update the matrix rain periodically
    const interval = setInterval(() => {
      setColumns(prev => 
        prev.map(column => {
          // Shift characters and add a new one at the beginning
          const newChar = characters.charAt(Math.floor(Math.random() * characters.length));
          return newChar + column.substring(0, column.length - 1);
        })
      );
    }, 300);
    
    return () => clearInterval(interval);
  }, [characters]);
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        opacity: 0.07,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
        {columns.map((column, i) => (
          <Box key={i} sx={{ display: 'flex', flexDirection: 'column', color: theme.palette.primary.main, fontSize: '10px' }}>
            {column.split('').map((char, j) => (
              <Box 
                key={`${i}-${j}`} 
                component="span" 
                sx={{ 
                  opacity: j === 0 ? 1 : 1 - (j / column.length),
                }}
              >
                {char}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
});

// Interactive Terminal Component
export const RetroTerminal = ({
  terminalTitle = 'portfolio.exe'
}: RetroTerminalProps) => {
  const theme = useTheme();
  const [currentState, setCurrentState] = useState<'intro' | 'menu'>('intro');
  const [introComplete, setIntroComplete] = useState(false);
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [showCursor] = useState(true);
  const outputRef = useRef<HTMLDivElement>(null);
  
  // Available commands
  const commands = useMemo(() => ({
    help: "Display available commands",
    skills: "View my technical skills",
    clear: "Clear the terminal",
    contact: "Get my contact information",
    projects: "View my recent projects",
    github: "Visit my GitHub profile",
    resume: "Download my resume",
    exit: "Close the terminal (not really)"
  }), []);
  
  // Auto-scroll effect whenever content changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [currentState, commandHistory]);
  
  // Handle the intro sequence
  useEffect(() => {
    if (currentState === 'intro') {
      const timer = setTimeout(() => {
        setIntroComplete(true);
        setCurrentState('menu');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [currentState]);
  
  // Handle key presses for terminal input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentState !== 'menu') return;
      
      // Check if the event is already handled elsewhere (e.g. by the game)
      if (e.defaultPrevented) return;
      
      if (e.key === 'Enter') {
        // Process command
        processCommand(command);
        // Add to history and reset
        if (command.trim()) {
          setCommandHistory(prev => [...prev, command]);
        }
        setCommand('');
        setCommandIndex(-1);
      } else if (e.key === 'Backspace') {
        setCommand(prev => prev.slice(0, -1));
      } else if (e.key === 'ArrowUp') {
        // Only handle arrow keys if we're focused on the terminal
        const terminalFocused = document.activeElement?.closest('.terminal-container') !== null;
        
        if (terminalFocused) {
          e.preventDefault();
          // Navigate command history
          if (commandHistory.length > 0 && commandIndex < commandHistory.length - 1) {
            const newIndex = commandIndex + 1;
            setCommandIndex(newIndex);
            setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
          }
        }
      } else if (e.key === 'ArrowDown') {
        // Only handle arrow keys if we're focused on the terminal
        const terminalFocused = document.activeElement?.closest('.terminal-container') !== null;
        
        if (terminalFocused) {
          e.preventDefault();
          // Navigate command history
          if (commandIndex > 0) {
            const newIndex = commandIndex - 1;
            setCommandIndex(newIndex);
            setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
          } else if (commandIndex === 0) {
            setCommandIndex(-1);
            setCommand('');
          }
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        // Auto-complete command
        const matchingCommands = Object.keys(commands).filter(cmd => cmd.startsWith(command));
        if (matchingCommands.length === 1) {
          setCommand(matchingCommands[0]);
        }
      } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // Add to command if it's a single character and not a control key
        setCommand(prev => prev + e.key);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [command, commandHistory, commandIndex, commands, currentState]);
  
  // Process command input
  const processCommand = (cmd: string) => {
    const cleanedCmd = cmd.trim().toLowerCase();
    
    switch (cleanedCmd) {
      case 'skills':
        setCommandHistory(prev => [...prev, "> Skills:"]);
        setCommandHistory(prev => [...prev, "> Front-End:"]);
        setCommandHistory(prev => [...prev, ">   • React"]);
        setCommandHistory(prev => [...prev, ">   • Material UI"]);
        setCommandHistory(prev => [...prev, ">   • Vue.js"]);
        setCommandHistory(prev => [...prev, ">   • GraphQL"]);
        setCommandHistory(prev => [...prev, "> Back-End:"]);
        setCommandHistory(prev => [...prev, ">   • Node.js"]);
        setCommandHistory(prev => [...prev, ">   • Express.js"]);
        setCommandHistory(prev => [...prev, ">   • Phoenix (Elixir)"]);
        setCommandHistory(prev => [...prev, "> Languages:"]);
        setCommandHistory(prev => [...prev, ">   • JavaScript/TypeScript"]);
        setCommandHistory(prev => [...prev, ">   • Python"]);
        setCommandHistory(prev => [...prev, ">   • Elixir"]);
        setCommandHistory(prev => [...prev, ">   • PHP"]);
        setCommandHistory(prev => [...prev, ">   • C#"]);
        setCommandHistory(prev => [...prev, "> Databases:"]);
        setCommandHistory(prev => [...prev, ">   • PostgreSQL"]);
        setCommandHistory(prev => [...prev, ">   • Snowflake"]);
        setCommandHistory(prev => [...prev, ">   • ClickHouse"]);
        setCommandHistory(prev => [...prev, ">   • SQL/NoSQL"]);
        setCommandHistory(prev => [...prev, "> DevOps & Tools:"]);
        setCommandHistory(prev => [...prev, ">   • AWS"]);
        setCommandHistory(prev => [...prev, ">   • Docker"]);
        setCommandHistory(prev => [...prev, ">   • Git (GitLab CI/CD)"]);
        setCommandHistory(prev => [...prev, ">   • Linux"]);
        setCommandHistory(prev => [...prev, ">   • Jira"]);
        setCommandHistory(prev => [...prev, ">   • LaunchDarkly"]);
        break;
      case 'clear':
        // Clear the command history
        setCommandHistory([]);
        break;
      case 'contact':
        setCommandHistory(prev => [...prev, "> Email: contact@hectorsaenz.dev"]);
        setCommandHistory(prev => [...prev, "> LinkedIn: linkedin.com/in/hectorsaenz"]);
        break;
      case 'github':
        setCommandHistory(prev => [...prev, "> Opening GitHub profile..."]);
        window.open('https://github.com/hsaenzdev', '_blank');
        break;
      case 'projects':
        setCommandHistory(prev => [...prev, "> Personal Portfolio - A React-based portfolio with retro terminal aesthetics"]);
        setCommandHistory(prev => [...prev, "> Project Alpha - A full-stack e-commerce platform with real-time inventory"]);
        setCommandHistory(prev => [...prev, "> Data Visualizer - An interactive dashboard for complex data visualization"]);
        break;
      case 'resume':
        setCommandHistory(prev => [...prev, "> Downloading resume..."]);
        try {
          // Create a link element to trigger download
          const link = document.createElement('a');
          link.href = resumePdf;
          link.download = 'hsaenzresume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setCommandHistory(prev => [...prev, "> Download complete!"]);
        } catch (error) {
          console.error("Error downloading resume:", error);
          setCommandHistory(prev => [...prev, "> Error downloading resume. Please try again."]);
        }
        break;
      case 'exit':
        setCommandHistory(prev => [...prev, "> Nice try! You can't escape that easily 😊"]);
        break;
      case 'help':
        setCommandHistory(prev => [...prev, "> Available commands:"]);
        Object.entries(commands).forEach(([cmd, desc]) => {
          setCommandHistory(prev => [...prev, `>   ${cmd.padEnd(10)} - ${desc}`]);
        });
        break;
      case '':
        // Just add a new line for empty command
        break;
      default:
        setCommandHistory(prev => [...prev, `> Command not found: ${cleanedCmd}. Type 'help' for available commands.`]);
    }
  };
  
  // Current date for the terminal header
  const currentDate = useMemo(() => {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }, []);
  
  return (
    <Box 
      className="terminal-container"
      sx={{
        bgcolor: 'rgba(0, 0, 0, 0.9)',
        borderRadius: '8px',
        p: 1.5,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Matrix-like background effect */}
      <MatrixRain />
      
      {/* Terminal Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 1,
          pb: 1,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          zIndex: 1,
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
      <Box 
        ref={outputRef}
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'auto',
          position: 'relative',
          zIndex: 1,
          scrollBehavior: 'smooth',
          msOverflowStyle: 'none', // Hide scrollbar in IE/Edge
          scrollbarWidth: 'none', // Hide scrollbar in Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar in Chrome/Safari
          },
        }}
      >
        <AnimatePresence mode="wait">
          {currentState === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ color: theme.palette.accent3.main, my: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                <TypedLine 
                  text="// System initializing..." 
                  onComplete={() => {}}
                />
              </Box>
              <Box sx={{ my: 2 }}>
                <AsciiLogo />
              </Box>
              <Box sx={{ color: theme.palette.accent2.main, my: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                <TypedLine 
                  text="// Loading portfolio data..." 
                  duration={1.5}
                  onComplete={() => {}}
                />
              </Box>
              <Box sx={{ color: theme.palette.accent1.main, my: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                <TypedLine 
                  text="// Calibrating skills database..." 
                  duration={1.5}
                  onComplete={() => {}}
                />
              </Box>
              <Box sx={{ color: 'rgba(255,255,255,0.7)', my: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                <TypedLine 
                  text="// System ready. Welcome to my interactive portfolio!" 
                  duration={2}
                  onComplete={() => {}}
                />
              </Box>
            </motion.div>
          )}
          
          {currentState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {introComplete && (
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: theme.palette.accent3.main, 
                      fontSize: '0.8rem',
                      fontFamily: 'monospace',
                      display: 'block',
                      mb: 0.5
                    }}
                  >
                    // System loaded - {currentDate}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      fontSize: '0.8rem',
                      fontFamily: 'monospace',
                      display: 'block',
                      mb: 1
                    }}
                  >
                    Welcome to my interactive terminal. Type 'help' for available commands.
                  </Typography>
                </Box>
              )}
              
              {/* Command history output */}
              {commandHistory.map((line, i) => (
                <Typography 
                  key={i}
                  variant="caption" 
                  sx={{ 
                    color: line.startsWith('>') ? theme.palette.accent3.main : theme.palette.accent1.main,
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    display: 'block',
                    mb: 0.5,
                    wordBreak: 'break-word'
                  }}
                >
                  {line.startsWith('>') ? line : `$ ${line}`}
                </Typography>
              ))}
              
              {/* Command prompt */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: theme.palette.accent1.main,
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    mr: 0.5
                  }}
                >
                  $
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: theme.palette.accent2.main,
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    mr: 0.5
                  }}
                >
                  guest@hectorsaenz:~
                </Typography>
                <Typography 
                  variant="caption" 
                  component="span" 
                  sx={{ 
                    color: 'white',
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                  }}
                >
                  {command}
                </Typography>
                {showCursor && <Cursor />}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}; 