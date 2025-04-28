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
        // height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 3,
        py: 4,
        // background: `linear-gradient(145deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        overflow: 'hidden', // Prevent any potential overflow
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: '100%',
          width: '100%',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            color: theme.palette.primary.main,
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          Your Name
        </Typography>
        
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            color: theme.palette.secondary.main,
            mb: 3,
            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
          }}
        >
          Full Stack Developer
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
            maxWidth: '800px',
            mx: 'auto',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
          }}
        >
          Crafting digital experiences with clean code and creative solutions
        </Typography>

        <Stack
          direction="row"
          spacing={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CodeIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.accent1.main }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>Frontend</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StorageIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.accent2.main }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>Backend</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WebIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.accent3.main }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>Web</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PsychologyIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.primary.main }} />
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>AI/ML</Typography>
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
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 1, sm: 1.5, md: 2 },
          }}
        >
          Explore My Work
        </Button>
      </motion.div>
    </Box>
  );
}; 