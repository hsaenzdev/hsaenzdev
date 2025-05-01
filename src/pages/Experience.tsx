import { useState } from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  useTheme, 
  Divider, 
  Chip, 
  Collapse,
  Button 
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion } from "framer-motion";
import { GlowingText } from "../components/GlowingText";
import { experienceItems, experienceTimeline, experienceLevelIcons, getExperienceLevelTitle } from "../config/experience";
import { sectionHeaderStyles, gridBackground, retroCardStyles } from "../config/theme";

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
          ...retroCardStyles(experience.color),
        }}
      >
        {/* Quest header */}
        <Box 
          sx={{ 
            p: 3,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
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
                bgcolor: experience.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 10px ${experience.color}80`,
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
                }}
              >
                {experience.title}
              </Typography>
              
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  fontSize: '0.9rem',
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
                  bgcolor: `${experience.color}30`,
                  color: experience.color,
                  border: `1px solid ${experience.color}50`,
                  height: 24,
                  ml: 1,
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
              bgcolor: `${experience.color}15`,
              border: `1px solid ${experience.color}30`,
              borderRadius: 1,
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
                bgcolor: expanded ? experience.color : `${experience.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1,
                transition: 'all 0.3s ease',
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
              }}
            >
              {expanded ? 'HIDE QUEST DETAILS' : 'VIEW QUEST DETAILS'}
            </Typography>
          </Box>
        </Box>
        
        {/* Quest details */}
        <Collapse in={expanded}>
          <Divider />
          <Box 
            sx={{ 
              p: 3, 
              bgcolor: `${experience.color}05`,
              position: 'relative',
            }}
          >
            {/* Background pixel pattern */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.03,
                zIndex: 0,
                backgroundImage: `url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="4" height="4" fill="${experience.color.replace('#', '%23')}" /%3E%3C/svg%3E')`,
              }}
            />
            
            {/* Mission objectives */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                  fontSize: '0.7rem',
                  mb: 2,
                  color: experience.color,
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
                        background: `linear-gradient(135deg, ${experience.color} 0%, ${experience.color}99 100%)`,
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: '#fff',
                        fontWeight: 'bold',
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography variant="body2">{item}</Typography>
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
                          bgcolor: `${experience.color}20`,
                          color: experience.color,
                          border: `1px solid ${experience.color}40`,
                          fontSize: '0.7rem',
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
                            fontSize: '1rem' 
                          }} 
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme.palette.accent1.main,
                            fontWeight: 'medium',
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
      {/* Timeline line */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 20, sm: 40 },
          top: 0,
          bottom: 0,
          width: 4,
          bgcolor: `${theme.palette.primary.main}50`,
          zIndex: 0,
        }}
      />
      
      {/* Timeline entries */}
      {experienceTimeline.map((timeEntry, index) => (
        <Box key={index} sx={{ position: 'relative', mb: 5 }}>
          {/* Year marker */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              position: 'relative',
            }}
          >
            {/* Timeline dot */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: theme.palette.primary.main,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 0 4px ${theme.palette.background.default}, 0 0 0 8px ${theme.palette.primary.main}40`,
                fontSize: '0.8rem',
                fontWeight: 'bold',
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                zIndex: 2,
                ml: { xs: 0, sm: 20 },
                mr: 2,
              }}
            >
              {index + 1}
            </Box>
            
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: '0.9rem',
                color: theme.palette.primary.main,
              }}
            >
              {timeEntry.year}
            </Typography>
          </Box>
          
          {/* Quest entries for this timeline period */}
          <Box sx={{ pl: { xs: 5, sm: 10 } }}>
            {timeEntry.events.map((event, i) => (
              <QuestCard key={i} experience={event} />
            ))}
          </Box>
        </Box>
      ))}
      
      {/* End of timeline marker */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 20, sm: 40 },
          bottom: -20,
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: `20px solid ${theme.palette.primary.main}50`,
          zIndex: 0,
        }}
      />
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
      {/* Background grid */}
      <Box sx={gridBackground(theme.palette.primary.main)} />
      
      {/* Page title */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <GlowingText 
          text="Quest Log" 
          variant="h3" 
          sx={sectionHeaderStyles}
          glowColor={theme.palette.primary.main}
        />
        
        <Typography 
          variant="body1" 
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto',
            mb: 2,
            px: 2 
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