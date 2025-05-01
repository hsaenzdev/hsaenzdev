import { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  useTheme, 
  Button, 
  Chip,
  IconButton, 
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  Slide,
  SlideProps
} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { motion, AnimatePresence } from "framer-motion";
import { GlowingText } from "../components/GlowingText";
import { projects, projectTags } from "../config/projects";
import { sectionHeaderStyles } from "../config/theme";

// Arcade screen header with scanlines and CRT effect
const ArcadeScreenHeader = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ position: 'relative', mb: 5, overflow: 'hidden' }}>
      {/* CRT background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'radial-gradient(ellipse at center, rgba(0,30,30,0.4) 0%, rgba(0,0,0,0.9) 90%)',
          zIndex: -1,
          borderRadius: '8px',
          boxShadow: '0 0 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(0,0,0,0.9)'
        }}
      />
      
      {/* Scanlines overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          backgroundImage: 'linear-gradient(transparent 0%, rgba(50,50,50,0.15) 50%, transparent 51%, rgba(50,50,50,0.15) 100%)',
          backgroundSize: '100% 4px',
          pointerEvents: 'none',
        }}
      />
      
      {/* Header content */}
      <Box sx={{ py: 5, px: 3, textAlign: 'center', position: 'relative', zIndex: 0 }}>
        <GlowingText 
          text="PROJECTS GALLERY" 
          variant="h3"
          sx={{
            fontFamily: '"Press Start 2P", cursive',
            fontSize: { xs: '1.5rem', md: '2rem' },
            textShadow: `0 0 15px ${theme.palette.primary.main}`,
            mb: 2
          }}
          glowColor={theme.palette.primary.main}
        />
        
        <Typography 
          variant="body1" 
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '0.65rem',
            lineHeight: 1.8,
            textShadow: '0 0 5px rgba(150,150,255,0.5)',
            color: 'rgba(220,220,255,0.9)',
            px: 2
          }}
        >
          SELECT A PROJECT TO VIEW DETAILS
        </Typography>
        
        {/* Flickering effect */}
        <Box
          component={motion.div}
          animate={{ 
            opacity: [0.8, 0.9, 0.85, 0.95, 0.9],
            y: [0, -1, 1, -1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop"
          }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0)'
          }}
        />
      </Box>
    </Box>
  );
};

// Arcade cabinet style project card
const ArcadeProjectCard = ({ 
  project, 
  onClick,
  index
}: { 
  project: typeof projects[0];
  onClick: () => void;
  index: number;
}) => {
  const theme = useTheme();
  
  // Staggered animation entry
  const animationDelay = 0.1 * (index % 6);
  
  return (
    <Fade in timeout={1000} style={{ transitionDelay: `${animationDelay}s` }}>
      <Box
        sx={{
          p: 1,
          height: '100%'
        }}
      >
        <motion.div
          whileHover={{ 
            y: -10,
            scale: 1.03,
            transition: { duration: 0.3 }
          }}
          style={{ height: '100%' }}
        >
          <Paper
            onClick={onClick}
            elevation={8}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              border: '2px solid',
              borderColor: 'rgba(100,100,255,0.3)',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              bgcolor: 'rgba(20,20,40,0.9)',
              
              // Arcade screen inner shadow
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                boxShadow: 'inset 0 0 30px rgba(0,0,30,0.7)',
                pointerEvents: 'none',
                zIndex: 1
              },
              
              // Glow on hover
              '&:hover': {
                borderColor: theme.palette.primary.main,
                boxShadow: `0 0 20px ${theme.palette.primary.main}60, 0 10px 20px rgba(0,0,0,0.3)`,
                
                '& .projectTitle': {
                  color: theme.palette.primary.main,
                  textShadow: `0 0 8px ${theme.palette.primary.main}`
                }
              }
            }}
          >
            {/* Project image with CRT screen effect */}
            <Box sx={{ position: 'relative', pt: '70%' }}>
              {/* Image */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.1) brightness(0.9)'
                  }}
                />
                
                {/* Darkness vignette */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,20,0.6) 100%)',
                    zIndex: 1
                  }}
                />
                
                {/* Scanlines effect */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',
                    backgroundSize: '100% 4px',
                    opacity: 0.4,
                    zIndex: 2
                  }}
                />
                
                {/* Featured indicator */}
                {project.featured && (
                  <Box
                    component={motion.div}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 0,
                      bgcolor: 'rgba(255,215,0,0.9)',
                      color: '#000',
                      py: 0.5,
                      px: 1.5,
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: '0.5rem',
                      fontWeight: 'bold',
                      zIndex: 3,
                      clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                  >
                    FEATURED
                  </Box>
                )}
              </Box>
            </Box>
            
            {/* Project details */}
            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography 
                className="projectTitle"
                variant="h6" 
                sx={{ 
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.7rem',
                  mb: 1.5,
                  color: '#fff',
                  textShadow: '0 0 5px rgba(150,150,255,0.5)',
                  transition: 'all 0.3s ease',
                }}
              >
                {project.title}
              </Typography>
              
              {/* Tech tags */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
                {project.tech.slice(0, 3).map((tech, i) => {
                  const tagColor = projectTags.find(tag => tag.name === tech)?.color || theme.palette.primary.main;
                  return (
                    <Chip
                      key={i}
                      label={tech}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.5rem',
                        fontFamily: '"Press Start 2P", cursive',
                        backgroundColor: `${tagColor}40`,
                        color: tagColor,
                        '& .MuiChip-label': {
                          px: 1,
                        }
                      }}
                    />
                  );
                })}
                {project.tech.length > 3 && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'rgba(150,150,255,0.7)', 
                      fontSize: '0.5rem', 
                      alignSelf: 'center',
                      fontFamily: '"Press Start 2P", cursive',
                    }}
                  >
                    +{project.tech.length - 3}
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Fade>
  );
};

