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
          maxWidth: { xs: '95%', sm: '60%', md: '50%' }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlowingText 
            text="Hi there!"
            variant="h2"
            color="#ffffff"
            glowColor={theme.palette.secondary.main}
            glowIntensity={12}
            sx={{ 
              fontSize: { xs: '1.7rem', sm: '2rem', md: '2.3rem' },
              letterSpacing: '0.05em',
              textAlign: { xs: 'center', sm: 'left' }
            }}
          />
        </motion.div>
        
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{
            mt: 2,
            whiteSpace: 'nowrap',
            overflow: 'visible'
          }}
        >
          <Typography
            variant="h1"
            component="span"
            sx={{
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
              textAlign: { xs: 'center', sm: 'left' },
              letterSpacing: '0.02em',
              textShadow: `0 0 10px ${theme.palette.primary.main}60`,
              display: 'block'
            }}
          >
            <Box component="span" sx={{ color: '#9c27b0', textShadow: '0 0 8px rgba(156, 39, 176, 0.6)' }}>I am</Box>{' '}
            <Box component="span" sx={{ color: theme.palette.primary.main }}>Hector Saenz</Box>
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{
            mt: 2,
            mb: 3,
            whiteSpace: 'nowrap',
            overflow: 'visible'
          }}
        >
          <Typography
            variant="h3"
            component="span"
            sx={{
              color: '#66bb6a', // More vibrant Material UI green
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.3rem' },
              textAlign: { xs: 'center', sm: 'left' },
              textShadow: '0 0 10px rgba(102, 187, 106, 0.7)',
              display: 'block',
              letterSpacing: '0.03em',
              fontWeight: 400
            }}
          >
            Full Stack Developer
          </Typography>
        </Box>

        <Typography
          variant="h5"
          component={motion.h5}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: '600px',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          Crafting digital experiences with clean code and creative solutions
        </Typography>
      </Box>

      {/* Main Container */}
      <Box 
        sx={{ 
          minHeight: '100vh',
          pt: { xs: 20, md: 0 },
          pb: { xs: 12, md: 10 },
          position: 'relative',
        }}
      >
        {/* Terminal Container - Positioned to the right and vertically centered */}
        <Box 
          sx={{ 
            position: 'fixed',
            right: { xs: 20, sm: 30, md: 50 },
            top: '50%',
            transform: 'translateY(-50%)',
            width: { xs: '350px', sm: '400px', md: '450px' },
            height: { xs: '450px', sm: '500px', md: '550px' },
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Terminal with Glowing Border and Floating Animation */}
          <motion.div
            animate={{ 
              y: [0, -10, 0], 
              x: [0, 5, 0, -5, 0],
              rotateZ: [0, 0.7, 0, -0.7, 0] 
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              repeatType: "loop",
              ease: "easeInOut"
            }}
            style={{
              width: '100%',
              height: '100%',
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
                filter: `blur(18px)`,
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
      </Box>

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