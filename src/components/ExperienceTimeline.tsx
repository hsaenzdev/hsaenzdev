import { Box, useTheme, Tooltip, Typography, alpha, PaletteColor } from '@mui/material';
import { motion } from 'framer-motion';

interface ExperienceTimelineProps {
  firstUsed?: number;
  years?: number;
  colorKey: string;
}

export const ExperienceTimeline = ({ firstUsed, years, colorKey }: ExperienceTimelineProps) => {
  const theme = useTheme();
  
  // If we don't have data, show nothing
  if (!firstUsed || !years) return null;
  
  // Get the current year for calculations
  const currentYear = new Date().getFullYear();
  
  // Fix the type issue by handling the color extraction more safely
  let color = theme.palette.primary.main;
  try {
    const paletteColor = theme.palette[colorKey as keyof typeof theme.palette] as PaletteColor;
    if (paletteColor && paletteColor.main) {
      color = paletteColor.main;
    }
  } catch (e) {
    // Fallback to primary color if there's an issue
    color = theme.palette.primary.main;
  }
  
  // Calculate the timespan
  const timelineStart = 2010; // Set a baseline year for all skills to align
  const timelineEnd = currentYear;
  const timelineRange = timelineEnd - timelineStart;
  
  // Generate pixel blocks for the years
  const renderYearBlocks = () => {
    const blocks = [];
    const blocksPerRow = Math.min(years + 1, 10); // Cap at 10 blocks per row
    const rows = Math.ceil((years + 1) / blocksPerRow);
    
    let blockCount = 0;
    
    for (let row = 0; row < rows; row++) {
      const rowBlocks = [];
      
      for (let col = 0; col < blocksPerRow; col++) {
        const year = firstUsed + blockCount;
        
        if (year > currentYear || blockCount > years) break;
        
        const isFirstYear = year === firstUsed;
        const isCurrentYear = year === currentYear;
        
        rowBlocks.push(
          <Tooltip 
            key={`block-${year}`}
            title={
              <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.6rem' }}>
                {year} {isFirstYear ? '(First Used)' : ''} {isCurrentYear ? '(Current)' : ''}
              </Typography>
            }
            arrow
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: blockCount * 0.03,
                type: "spring",
                stiffness: 300,
              }}
            >
              <Box
                sx={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                  opacity: isFirstYear || isCurrentYear ? 1 : 0.7 - (col * 0.05),
                  border: `2px solid ${theme.palette.background.paper}`,
                  borderRadius: '2px',
                  position: 'relative',
                  boxShadow: `0 0 5px ${alpha(color, 0.5)}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: `0 0 10px ${alpha(color, 0.8)}`,
                  },
                  '&::before': isFirstYear || isCurrentYear ? {
                    content: '""',
                    position: 'absolute',
                    top: '3px',
                    left: '3px',
                    width: '4px',
                    height: '4px',
                    backgroundColor: alpha('#fff', 0.8),
                  } : {},
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    pointerEvents: 'none',
                  }
                }}
              />
            </motion.div>
          </Tooltip>
        );
        
        blockCount++;
      }
      
      blocks.push(
        <Box 
          key={`row-${row}`}
          sx={{ 
            display: 'flex', 
            gap: '4px',
            justifyContent: 'center',
            mb: row < rows - 1 ? 1 : 0,
          }}
        >
          {rowBlocks}
        </Box>
      );
    }
    
    return blocks;
  };
  
  return (
    <Box
      sx={{ 
        mt: 1,
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        padding: '12px 8px 8px',
        backgroundColor: alpha(theme.palette.background.paper, 0.5),
        border: `1px dashed ${alpha(color, 0.3)}`,
      }}
    >
      {/* Year labels */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 1,
          px: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '0.55rem',
            color: color,
          }}
        >
          {firstUsed}
        </Typography>
        
        <Typography
          variant="caption"
          sx={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '0.55rem',
            color,
          }}
        >
          {firstUsed + years - 1}
        </Typography>
      </Box>
      
      {/* Experience blocks */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {renderYearBlocks()}
      </Box>
      
      {/* Experience summary */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 1,
        }}
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 1.5,
              py: 0.5,
              borderRadius: '4px',
              border: `1px solid ${alpha(color, 0.3)}`,
              backgroundColor: alpha(color, 0.1),
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '0.5rem',
                color,
                textAlign: 'center',
              }}
            >
              {years} YEARS OF EXPERIENCE
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}; 