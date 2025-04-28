import { Box, Typography, Button, Stack, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import PsychologyIcon from '@mui/icons-material/Psychology';

export const Home = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 3,
        background: `linear-gradient(145deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            color: theme.palette.primary.main,
            mb: 2,
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
          }}
        >
          Your Name
        </Typography>
        
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            color: theme.palette.secondary.main,
            mb: 4,
            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
          }}
        >
          Full Stack Developer
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.secondary,
            mb: 6,
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          Crafting digital experiences with clean code and creative solutions
        </Typography>

        <Stack
          direction="row"
          spacing={4}
          justifyContent="center"
          sx={{ mb: 6 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CodeIcon sx={{ fontSize: 40, color: theme.palette.accent1.main }} />
            <Typography variant="body2">Frontend</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StorageIcon sx={{ fontSize: 40, color: theme.palette.accent2.main }} />
            <Typography variant="body2">Backend</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WebIcon sx={{ fontSize: 40, color: theme.palette.accent3.main }} />
            <Typography variant="body2">Web</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PsychologyIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            <Typography variant="body2">AI/ML</Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: theme.palette.primary.main,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          Explore My Work
        </Button>
      </motion.div>
    </Box>
  );
}; 