// Project detail modal with arcade aesthetic
const ProjectDetail = ({ 
  project, 
  open, 
  onClose 
}: { 
  project: typeof projects[0] | null;
  open: boolean;
  onClose: () => void;
}) => {
  const theme = useTheme();
  
  if (!project) return null;
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" } as SlideProps}
      PaperProps={{
        sx: {
          bgcolor: 'rgba(20,20,40,0.95)',
          backgroundImage: 'radial-gradient(ellipse at top, rgba(40,40,80,0.9) 0%, rgba(20,20,40,0.95) 60%)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 0 30px rgba(0,0,0,0.8)',
          border: `2px solid ${theme.palette.primary.main}60`,
        }
      }}
    >
      {/* Dialog header */}
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
          borderBottom: '1px solid rgba(100,100,255,0.2)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Press Start 2P", cursive',
            fontSize: { xs: '0.7rem', sm: '0.9rem' },
            color: '#fff',
            textShadow: `0 0 10px ${theme.palette.primary.main}`,
          }}
        >
          {project.title}
        </Typography>
        <IconButton
          edge="end"
          onClick={onClose}
          aria-label="close"
          sx={{
            color: 'rgba(150,150,255,0.7)',
            '&:hover': {
              color: '#fff'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      {/* Scanlines effect overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(rgba(50,50,100,0.03) 50%, rgba(0,0,0,0.1) 51%)',
          backgroundSize: '100% 4px',
          pointerEvents: 'none',
          zIndex: 10,
          opacity: 0.3
        }}
      />
      
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* Project image */}
          <Box sx={{ p: 3, width: { xs: '100%', md: '50%' } }}>
            <Box
              sx={{
                width: '100%',
                pt: '75%',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                border: '2px solid rgba(100,100,255,0.3)',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.05) brightness(0.95)'
                  }}
                />
                
                {/* Vignette overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,20,0.5) 100%)',
                    zIndex: 1
                  }}
                />
              </Box>
            </Box>
            
            {/* Tech used */}
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.6rem',
                  mb: 1.5,
                  color: 'rgba(150,150,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    backgroundColor: theme.palette.primary.main,
                    marginRight: '8px'
                  }
                }}
              >
                TECHNOLOGIES
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mb: 2 }}>
                {project.tech.map((tech, i) => {
                  const tagColor = projectTags.find(tag => tag.name === tech)?.color || theme.palette.primary.main;
                  return (
                    <Chip
                      key={i}
                      label={tech}
                      size="small"
                      sx={{
                        height: '22px',
                        backgroundColor: `${tagColor}30`,
                        color: tagColor,
                        fontFamily: '"Press Start 2P", cursive',
                        fontSize: '0.55rem',
                        '& .MuiChip-label': {
                          px: 1,
                        }
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
          
          {/* Project details */}
          <Box sx={{ p: 3, width: { xs: '100%', md: '50%' } }}>
            {/* Year indicator */}
            {project.year && (
              <Box 
                sx={{ 
                  display: 'inline-block',
                  px: 1.5, 
                  py: 0.5, 
                  mb: 2,
                  backgroundColor: 'rgba(100,100,255,0.15)',
                  borderRadius: '4px',
                  border: '1px solid rgba(100,100,255,0.3)',
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: '0.6rem',
                    color: 'rgba(150,150,255,0.9)',
                  }}
                >
                  {typeof project.year === 'string' ? project.year : `${project.year}`}
                </Typography>
              </Box>
            )}
            
            {/* Description */}
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3, 
                color: 'rgba(220,220,255,0.9)',
                fontFamily: 'Roboto, sans-serif',
                lineHeight: 1.7
              }}
            >
              {project.longDescription || project.description}
            </Typography>
            
            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: '0.6rem',
                    mb: 1.5,
                    color: 'rgba(150,150,255,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    '&::before': {
                      content: '""',
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      backgroundColor: theme.palette.primary.main,
                      marginRight: '8px'
                    }
                  }}
                >
                  KEY ACHIEVEMENTS
                </Typography>
                
                <Box sx={{ ml: 1 }}>
                  {project.achievements?.map((achievement, i) => (
                    <Box 
                      key={i} 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        mb: 1.5,
                        position: 'relative',
                      }}
                    >
                      <LightbulbIcon 
                        sx={{ 
                          fontSize: 18, 
                          mr: 1.5, 
                          color: theme.palette.primary.main,
                          mt: 0.3
                        }} 
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(220,220,255,0.9)',
                          fontFamily: 'Roboto, sans-serif',
                        }}
                      >
                        {achievement}
                      </Typography>
                      
                      {/* Connector line */}
                      {project.achievements && i < project.achievements.length - 1 && (
                        <Box 
                          sx={{ 
                            position: 'absolute',
                            left: 9,
                            top: 25,
                            bottom: -14,
                            width: 1,
                            bgcolor: 'rgba(100,100,255,0.3)',
                          }} 
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            
            {/* Links */}
            {(project.github || project.demo) && (
              <Box sx={{ display: 'flex', gap: 2, mt: 3, position: 'relative' }}>
                {project.github && (
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: '0.55rem',
                      py: 1,
                      borderColor: 'rgba(100,100,255,0.5)',
                      color: 'rgba(150,150,255,0.9)',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: 'rgba(100,100,255,0.1)',
                      }
                    }}
                  >
                    Code
                  </Button>
                )}
                
                {project.demo && (
                  <Button
                    variant="contained"
                    startIcon={<LaunchIcon />}
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: '0.55rem',
                      py: 1,
                      backgroundColor: theme.palette.primary.main,
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      }
                    }}
                  >
                    Live Demo
                  </Button>
                )}
                
                {/* Decorative circuit lines */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    left: -30,
                    right: -30,
                    height: 1,
                    bgcolor: 'rgba(100,100,255,0.3)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    left: -30,
                    width: 1,
                    height: 20,
                    bgcolor: 'rgba(100,100,255,0.3)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: 40,
                    width: 1,
                    height: 20,
                    bgcolor: 'rgba(100,100,255,0.3)',
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// Main Projects component
export const Projects = () => {
  const theme = useTheme();
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  
  // Filter projects based on selected tag
  const filteredProjects = selectedTag !== "All"
    ? projects.filter(project => project.tech.includes(selectedTag))
    : projects;
  
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };
  
  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setDetailOpen(true);
  };
  
  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
        position: 'relative',
        minHeight: 'calc(100vh - 80px)',
        backgroundImage: 'radial-gradient(circle at center, rgba(30,30,60,0.5) 0%, rgba(10,10,20,0.5) 100%)',
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* Arcade screen header */}
      <ArcadeScreenHeader />
      
      {/* Filter tags */}
      <Box 
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          mb: 4,
          justifyContent: 'center',
          p: 2,
          borderRadius: '8px',
          backgroundColor: 'rgba(20,20,40,0.7)',
          boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
          border: '1px solid rgba(100,100,255,0.2)',
        }}
      >
        {projectTags.map((tag, index) => (
          <Button
            key={index}
            variant={selectedTag === tag.name ? "contained" : "outlined"}
            size="small"
            sx={{
              minWidth: 'unset',
              px: 1.5,
              py: 0.5,
              borderColor: `${tag.color}90`,
              bgcolor: selectedTag === tag.name ? tag.color : 'transparent',
              color: selectedTag === tag.name ? '#000' : tag.color,
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.55rem',
              '&:hover': {
                bgcolor: selectedTag === tag.name ? tag.color : `${tag.color}30`,
                borderColor: tag.color,
              },
            }}
            onClick={() => handleTagClick(tag.name)}
          >
            {tag.name}
          </Button>
        ))}
      </Box>
      
      {/* Projects grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { 
            xs: 'repeat(1, 1fr)', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)'
          },
          gap: 2,
          mb: 4,
        }}
      >
        {filteredProjects.map((project, index) => (
          <ArcadeProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </Box>
      
      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <Box 
          sx={{
            p: 4,
            textAlign: 'center',
            color: 'rgba(150,150,255,0.7)',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '0.7rem',
            backgroundColor: 'rgba(20,20,40,0.7)',
            borderRadius: '8px',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 0 15px rgba(0,0,0,0.3)',
            border: '1px solid rgba(100,100,255,0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            component={motion.div}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            NO PROJECTS FOUND WITH THIS TECHNOLOGY
            <br />
            PLEASE SELECT ANOTHER FILTER
          </Box>
          
          {/* Scanlines */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'linear-gradient(rgba(50,50,100,0.03) 50%, rgba(0,0,0,0.1) 51%)',
              backgroundSize: '100% 4px',
              pointerEvents: 'none',
              zIndex: 10,
              opacity: 0.3
            }}
          />
        </Box>
      )}
      
      {/* Project detail modal */}
      <ProjectDetail
        project={selectedProject}
        open={detailOpen}
        onClose={handleDetailClose}
      />
    </Box>
  );
}; 