import { Box, useTheme, Tooltip, Typography, alpha } from '@mui/material';
import { motion } from 'framer-motion';

interface SkillProficiencyProps {
  level: number; // 1-10
  maxLevel?: number;
  colorOverride?: string;
  showTooltip?: boolean;
}

export const SkillProficiency = ({
  level,
  maxLevel = 10,
  colorOverride,
  showTooltip = true
}: SkillProficiencyProps) => {
  const theme = useTheme();
  
  const getSkillColor = (level: number) => {
    if (colorOverride) return colorOverride;
    if (level >= 9) return theme.palette.accent1.main; // Gold/Yellow
    if (level >= 7) return theme.palette.secondary.main; // Teal/Cyan
    if (level >= 5) return theme.palette.primary.main; // Pink/Red
    if (level >= 3) return theme.palette.accent3.main; // Green
    return theme.palette.accent2.main; // Purple
  };
  
  const getSkillLevelName = (level: number): string => {
    if (level >= 9) return 'Master';
    if (level >= 7) return 'Expert';
    if (level >= 5) return 'Advanced';
    if (level >= 3) return 'Intermediate';
    return 'Beginner';
  };
  
  const proficiencyColor = getSkillColor(level);
  const levelName = getSkillLevelName(level);
  
  // Generate pixel art stars for skill level
  const renderPixelStars = () => {
    // Calculate how many stars to fill based on level
    const totalStars = 5;
    const filledStars = Math.round((level / maxLevel) * totalStars);
    
    return (
      <Box sx={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        {Array.from({ length: totalStars }).map((_, i) => {
          const isFilled = i < filledStars;
          
          // Create pixel art star
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Box
                sx={{
                  fontSize: '18px',
                  fontFamily: "'Press Start 2P', cursive",
                  color: isFilled 
                    ? proficiencyColor 
                    : alpha(theme.palette.text.secondary, 0.3),
                  textShadow: isFilled 
                    ? `0 0 6px ${alpha(proficiencyColor, 0.8)}` 
                    : 'none',
                  transform: 'scale(0.8)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {isFilled ? '★' : '☆'}
              </Box>
            </motion.div>
          );
        })}
      </Box>
    );
  };
  
  // Render level text with retro pixel style
  const renderLevelText = () => {
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        sx={{
          display: 'inline-flex',
          padding: '2px 6px',
          backgroundColor: alpha(proficiencyColor, 0.1),
          border: `1px solid ${alpha(proficiencyColor, 0.4)}`,
          borderRadius: '4px',
          ml: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '0.5rem',
            color: proficiencyColor,
            letterSpacing: '0.5px',
          }}
        >
          LVL {level}
        </Typography>
      </Box>
    );
  };
  
  // Content to render
  const content = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {renderPixelStars()}
      {renderLevelText()}
    </Box>
  );
  
  if (!showTooltip) {
    return content;
  }
  
  return (
    <Tooltip
      title={
        <Box sx={{ p: 0.5 }}>
          <Typography
            sx={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: '0.6rem',
              color: proficiencyColor,
              mb: 0.5,
            }}
          >
            {levelName.toUpperCase()}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption">
              Level: {level}/{maxLevel}
            </Typography>
          </Box>
        </Box>
      }
      arrow
      placement="top"
    >
      <Box>
        {content}
      </Box>
    </Tooltip>
  );
}; 