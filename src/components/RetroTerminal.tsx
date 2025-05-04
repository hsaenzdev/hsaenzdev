import { Box, useTheme, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, memo, useMemo, useRef } from 'react';
import resumePdf from '../assets/hsaenzresume.pdf';
import { useGameContext } from '../context/GameContext';

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
  const animationCompleteRef = useRef(false);
  const textRef = useRef(text);
  
  useEffect(() => {
    // Only reset and restart animation if the text actually changes
    if (textRef.current !== text) {
      setDisplayedText('');
      animationCompleteRef.current = false;
      textRef.current = text;
    }
    
    // If animation was already completed, don't restart
    if (animationCompleteRef.current) {
      return;
    }
    
    let currentIndex = displayedText.length || 0;
    const charTime = duration * 1000 / text.length;
    
    intervalRef.current = window.setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex));
        currentIndex++;
        
        if (currentIndex > text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          animationCompleteRef.current = true;
          if (onComplete) setTimeout(onComplete, 300);
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
  const { enableGame, isGameEnabled, gameState } = useGameContext();
  
  // Available commands organized by category
  const commandCategories = useMemo(() => {
    return {
      professional: {
        certifications: "List my certifications",
        contact: "Get my contact information",
        github: "Visit my GitHub profile",
        resume: "Download my resume",
        skills: "View my technical skills"
      },
      terminal: {
        clear: "Clear the terminal",
        exit: "Close the terminal (not really)",
        help: "Display available commands"
      },
      fun: {
        ascii: "Display random ASCII art",
        joke: "Tell a programmer joke",
        snake: "Play Snake game"
      }
    };
  }, []);

  // Flatten commands for use in command processing
  const commands = useMemo(() => {
    return {
      ...commandCategories.professional,
      ...commandCategories.terminal,
      ...commandCategories.fun
    };
  }, [commandCategories]);

  // List of programmer jokes
  const jokes = useMemo(() => [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
    "Why do Java developers wear glasses? Because they don't C#!",
    "What's the object-oriented way to become wealthy? Inheritance.",
    "Why did the developer go broke? Because he used up all his cache.",
    "Dev1: We should use a JavaScript framework. Dev2: I agree, which one? Dev1: *starts holy war*",
    "My code doesn't work, I have no idea why. My code works, I have no idea why.",
    "The best thing about a Boolean is even if you are wrong, you are only off by a bit.",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25.",
    "There are 10 kinds of people in this world: those who understand binary and those who don't.",
    "Programming is 10% writing code and 90% understanding why it's not working.",
    "A programmer puts two glasses on his bedside table before going to sleep. A full one, in case he gets thirsty, and an empty one, in case he doesn't.",
    "If at first you don't succeed, call it version 1.0.",
    "99 little bugs in the code, 99 little bugs, you take one down and patch it around, 125 little bugs in the code.",
    "I've got a really good UDP joke to tell you, but I don't know if you'll get it.",
    "What's the best thing about UDP jokes? I don't care if you get them.",
    "A programmer is heading out to the grocery store, so his wife tells him 'get a gallon of milk, and if they have eggs, get a dozen.' He returns with 13 gallons of milk.",
    "What do you call a programmer who vomits at IHOP? A stack overflow.",
    "What did the Java Code say to the C code? You've got no class.",
    "Why did the programmer quit their job? Because they didn't get arrays.",
    "Programmer: An organism that turns coffee into software.",
    "There's no place like 127.0.0.1.",
    "Why do programmers take so long in the shower? They read the directions on the shampoo bottle and follow them to the letter: Lather, rinse, and repeat.",
    "A user interface is like a joke. If you have to explain it, it means it's not good.",
    "What is the most used language in programming? Profanity.",
    "Real programmers count from 0.",
    "An optimist says: 'The Glass is Half-Full.' A pessimist says: 'The Glass is Half-Empty.' A programmer says: 'The Glass is Twice as Large as Necessary'.",
    "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
    "Software can be fast, reliable, and cheap. Choose any two."
  ], []);

  // ASCII art collection
  const asciiArt = useMemo(() => [
    `
    (\\(\\ 
    (-.-)
    o_(")(")
    `,
    `
       /\\_/\\  
      ( o.o ) 
       > ^ <
    `,
    `
      /\\_/\\
     (='.'=)
     (\")_(\")
    `,
    `
     _._     _,-'""\\"--._
    (,-.\\.-"" "// \\\\ "-.\\"-.
        \\\\ \\\\ \\/ \\/ \\\\ \\\\
         \\\\/ /\\\\ /\\\\ \\/ /
          / /  \\\\  \\\\ \\\\ \\
    `,
    `
     .-.
    (o.o)
     |=|
    __|__
    /||\\\\ 
    // \\\\
    `,
    `
        ,_,
       (o,o)
       {/)_)
        " "
    `
  ], []);
  
  // Auto-scroll effect whenever content changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [currentState, commandHistory]);
  
  // Handle the intro sequence
  useEffect(() => {
    if (currentState === 'intro') {
      // Use a ref to track if the animation has completed
      const hasCompleted = { current: false };
      
      const timer = setTimeout(() => {
        if (!hasCompleted.current) {
          hasCompleted.current = true;
          setIntroComplete(true);
          setCurrentState('menu');
        }
      }, 5000);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentState]);
  
  // Handle key presses for terminal input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Exit early if not in menu state or if event is already handled
      if (currentState !== 'menu' || e.defaultPrevented) {
        return;
      }
      
      // Check if we're handling arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        // Only handle arrow keys if we're focused on the terminal
        const terminalFocused = document.activeElement?.closest('.terminal-container') !== null;
        
        if (!terminalFocused) {
          return; // Let other components handle the arrow keys
        }
        
        e.preventDefault(); // Prevent default behavior for arrow keys in terminal
        
        if (e.key === 'ArrowUp') {
          // Navigate command history
          if (commandHistory.length > 0 && commandIndex < commandHistory.length - 1) {
            const newIndex = commandIndex + 1;
            setCommandIndex(newIndex);
            setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
          }
        } else if (e.key === 'ArrowDown') {
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
        return;
      }
      
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
    
    // Add an event listener to prevent the terminal from scrolling when using arrow keys
    const preventTerminalScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        // Check if we're focused on or inside the terminal
        const terminalElem = document.querySelector('.terminal-container');
        if (terminalElem && (terminalElem === document.activeElement || terminalElem.contains(document.activeElement))) {
          e.preventDefault();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', preventTerminalScroll, { capture: true });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', preventTerminalScroll, { capture: true });
    };
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
        setCommandHistory(prev => [...prev, "> Contact Information:"]);
        setCommandHistory(prev => [...prev, "> Location: Mexico (Nuevo Laredo)"]);
        setCommandHistory(prev => [...prev, "> Phone: +52 8677514055"]);
        setCommandHistory(prev => [...prev, "> Email: hectors.digital@gmail.com"]);
        setCommandHistory(prev => [...prev, "> LinkedIn: linkedin.com/in/saenzo"]);
        break;
      case 'github':
        setCommandHistory(prev => [...prev, "> Opening GitHub profile..."]);
        window.open('https://github.com/hsaenzdev', '_blank');
        break;
      case 'ascii':
        const randomAscii = asciiArt[Math.floor(Math.random() * asciiArt.length)];
        setCommandHistory(prev => [...prev, "> Random ASCII Art:"]);
        randomAscii.split('\n').forEach(line => {
          setCommandHistory(prev => [...prev, `> ${line}`]);
        });
        break;
      case 'joke':
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        setCommandHistory(prev => [...prev, `> ${randomJoke}`]);
        break;
      case 'snake':
        // Check if the player is actively playing based on gameState
        if (isGameEnabled && gameState === 'ACTIVE') {
          // Random funny responses when the game is already running
          const funnyResponses = [
            "> Hey! You're already playing! Keep your eyes on the snake! 🐍",
            "> Multi-snaking not supported yet. One snake at a time please! 🙄",
            "> ERROR: Snake.exe is already running... Just kidding, keep playing! 🎮",
            "> Look at the screen! Your snake is getting hungry while you type! 🍽️",
            "> Why are you typing when you could be eating particles? NOM NOM NOM 🟢",
            "> Dear user, your snake is feeling neglected. Please return to the game. 🥺"
          ];
          
          // Select a random funny response
          const randomResponse = funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
          setCommandHistory(prev => [...prev, randomResponse]);
        } else {
          // Enable the game if not already enabled
          enableGame();
          
          // Display fun messages about the snake game
          setCommandHistory(prev => [...prev, "> 🐍 Snake Game Activated! 🐍"]);
          setCommandHistory(prev => [...prev, "> Use arrow keys to control the snake"]);
          setCommandHistory(prev => [...prev, "> Eat the glowing particles to grow longer"]);
          setCommandHistory(prev => [...prev, "> Watch out for walls and don't bite yourself!"]);
          setCommandHistory(prev => [...prev, "> The score will appear at the top right of the screen"]);
          
          // Simulate pressing the right arrow key to immediately start the game
          setTimeout(() => {
            const keyEvent = new KeyboardEvent('keydown', {
              key: 'ArrowUp',
              code: 'ArrowUp',
              keyCode: 38,
              which: 38,
              bubbles: true,
              cancelable: true
            });
            window.dispatchEvent(keyEvent);
          }, 500); // Short delay to ensure game is enabled
        }
        break;
      case 'certifications':
        setCommandHistory(prev => [...prev, "> Certifications:"]);
        setCommandHistory(prev => [...prev, ">   • AWS Certified Cloud Practitioner"]);
        setCommandHistory(prev => [...prev, ">   • AWS Certified Developer - Associate"]);
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
        
        // Display professional commands
        setCommandHistory(prev => [...prev, "> "]);
        setCommandHistory(prev => [...prev, "> 📊 Professional:"]);
        Object.entries(commandCategories.professional)
          .sort(([cmdA], [cmdB]) => cmdA.localeCompare(cmdB))
          .forEach(([cmd, desc]) => {
            setCommandHistory(prev => [...prev, `>   ${cmd.padEnd(12)} - ${desc}`]);
          });
        
        // Display terminal commands
        setCommandHistory(prev => [...prev, "> "]);
        setCommandHistory(prev => [...prev, "> 🖥️ Terminal:"]);
        Object.entries(commandCategories.terminal)
          .sort(([cmdA], [cmdB]) => cmdA.localeCompare(cmdB))
          .forEach(([cmd, desc]) => {
            setCommandHistory(prev => [...prev, `>   ${cmd.padEnd(12)} - ${desc}`]);
          });
        
        // Display fun commands
        setCommandHistory(prev => [...prev, "> "]);
        setCommandHistory(prev => [...prev, "> 🎮 Fun:"]);
        Object.entries(commandCategories.fun)
          .sort(([cmdA], [cmdB]) => cmdA.localeCompare(cmdB))
          .forEach(([cmd, desc]) => {
            setCommandHistory(prev => [...prev, `>   ${cmd.padEnd(12)} - ${desc}`]);
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
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '8px',
        p: 1.5,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
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