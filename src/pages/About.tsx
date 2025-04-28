import { Box, Typography, Paper, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import PsychologyIcon from '@mui/icons-material/Psychology';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';

export const About = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        // height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 4,
        // background: `linear-gradient(145deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%', maxWidth: '1200px' }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Character Profile Section */}
          <Paper
            elevation={3}
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 30%' },
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: '16px',
            }}
          >
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                bgcolor: theme.palette.primary.light,
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PsychologyIcon sx={{ fontSize: 80, color: theme.palette.primary.main }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                color: theme.palette.primary.main,
                mb: 2,
                textAlign: 'center',
              }}
            >
              Your Name
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.secondary.main,
                mb: 2,
                textAlign: 'center',
              }}
            >
              Full Stack Developer
            </Typography>
          </Paper>

          {/* Stats and Info Section */}
          <Paper
            elevation={3}
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 70%' },
              p: 3,
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              border: `2px solid ${theme.palette.secondary.main}`,
              borderRadius: '16px',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box
                  sx={{
                    flex: '1 1 calc(25% - 16px)',
                    minWidth: '120px',
                    p: 2,
                    textAlign: 'center',
                    border: `1px solid ${theme.palette.accent1.main}`,
                    borderRadius: '8px',
                  }}
                >
                  <Typography variant="h6" color={theme.palette.accent1.main}>
                    5+
                  </Typography>
                  <Typography variant="body2">Years Exp</Typography>
                </Box>
                <Box
                  sx={{
                    flex: '1 1 calc(25% - 16px)',
                    minWidth: '120px',
                    p: 2,
                    textAlign: 'center',
                    border: `1px solid ${theme.palette.accent2.main}`,
                    borderRadius: '8px',
                  }}
                >
                  <Typography variant="h6" color={theme.palette.accent2.main}>
                    50+
                  </Typography>
                  <Typography variant="body2">Projects</Typography>
                </Box>
                <Box
                  sx={{
                    flex: '1 1 calc(25% - 16px)',
                    minWidth: '120px',
                    p: 2,
                    textAlign: 'center',
                    border: `1px solid ${theme.palette.accent3.main}`,
                    borderRadius: '8px',
                  }}
                >
                  <Typography variant="h6" color={theme.palette.accent3.main}>
                    10+
                  </Typography>
                  <Typography variant="body2">Technologies</Typography>
                </Box>
                <Box
                  sx={{
                    flex: '1 1 calc(25% - 16px)',
                    minWidth: '120px',
                    p: 2,
                    textAlign: 'center',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                  }}
                >
                  <Typography variant="h6" color={theme.palette.primary.main}>
                    100%
                  </Typography>
                  <Typography variant="body2">Passion</Typography>
                </Box>
              </Box>
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              Passionate Full Stack Developer with expertise in modern web technologies.
              Specializing in creating efficient, scalable, and user-friendly applications.
              Always eager to learn and implement new technologies to solve complex problems.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <CodeIcon sx={{ fontSize: 40, color: theme.palette.accent1.main }} />
              <BuildIcon sx={{ fontSize: 40, color: theme.palette.accent2.main }} />
              <SchoolIcon sx={{ fontSize: 40, color: theme.palette.accent3.main }} />
            </Box>
          </Paper>
        </Box>
      </motion.div>
    </Box>
  );
}; 