import { useState } from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  useTheme, 
  Divider, 
  Chip, 
  Collapse,
  Button,
  alpha
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion } from "framer-motion";
import { GlowingText } from "../components/GlowingText";
import { experienceItems, experienceTimeline, experienceLevelIcons, getExperienceLevelTitle } from "../config/experience";
import { sectionHeaderStyles, retroCardStyles } from "../config/theme";

// Component for a single experience item in the quest log
const QuestCard = ({ experience }: { experience: typeof experienceItems[0] }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const Icon = experience.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          mb: 4,
          overflow: 'hidden',
          border: `2px solid ${alpha(experience.color, 0.7)}`,
          borderRadius: 2,
          boxShadow: `0 0 15px ${alpha(experience.color, 0.3)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: `0 10px 20px ${alpha(theme.palette.common.black, 0.2)}, 0 0 15px ${alpha(experience.color, 0.5)}`,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: `linear-gradient(90deg, ${experience.color}, transparent)`,
          },
          background: `linear-gradient(135deg, 
                      ${alpha(theme.palette.background.paper, 0.7)}, 
                      ${alpha(theme.palette.background.default, 0.5)})`,
          backdropFilter: 'blur(5px)',
        }}
      >
        {/* Quest header */}
        <Box 
          sx={{ 
            p: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box 
              sx={{ 
                position: 'relative',
                mr: 2, 
                width: 56, 
                height: 56, 
                borderRadius: '12px', 
                bgcolor: alpha(experience.color, 0.9),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 15px ${alpha(experience.color, 0.6)}`,
              }}
            >
              <Icon sx={{ color: 'white', fontSize: 30 }} />
              
              {/* Level indicator */}
              {experience.level && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -8,
                    right: -8,
                    bgcolor: theme.palette.background.paper,
                    border: `2px solid ${experience.color}`,
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    boxShadow: `0 0 10px ${alpha(experience.color, 0.5)}`,
                  }}
                >
                  {experienceLevelIcons[experience.level as keyof typeof experienceLevelIcons]}
                </Box>
              )}
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: experience.color,
                  fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                  fontSize: '0.9rem',
                  mb: 0.5,
                  textShadow: `0 0 8px ${alpha(experience.color, 0.7)}`,
                }}
              >
                {experience.title}
              </Typography>
              
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                  color: theme.palette.text.secondary,
                  fontSize: '0.6rem',
                }}
              >
                {experience.company}
              </Typography>
            </Box>
            
            {/* Experience level title */}
            {experience.level && (
              <Chip
                label={getExperienceLevelTitle(experience.level)}
                size="small"
                sx={{
                  fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                  fontSize: '0.6rem',
                  bgcolor: alpha(experience.color, 0.2),
                  color: experience.color,
                  border: `1px solid ${alpha(experience.color, 0.5)}`,
                  height: 24,
                  ml: 1,
                  boxShadow: `0 0 8px ${alpha(experience.color, 0.3)}`,
                }}
              />
            )}
          </Box>
          
          {/* Quest duration */}
          <Box 
            sx={{ 
              display: 'inline-block',
              px: 1.5,
              py: 0.5,
              mb: 2,
              bgcolor: alpha(experience.color, 0.1),
              border: `1px solid ${alpha(experience.color, 0.3)}`,
              borderRadius: 1,
              boxShadow: `0 0 8px ${alpha(experience.color, 0.2)}`,
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif', 
                fontSize: '0.6rem',
                color: experience.color,
              }}
            >
              QUEST DURATION: {experience.period}
            </Typography>
          </Box>
          
          {/* Mission objectives toggle */}
          <Box 
            onClick={toggleExpand}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: experience.color,
              }
            }}
          >
            <Box 
              sx={{ 
                width: 24, 
                height: 24, 
                borderRadius: '4px', 
                bgcolor: expanded ? experience.color : alpha(experience.color, 0.4),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1,
                transition: 'all 0.3s ease',
                boxShadow: expanded ? `0 0 10px ${alpha(experience.color, 0.6)}` : 'none',
              }}
            >
              {expanded ? 
                <KeyboardArrowUpIcon sx={{ fontSize: 18, color: 'white' }} /> : 
                <KeyboardArrowDownIcon sx={{ fontSize: 18, color: 'white' }} />
              }
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: '0.6rem',
                color: expanded ? experience.color : theme.palette.text.primary,
                transition: 'color 0.3s ease',
                textShadow: expanded ? `0 0 5px ${alpha(experience.color, 0.5)}` : 'none',
              }}
            >
              {expanded ? 'HIDE QUEST DETAILS' : 'VIEW QUEST DETAILS'}
            </Typography>
          </Box>
        </Box>
        
        {/* Quest details */}
        <Collapse in={expanded}>
          <Divider sx={{ opacity: 0.6 }} />
          <Box 
            sx={{ 
              p: 3, 
              bgcolor: alpha(experience.color, 0.05),
              position: 'relative',
            }}
          >
            {/* Mission objectives */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                  fontSize: '0.7rem',
                  mb: 2,
                  color: experience.color,
                  textShadow: `0 0 8px ${alpha(experience.color, 0.7)}`,
                }}
              >
                MISSION OBJECTIVES:
              </Typography>
              
              <Box component="ul" sx={{ pl: 0, mt: 0, listStyleType: 'none' }}>
                {experience.description.map((item, index) => (
                  <Box 
                    component="li" 
                    key={index} 
                    sx={{ 
                      mb: 1.5,
                      display: 'flex',
                    }}
                  >
                    <Box 
                      sx={{ 
                        minWidth: 20,
                        height: 20,
                        mr: 2,
                        mt: 0.2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${experience.color} 0%, ${alpha(experience.color, 0.8)} 100%)`,
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: '#fff',
                        fontWeight: 'bold',
                        boxShadow: `0 0 8px ${alpha(experience.color, 0.5)}`,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography 
                      variant="body2"
                      sx={{
                        fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontSize: '0.6rem',
                        lineHeight: 1.8,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              {/* Skills gained */}
              {experience.skills && experience.skills.length > 0 && (
                <>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontSize: '0.7rem',
                      mt: 3,
                      mb: 2,
                      color: experience.color,
                      textShadow: `0 0 8px ${alpha(experience.color, 0.7)}`,
                    }}
                  >
                    SKILLS GAINED:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {experience.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        sx={{
                          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                          fontSize: '0.55rem',
                          bgcolor: alpha(experience.color, 0.1),
                          color: experience.color,
                          border: `1px solid ${alpha(experience.color, 0.4)}`,
                          boxShadow: `0 0 5px ${alpha(experience.color, 0.3)}`,
                          height: 'auto',
                          py: 0.5
                        }}
                      />
                    ))}
                  </Box>
                </>
              )}
              
              {/* Quest rewards */}
              {experience.rewards && experience.rewards.length > 0 && (
                <>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontSize: '0.7rem',
                      mt: 3,
                      mb: 2,
                      color: theme.palette.accent1.main,
                      textShadow: `0 0 8px ${alpha(theme.palette.accent1.main, 0.7)}`,
                    }}
                  >
                    QUEST REWARDS:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {experience.rewards.map((reward, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        <EmojiEventsIcon 
                          sx={{ 
                            color: theme.palette.accent1.main, 
                            mr: 1, 
                            fontSize: '1rem',
                            filter: `drop-shadow(0 0 3px ${alpha(theme.palette.accent1.main, 0.7)})`,
                          }} 
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme.palette.accent1.main,
                            fontWeight: 'medium',
                            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                            fontSize: '0.6rem',
                          }}
                        >
                          {reward}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </motion.div>
  );
};

// Quest timeline component - shows periods on the timeline
const QuestTimeline = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ position: 'relative', mb: 4 }}>
      {/* Timeline entries */}
      {experienceTimeline.map((timeEntry, index) => (
        <Box key={index} sx={{ position: 'relative', mb: 5 }}>
          {/* Year marker */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'inline-block',
                position: 'relative',
                padding: '8px 16px',
                background: alpha(theme.palette.primary.main, 0.1),
                borderRadius: '4px',
                border: `2px solid ${alpha(theme.palette.primary.main, 0.7)}`,
                boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                  opacity: 0.8,
                }
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                  fontSize: '1rem',
                  color: theme.palette.primary.main,
                  textShadow: `0 0 8px ${alpha(theme.palette.primary.main, 0.7)}`,
                  position: 'relative',
                }}
              >
                {timeEntry.year}
              </Typography>
              
              {/* Pixel corners */}
              <Box sx={{ 
                width: '4px', 
                height: '4px', 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                background: theme.palette.primary.main 
              }} />
              <Box sx={{ 
                width: '4px', 
                height: '4px', 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                background: theme.palette.primary.main 
              }} />
              <Box sx={{ 
                width: '4px', 
                height: '4px', 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                background: theme.palette.primary.main 
              }} />
              <Box sx={{ 
                width: '4px', 
                height: '4px', 
                position: 'absolute', 
                bottom: 0, 
                right: 0, 
                background: theme.palette.primary.main 
              }} />
            </Box>
          </Box>
          
          {/* Quest entries for this timeline period */}
          <Box 
            sx={{ 
              width: '100%',
              maxWidth: 800,
              mx: 'auto',
              position: 'relative'
            }}
          >
            {timeEntry.events.map((event, i) => (
              <QuestCard key={i} experience={event} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// Main Experience component
export const Experience = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
        position: 'relative',
        minHeight: 'calc(100vh - 80px)',
      }}
    >
      {/* Page title */}
      <Box sx={{ textAlign: 'center', mb: 6, position: 'relative', zIndex: 1 }}>
        <GlowingText 
          text="Quest Log" 
          variant="h3" 
          sx={sectionHeaderStyles}
          glowColor={theme.palette.primary.main}
          glowIntensity={20}
        />
        
        <Typography 
          variant="body1" 
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto',
            mb: 2,
            px: 2,
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '0.75rem',
            lineHeight: '1.6',
            letterSpacing: '0.5px'
          }}
        >
          A chronicle of my professional journey and completed quests.
          Each entry represents a significant adventure in my career path.
        </Typography>
      </Box>
      
      {/* Career overview */}
      <Box sx={{ maxWidth: 900, mx: 'auto', width: '100%' }}>
        <QuestTimeline />
      </Box>
    </Box>
  );
}; 