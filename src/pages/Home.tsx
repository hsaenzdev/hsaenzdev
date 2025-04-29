import { Box, Typography, Stack, useTheme, Container } from "@mui/material";
import { motion } from "framer-motion";
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { GlowingText } from "../components/GlowingText";
import { RetroTerminal } from "../components/RetroTerminal";

export const Home = () => {
  const theme = useTheme();
  
  // Skills for the typing effect
  const skills = [
    "Full Stack Developer",
    "React Specialist",
    "TypeScript Expert",
    "Game Enthusiast",
    "Problem Solver",
    "UI/UX Designer",
    "ThreeJS Developer"
  ];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        pt: { xs: 8, md: 6 },
        pb: 4,
        overflow: 'hidden', // Prevent any potential overflow
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
        {/* Top Section - Greeting text moved to top left */}
        <Box sx={{ mb: 6, pl: { xs: 0, md: 1 }, alignSelf: { xs: 'center', md: 'flex-start' }, width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GlowingText 
              text="Hi there!"
              variant="h1"
              color="#ffffff"
              glowColor={theme.palette.secondary.main}
              glowIntensity={12}
              sx={{ 
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                letterSpacing: '0.05em',
                textAlign: { xs: 'center', md: 'left' }
              }}
            />
          </motion.div>
          
          <Typography
            variant="h2"
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              color: theme.palette.primary.main,
              mb: 2,
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            I am Hector Saenz
          </Typography>

          <Typography
            variant="h5"
            component={motion.h5}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            sx={{
              color: theme.palette.text.secondary,
              mb: 0,
              maxWidth: '600px',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              mx: { xs: 'auto', md: 0 },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            Crafting digital experiences with clean code and creative solutions
          </Typography>
        </Box>

        {/* Main Content Area - Centered Terminal */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Terminal with Glowing Border and Floating Animation */}
          <motion.div
            animate={{ 
              y: [0, -8, 0], 
              x: [0, 5, 0, -5, 0],
              rotateZ: [0, 0.5, 0, -0.5, 0] 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              repeatType: "loop",
              ease: "easeInOut"
            }}
            style={{
              width: '100%',
              maxWidth: '600px',
              height: '400px',
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
                filter: `blur(15px)`,
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
                // Add subtle scanlines effect
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
              <RetroTerminal texts={skills} />
            </Box>
          </motion.div>
        </Box>
        
        {/* Tech Icons at bottom center */}
        <Stack
          direction="row"
          spacing={{ xs: 3, sm: 4, md: 5 }}
          justifyContent="center"
          sx={{ 
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            px: 2,
            py: 1,
            borderRadius: 2,
            backgroundColor: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(5px)',
            width: 'auto',
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CodeIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.accent1.main }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: '#fff' }}>Frontend</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StorageIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.accent2.main }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: '#fff' }}>Backend</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WebIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.accent3.main }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: '#fff' }}>Web</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PsychologyIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.primary.main }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: '#fff' }}>AI/ML</Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}; 