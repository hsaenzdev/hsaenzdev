import { useState } from "react";
import { 
  Box, 
  Typography, 
  useTheme,
  Paper,
  Button,
  ButtonGroup,
  Tooltip,
  Zoom,
  Container
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { GlowingText } from "../components/GlowingText";
import { 
  achievements, 
  achievementCategories, 
  rarityColors, 
  getRarityDescription,
  Achievement
} from "../config/achievements";
import { sectionHeaderStyles } from "../config/theme";

// Animated 8-bit star
const PixelStar = ({ color, size = 24, delay = 0 }: { color: string; size?: number; delay?: number }) => {
  return (
    <Box
      component={motion.div}
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 5, 0, -5, 0],
        filter: [
          `drop-shadow(0 0 2px ${color}80)`,
          `drop-shadow(0 0 8px ${color})`,
          `drop-shadow(0 0 2px ${color}80)`
        ]
      }}
      transition={{ 
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
        delay: delay
      }}
      sx={{
        width: size,
        height: size,
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(45deg, transparent 40%, ${color} 40%, ${color} 60%, transparent 60%),
            linear-gradient(135deg, transparent 40%, ${color} 40%, ${color} 60%, transparent 60%),
            linear-gradient(225deg, transparent 40%, ${color} 40%, ${color} 60%, transparent 60%),
            linear-gradient(315deg, transparent 40%, ${color} 40%, ${color} 60%, transparent 60%)
          `,
          backgroundSize: '100% 100%',
          transform: 'translate(-50%, -50%)',
        }
      }}
    />
  );
};

// Achievement badge component with 8-bit style
const AchievementBadge = ({ 
  achievement, 
  index 
}: { 
  achievement: typeof achievements[0];
  index: number;
}) => {
  const theme = useTheme();
  const rarityColor = rarityColors[achievement.rarity];
  const delay = index * 0.1;
  
  return (
    <Box 
      sx={{ 
        p: 1, 
        height: '100%' 
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay }}
        whileHover={{ 
          y: -8, 
          scale: 1.05,
          transition: { duration: 0.2 } 
        }}
        style={{ height: '100%' }}
      >
        <Paper
          elevation={3}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: '8px',
            p: 2,
            
            // 8-bit pixel border
            border: '4px solid',
            borderImageSlice: 2,
            borderImageSource: `
              linear-gradient(to right, 
                ${rarityColor}00, ${rarityColor}cc, ${rarityColor}ff, 
                ${rarityColor}cc, ${rarityColor}00
              )
            `,
            borderImageWidth: '4px',
            
            // Glow effect
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              boxShadow: `inset 0 0 30px ${rarityColor}40`,
              pointerEvents: 'none',
              zIndex: 1
            },
          }}
        >
          {/* Achievement icon with pixel effect */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              position: 'relative',
              mb: 2
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0,0,0,0.5)',
                borderRadius: '8px',
                border: '2px solid',
                borderColor: `${rarityColor}50`,
                position: 'relative',
                
                // 8-bit overlay effect
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 50%)`,
                  backgroundSize: '100% 4px',
                  pointerEvents: 'none',
                  opacity: 0.3,
                  zIndex: 1
                }
              }}
            >
              {/* Achievement icon */}
              {achievement.icon && (
                <achievement.icon 
                  sx={{ 
                    color: rarityColor,
                    fontSize: 32,
                    filter: `drop-shadow(0 0 8px ${rarityColor}80)`
                  }} 
                />
              )}
              
              {/* Decorative stars for rare and legendary */}
              {(achievement.rarity === 'rare' || achievement.rarity === 'legendary') && (
                <Box sx={{ position: 'absolute' }}>
                  <Box
                    component={motion.div}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 90,
                      height: 90,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {[0, 1, 2, 3].map(i => (
                      <PixelStar 
                        key={i}
                        color={rarityColor}
                        size={8}
                        delay={i * 0.5}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
            
            {/* Rarity indicator */}
            <Box
              sx={{
                position: 'absolute',
                top: -10,
                right: -10,
                bgcolor: 'rgba(0,0,0,0.8)',
                color: rarityColor,
                px: 1,
                py: 0.5,
                borderRadius: '4px',
                fontSize: '0.6rem',
                fontFamily: '"Press Start 2P", cursive',
                border: '1px solid',
                borderColor: `${rarityColor}50`,
                boxShadow: `0 0 8px ${rarityColor}50`,
                textTransform: 'uppercase'
              }}
            >
              {achievement.rarity}
            </Box>
          </Box>
          
          {/* Title */}
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.7rem',
              textAlign: 'center',
              color: rarityColor,
              mb: 1.5,
              lineHeight: 1.5,
              textShadow: `0 0 8px ${rarityColor}80`
            }}
          >
            {achievement.title}
          </Typography>
          
          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.8rem',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.85)',
              mb: 'auto'
            }}
          >
            {achievement.description}
          </Typography>
          
          {/* XP or date */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              pt: 1,
              borderTop: '1px dashed rgba(255,255,255,0.2)'
            }}
          >
            {achievement.xp ? (
              <Typography
                variant="caption"
                sx={{
                  color: '#ffcc00',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.6rem',
                  textShadow: '0 0 5px rgba(255,204,0,0.5)'
                }}
              >
                + {achievement.xp} XP
              </Typography>
            ) : achievement.date ? (
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.55rem'
                }}
              >
                {achievement.date}
              </Typography>
            ) : null}
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

