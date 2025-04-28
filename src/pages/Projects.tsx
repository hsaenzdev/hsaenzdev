import { Box, Typography, Paper, useTheme } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

export const Projects = () => {
  const theme = useTheme();
  
  const projects = [
    {
      title: "Portfolio Website",
      description: "A retro-game themed portfolio showcasing my skills and projects.",
      tech: ["React", "TypeScript", "Three.js", "MUI"],
      github: "#",
      demo: "#",
    },
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with payment integration.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "#",
      demo: "#",
    },
    {
      title: "Task Management App",
      description: "A productivity application for managing tasks and projects.",
      tech: ["React", "Redux", "Firebase"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          color: theme.palette.primary.main,
          mb: 4,
          textAlign: 'center'
        }}
      >
        Game Projects
      </Typography>
      
      <Box 
        sx={{
          display: 'flex', 
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        {projects.map((project, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              width: { xs: '100%', sm: 'calc(50% - 32px)', md: 'calc(33.33% - 32px)' },
              minWidth: '280px',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              border: `2px solid ${theme.palette.primary.main}`,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: '1rem',
                color: theme.palette.primary.main,
                mb: 2
              }}
            >
              {project.title}
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 2,
                flexGrow: 1
              }}
            >
              {project.description}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Tech Stack:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {project.tech.map((tech, i) => (
                  <Box
                    key={i}
                    sx={{
                      px: 1,
                      py: 0.5,
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      borderRadius: 1,
                      fontSize: '0.7rem'
                    }}
                  >
                    {tech}
                  </Box>
                ))}
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box 
                component="a"
                href={project.github}
                target="_blank"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.text.primary,
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.primary.main
                  }
                }}
              >
                <GitHubIcon sx={{ mr: 0.5 }} fontSize="small" />
                <Typography variant="body2">GitHub</Typography>
              </Box>
              
              <Box 
                component="a"
                href={project.demo}
                target="_blank"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.text.primary,
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.primary.main
                  }
                }}
              >
                <LaunchIcon sx={{ mr: 0.5 }} fontSize="small" />
                <Typography variant="body2">Live Demo</Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}; 