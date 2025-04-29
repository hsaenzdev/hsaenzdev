import { Box, Typography, Stack, Grid, useTheme } from "@mui/material";
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
        overflow: 'hidden',
      }}
    >
      {/* Top left greeting text */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: { xs: 32, md: 40 },
          left: { xs: 16, sm: 24, md: 40 },
          zIndex: 10,
          maxWidth: { xs: '100%', sm: '50%', md: '40%' }
        }}
      >
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
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              letterSpacing: '0.05em',
              textAlign: { xs: 'center', sm: 'left' }
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
            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
            textAlign: { xs: 'center', sm: 'left' },
            mt: 2
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
            maxWidth: '600px',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            textAlign: { xs: 'center', sm: 'left' },
            mt: 2
          }}
        >
          Crafting digital experiences with clean code and creative solutions
        </Typography>
      </Box>

      {/* Main Grid Container for layout */}
      <Grid 
        container
        sx={{ 
          minHeight: '100vh',
          pt: { xs: 20, md: 0 }, // Extra top padding on mobile to make space for the greeting text
          pb: { xs: 12, md: 10 }, // Space for skills at bottom
          px: { xs: 2, sm: 4, md: 6 }
        }}
      >
        {/* Terminal */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center',
            width: '100%',
            height: '100%',
            pt: { xs: 4, md: '20vh' } // Add top padding to push terminal down a bit
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
      </Grid>

      {/* Bottom Fixed Skills Bar - Position fixed to stay at bottom */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          pb: { xs: 2, md: 3 },
        }}
      >
        <Stack
          direction="row"
          spacing={{ xs: 4, sm: 5, md: 6 }}
          sx={{ 
            px: 3,
            py: 1.5,
            borderRadius: 2,
            backgroundColor: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Stack direction="column" alignItems="center">
            <CodeIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.accent1.main }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: '#fff' }}>Frontend</Typography>
          </Stack>
          <Stack direction="column" alignItems="center">
            <StorageIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.accent2.main }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: '#fff' }}>Backend</Typography>
          </Stack>
          <Stack direction="column" alignItems="center">
            <WebIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.accent3.main }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: '#fff' }}>Web</Typography>
          </Stack>
          <Stack direction="column" alignItems="center">
            <PsychologyIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.primary.main }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: '#fff' }}>AI/ML</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}; 