// Pixelated progress bar for level indicator
const PixelProgressBar = ({ value, maxValue, color }: { value: number; maxValue: number; color: string }) => {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  
  return (
    <Box sx={{ position: 'relative', height: 20, width: '100%', mb: 1 }}>
      {/* Background */}
      <Box
        sx={{
          height: '100%',
          width: '100%',
          bgcolor: 'rgba(0,0,0,0.5)',
          border: '2px solid rgba(255,255,255,0.2)',
          borderRadius: '4px',
          position: 'relative',
          overflow: 'hidden',
          
          // Pixel pattern
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 100%)',
            backgroundSize: '8px 100%',
            opacity: 0.3,
            zIndex: 1
          }
        }}
      />
      
      {/* Progress */}
      <Box
        component={motion.div}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        sx={{
          position: 'absolute',
          top: 2,
          left: 2,
          height: 'calc(100% - 4px)',
          borderRadius: '2px',
          background: `linear-gradient(to right, ${color}aa, ${color}ff)`,
          
          // Pixel effect for filled area
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 100%)',
            backgroundSize: '4px 100%',
            zIndex: 1
          }
        }}
      />
      
      {/* Notches */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          display: 'flex',
          pointerEvents: 'none',
          padding: '0 2px',
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <Box 
            key={i} 
            sx={{ 
              flex: 1, 
              borderRight: i < 9 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              height: '100%'
            }} 
          />
        ))}
      </Box>
    </Box>
  );
};

