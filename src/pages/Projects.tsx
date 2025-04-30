import { Box, Typography, Paper, useTheme, Button, IconButton, Tooltip } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";
import { motion } from "framer-motion";
import { GlowingText } from "../components/GlowingText";

export const Projects = () => {
  const theme = useTheme();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const allTags = [
    { name: "All", color: theme.palette.primary.main },
    { name: "React", color: theme.palette.accent1.main },
    { name: "TypeScript", color: theme.palette.accent2.main },
    { name: "Node.js", color: theme.palette.accent3.main },
    { name: "AWS", color: theme.palette.secondary.main },
  ];
  
  const projects = [
    {
      title: "Document Management System",
      description: "A comprehensive document management platform with secure cloud storage, file classification, and version control.",
      tech: ["React", "Node.js", "AWS", "MongoDB"],
      github: "#",
      demo: "#",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='225' viewBox='0 0 288 225'%3E%3Crect fill='%23FF3366' width='288' height='225'/%3E%3Ctext fill='%23FFFFFF' font-family='sans-serif' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EDocument System%3C/text%3E%3C/svg%3E",
      difficulty: 5
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive analytics dashboard that transforms complex data into insightful visualizations and actionable insights.",
      tech: ["React", "TypeScript", "amCharts", "Material UI"],
      github: "#",
      demo: "#",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='225' viewBox='0 0 288 225'%3E%3Crect fill='%234DFFDB' width='288' height='225'/%3E%3Ctext fill='%23000000' font-family='sans-serif' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EData Dashboard%3C/text%3E%3C/svg%3E",
      difficulty: 4
    },
    {
      title: "Feature Flag Service",
      description: "A microservice for implementing feature flags, allowing controlled feature rollout and A/B testing capabilities.",
      tech: ["Node.js", "AWS", "GraphQL", "React"],
      github: "#",
      demo: "#",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='225' viewBox='0 0 288 225'%3E%3Crect fill='%239B5DE5' width='288' height='225'/%3E%3Ctext fill='%23FFFFFF' font-family='sans-serif' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EFeature Flags%3C/text%3E%3C/svg%3E",
      difficulty: 3
    },
    {
      title: "Retro Gaming Portfolio",
      description: "A personal portfolio website with retro gaming aesthetics, interactive elements, and 3D graphics.",
      tech: ["React", "TypeScript", "Three.js", "Material UI"],
      github: "#",
      demo: "#",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='225' viewBox='0 0 288 225'%3E%3Crect fill='%23FFD23F' width='288' height='225'/%3E%3Ctext fill='%23000000' font-family='sans-serif' font-size='24' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3ERetro Portfolio%3C/text%3E%3C/svg%3E",
      difficulty: 3
    },
  ];
  
  const filteredProjects = selectedTag && selectedTag !== "All" 
    ? projects.filter(project => project.tech.includes(selectedTag))
    : projects;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
        position: 'relative',
      }}
    >
      {/* Background game-themed grid */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          opacity: 0.03,
          backgroundImage: `linear-gradient(${theme.palette.primary.main}20 1px, transparent 1px), linear-gradient(90deg, ${theme.palette.primary.main}20 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
      
      <GlowingText 
        text="Project Library" 
        variant="h3"
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          color: theme.palette.primary.main,
          mb: 4,
          textAlign: 'center'
        }}
        glowColor={theme.palette.primary.main}
      />
      
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {allTags.map((tag, index) => (
          <Button
            key={index}
            variant={selectedTag === tag.name ? "contained" : "outlined"}
            sx={{
              minWidth: 'unset',
              px: 2,
              py: 0.5,
              borderColor: tag.color,
              bgcolor: selectedTag === tag.name ? tag.color : 'transparent',
              color: selectedTag === tag.name ? (tag.color === theme.palette.secondary.main || tag.color === theme.palette.accent3.main ? '#000' : '#fff') : tag.color,
              '&:hover': {
                bgcolor: selectedTag === tag.name ? tag.color : `${tag.color}20`,
                borderColor: tag.color,
              },
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            }}
            onClick={() => setSelectedTag(tag.name)}
          >
            {tag.name}
          </Button>
        ))}
      </Box>
      
      <Box 
        sx={{
          display: 'flex', 
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.2 }
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: { xs: '100%', sm: 'calc(50% - 32px)', md: '300px' },
                height: '380px',
                display: 'flex',
                flexDirection: 'column',
                border: `2px solid ${theme.palette.primary.main}`,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: theme.palette.primary.main,
                },
              }}
            >
              <Box
                sx={{
                  height: '160px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'rgba(0,0,0,0.6)',
                    borderRadius: '4px',
                    px: 1,
                    py: 0.5,
                  }}
                >
                  {[...Array(project.difficulty)].map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 14, color: theme.palette.accent1.main, mr: i < project.difficulty - 1 ? 0.5 : 0 }} />
                  ))}
                </Box>
              </Box>
              
              <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '0.9rem',
                    color: theme.palette.primary.main,
                    mb: 1.5,
                  }}
                >
                  {project.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    color: theme.palette.text.secondary,
                    flexGrow: 1,
                  }}
                >
                  {project.description}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ mb: 1, display: 'block', color: theme.palette.text.secondary }}>
                    Tech Stack:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.tech.map((tech, i) => (
                      <Box
                        key={i}
                        sx={{
                          px: 1,
                          py: 0.3,
                          bgcolor: theme.palette.primary.main + '20',
                          color: theme.palette.primary.main,
                          borderRadius: 1,
                          fontSize: '0.65rem',
                          border: `1px solid ${theme.palette.primary.main}40`,
                        }}
                      >
                        {tech}
                      </Box>
                    ))}
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Tooltip title="GitHub Repository">
                    <IconButton 
                      size="small"
                      href={project.github}
                      target="_blank"
                      sx={{ 
                        color: theme.palette.text.primary,
                        '&:hover': {
                          color: theme.palette.primary.main,
                          bgcolor: `${theme.palette.primary.main}20`,
                        }
                      }}
                    >
                      <GitHubIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Live Demo">
                    <IconButton 
                      size="small"
                      href={project.demo}
                      target="_blank"
                      sx={{ 
                        color: theme.palette.text.primary,
                        '&:hover': {
                          color: theme.palette.primary.main,
                          bgcolor: `${theme.palette.primary.main}20`,
                        }
                      }}
                    >
                      <LaunchIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
      
      <Box 
        sx={{ 
          mt: 4, 
          textAlign: 'center',
          p: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            display: 'inline-block',
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.7rem',
            color: theme.palette.secondary.main,
            border: `1px dashed ${theme.palette.secondary.main}`,
            borderRadius: 1,
            px: 2,
            py: 1,
          }}
        >
          More projects loading...
        </Typography>
      </Box>
    </Box>
  );
}; 