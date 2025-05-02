import { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Stack, 
  IconButton, 
  Collapse, 
  useTheme, 
  alpha
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { GlowingText } from './GlowingText';

interface ProjectSkill {
  name: string;
  level: number; // 1-10 scale for pixel filling
}

export interface ProjectData {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl?: string;
  technologies: string[];
  skills: ProjectSkill[];
  learnings: string[];
  githubUrl?: string;
  liveUrl?: string;
  year: string;
}

interface RetroProjectCardProps {
  project: ProjectData;
}

export const RetroProjectCard = ({ project }: RetroProjectCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  // Create pixelated skill meter
  const SkillMeter = ({ skill }: { skill: ProjectSkill }) => {
    return (
      <Box sx={{ mb: 1 }}>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          {skill.name}
        </Typography>
        <Box 
          sx={{
            display: 'flex',
            gap: '2px',
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <Box 
              key={i}
              sx={{
                width: '12px',
                height: '12px',
                backgroundColor: i < skill.level 
                  ? theme.palette.secondary.main 
                  : alpha(theme.palette.secondary.main, 0.2),
                border: `1px solid ${theme.palette.secondary.dark}`,
              }}
            />
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'visible',
        mb: 4,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: '8px',
        boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.7)}`,
        },
        background: `linear-gradient(135deg, 
                     ${alpha(theme.palette.background.paper, 0.9)}, 
                     ${alpha(theme.palette.background.default, 0.7)})`,
        backdropFilter: 'blur(5px)',
      }}
    >
      {/* Project Year Badge */}
      <Box 
        sx={{
          position: 'absolute',
          top: '-10px',
          right: '20px',
          backgroundColor: theme.palette.accent1.main,
          color: theme.palette.background.paper,
          fontFamily: '"Press Start 2P", cursive',
          fontSize: '0.7rem',
          padding: '4px 8px',
          borderRadius: '4px',
          border: `2px solid ${theme.palette.background.paper}`,
          zIndex: 1,
        }}
      >
        {project.year}
      </Box>
      
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <GlowingText 
            text={project.title}
            variant="h4" 
            color={theme.palette.primary.main}
            sx={{ 
              fontFamily: '"Press Start 2P", cursive', 
              fontSize: '1.4rem',
              mb: 1 
            }}
          />
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            {project.shortDescription}
          </Typography>
          
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {project.technologies.map((tech, index) => (
              <Chip 
                key={index} 
                label={tech} 
                size="small"
                sx={{
                  backgroundColor: theme.palette.accent2.main,
                  color: theme.palette.background.paper,
                  fontWeight: 'bold',
                  border: `1px solid ${theme.palette.accent2.dark}`,
                }}
              />
            ))}
          </Stack>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {project.githubUrl && (
              <IconButton 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ 
                  color: theme.palette.text.primary,
                  border: `2px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <GitHubIcon />
              </IconButton>
            )}
            
            {project.liveUrl && (
              <IconButton 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ 
                  color: theme.palette.text.primary,
                  border: `2px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <LaunchIcon />
              </IconButton>
            )}
          </Box>
          
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
              border: `2px solid ${theme.palette.primary.main}`,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ pt: 3, pb: 1, borderTop: `2px dashed ${alpha(theme.palette.primary.main, 0.5)}`, mt: 2 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ 
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '0.9rem',
                mb: 1,
                color: theme.palette.secondary.main
              }}>
                PROJECT DETAILS
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {project.fullDescription}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ 
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '0.9rem',
                mb: 1,
                color: theme.palette.secondary.main
              }}>
                SKILLS GAINED
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                {project.skills.map((skill, index) => (
                  <SkillMeter key={index} skill={skill} />
                ))}
              </Box>
            </Box>
            
            <Box>
              <Typography variant="h6" sx={{ 
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '0.9rem',
                mb: 1,
                color: theme.palette.secondary.main
              }}>
                LEARNINGS
              </Typography>
              <Box sx={{ 
                pl: 2,
                borderLeft: `4px solid ${alpha(theme.palette.accent3.main, 0.5)}`
              }}>
                {project.learnings.map((learning, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                    <Box 
                      component="span" 
                      sx={{ 
                        display: 'inline-block',
                        width: '8px', 
                        height: '8px', 
                        backgroundColor: theme.palette.accent3.main,
                        mr: 1
                      }} 
                    />
                    {learning}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}; 