// Main Achievements component
export const Achievements = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Filter achievements by category
  const filteredAchievements = selectedCategory === "all"
    ? achievements
    : achievements.filter(a => a.category === selectedCategory as "certification" | "project" | "skill" | "award");
  
  // Calculate total XP
  const totalXP = achievements.reduce((sum, achievement) => sum + (achievement.xp || 0), 0);
  
  // Count by rarity
  const rarityCount = {
    common: achievements.filter(a => a.rarity === 'common').length,
    uncommon: achievements.filter(a => a.rarity === 'uncommon').length,
    rare: achievements.filter(a => a.rarity === 'rare').length,
    legendary: achievements.filter(a => a.rarity === 'legendary').length
  };
  
  // Calculate current level
  const level = Math.floor(totalXP / 1000) + 1;
  const levelProgress = totalXP % 1000;

  // Create category array for buttons
  const categoryArray = [
    { id: "certification", name: "CERTIFICATIONS" },
    { id: "project", name: "PROJECTS" },
    { id: "skill", name: "SKILLS" },
    { id: "award", name: "AWARDS" }
  ];
  
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
        position: 'relative',
        minHeight: 'calc(100vh - 80px)',
        bgcolor: theme.palette.background.default,
        backgroundImage: 'linear-gradient(to bottom, rgba(10,10,30,0.8) 0%, rgba(5,5,15,0.8) 100%)',
      }}
    >
      {/* Page header with pixelated title */}
      <Box sx={{ position: 'relative', textAlign: 'center', mb: 5 }}>
        <GlowingText 
          text="ACHIEVEMENTS" 
          variant="h3"
          sx={{
            fontFamily: '"Press Start 2P", cursive',
            fontSize: { xs: '1.5rem', md: '2rem' },
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
            color: 'rgba(255,255,255,0.9)',
            mb: 4
          }}
        >
          CERTIFICATIONS, AWARDS AND PERSONAL MILESTONES
        </Typography>
        
        {/* Level progress indicator */}
        <Container maxWidth="sm">
          <Box
            sx={{
              borderRadius: '8px',
              bgcolor: 'rgba(0,0,0,0.6)',
              p: 3,
              mb: 4,
              border: '2px solid',
              borderColor: `${theme.palette.primary.main}50`,
              boxShadow: `0 0 20px ${theme.palette.primary.main}30`
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography
                sx={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.7rem',
                  color: theme.palette.primary.main
                }}
              >
                DEV LEVEL {level}
              </Typography>
              
              <Typography
                sx={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.7rem',
                  color: '#ffcc00'
                }}
              >
                {levelProgress} / 1000 XP
              </Typography>
            </Box>
            
            <PixelProgressBar 
              value={levelProgress}
              maxValue={1000}
              color={theme.palette.primary.main}
            />
            
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
                pt: 2,
                borderTop: '1px dashed rgba(255,255,255,0.2)'
              }}
            >
              <Tooltip
                title={
                  <Box>
                    <Typography fontWeight="bold" gutterBottom>
                      Rarity Levels
                    </Typography>
                    <Typography variant="body2">
                      {getRarityDescription('common')}
                    </Typography>
                    <Typography variant="body2">
                      {getRarityDescription('uncommon')}
                    </Typography>
                    <Typography variant="body2">
                      {getRarityDescription('rare')}
                    </Typography>
                    <Typography variant="body2">
                      {getRarityDescription('legendary')}
                    </Typography>
                  </Box>
                }
                arrow
                placement="top"
                TransitionComponent={Zoom}
              >
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {Object.entries(rarityCount).map(([rarity, count]) => (
                    <Box 
                      key={rarity}
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '2px',
                          bgcolor: rarityColors[rarity as keyof typeof rarityColors]
                        }} 
                      />
                      <Typography 
                        variant="caption"
                        sx={{
                          fontFamily: '"Press Start 2P", cursive',
                          fontSize: '0.5rem',
                          color: 'rgba(255,255,255,0.8)'
                        }}
                      >
                        {count}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Tooltip>
              
              <Typography
                variant="caption"
                sx={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.6rem',
                  color: '#ffcc00'
                }}
              >
                TOTAL: {totalXP} XP
              </Typography>
            </Box>
          </Box>
        </Container>
        
        {/* Category filters */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 4
          }}
        >
          <ButtonGroup variant="outlined" size="small">
            <Button
              onClick={() => setSelectedCategory("all")}
              sx={{
                px: 2,
                color: selectedCategory === "all" ? theme.palette.primary.main : 'rgba(255,255,255,0.7)',
                borderColor: 'rgba(255,255,255,0.2)',
                backgroundColor: selectedCategory === "all" ? 'rgba(255,255,255,0.05)' : 'transparent',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '0.55rem',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              ALL
            </Button>
            
            {categoryArray.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                sx={{
                  px: 2,
                  color: selectedCategory === category.id ? theme.palette.primary.main : 'rgba(255,255,255,0.7)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  backgroundColor: selectedCategory === category.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.55rem',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: theme.palette.primary.main
                  }
                }}
              >
                {category.name}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
      
      {/* Achievements grid */}
      <Box sx={{ px: { xs: 0, md: 4 } }}>
        <AnimatePresence>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { 
                xs: 'repeat(1, 1fr)', 
                sm: 'repeat(2, 1fr)', 
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: 2,
            }}
          >
            {filteredAchievements.map((achievement, index) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                index={index}
              />
            ))}
          </Box>
        </AnimatePresence>
        
        {/* Empty state */}
        {filteredAchievements.length === 0 && (
          <Box 
            sx={{
              p: 4,
              textAlign: 'center',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.7rem',
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '8px',
              border: '2px dashed rgba(255,255,255,0.1)',
            }}
          >
            <Box
              component={motion.div}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              NO ACHIEVEMENTS IN THIS CATEGORY
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}; 