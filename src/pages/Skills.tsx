import { useState } from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  useTheme, 
  Tabs, 
  Tab, 
  Chip,
  Tooltip,
  IconButton
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { motion } from "framer-motion";
import { GlowingText } from "../components/GlowingText";
import { skillCategories, getSkillLevelName, getSkillLevelColor } from "../config/skills";
import { sectionHeaderStyles } from "../config/theme";

// Enhanced tooltip component
const EnhancedTooltip = ({ title, children }: { title: string, children: React.ReactElement }) => {
  const theme = useTheme();
  
  return (
    <Tooltip
      title={
        <Box sx={{ p: 1 }}>
          <Typography
            sx={{
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.7rem',
              color: theme.palette.primary.main,
              mb: 1
            }}
          >
            INFO
          </Typography>
          <Typography variant="body2">{title}</Typography>
        </Box>
      }
      arrow
      placement="top"
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'rgba(0,0,0,0.9)',
            '& .MuiTooltip-arrow': {
              color: 'rgba(0,0,0,0.9)',
            },
            px: 2,
            py: 1.5,
            boxShadow: `0 0 15px ${theme.palette.primary.main}40`,
            border: `1px solid ${theme.palette.primary.main}50`,
          }
        }
      }}
    >
      {children}
    </Tooltip>
  );
};

// Component for displaying a single skill with a retro-style progress bar
const SkillBar = ({ name, level, description, years }: { name: string; level: number; description?: string; years?: number }) => {
  const theme = useTheme();
  const levelColor = getSkillLevelColor(level);
  const levelName = getSkillLevelName(level);
  
  return (
    <Box sx={{ mb: 2.5, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 'bold',
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.65rem',
            }}
          >
            {name}
          </Typography>
          
          {description && (
            <EnhancedTooltip title={description}>
              <IconButton size="small" sx={{ ml: 0.5, p: 0 }}>
                <InfoIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
              </IconButton>
            </EnhancedTooltip>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {years && (
            <Chip 
              label={`${years} YR${years > 1 ? 'S' : ''}`}
              size="small"
              sx={{ 
                height: 20, 
                fontSize: '0.55rem', 
                mr: 1, 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${levelColor}30`,
                fontFamily: '"Press Start 2P", cursive',
              }}
            />
          )}
          <Typography 
            variant="caption" 
            sx={{ 
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.55rem',
              color: levelColor,
              whiteSpace: 'nowrap'
            }}
          >
            {levelName}
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ position: 'relative' }}>
        {/* Pixelated skill bar background */}
        <Box
          sx={{
            height: 12,
            borderRadius: 1,
            border: '1px solid rgba(255,255,255,0.1)',
            bgcolor: 'rgba(0,0,0,0.2)',
            position: 'relative',
            overflow: 'hidden',
            
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 50%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.05) 100%)',
              backgroundSize: '4px 100%',
              opacity: 0.5,
              zIndex: 0,
            }
          }}
        />
        
        {/* Animated foreground progress bar */}
        <Box
          component={motion.div}
          initial={{ width: 0 }}
          animate={{ width: `${level * 10}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 12,
            borderRadius: 1,
            backgroundColor: levelColor,
            backgroundImage: level >= 8 
              ? `repeating-linear-gradient(45deg, ${levelColor} 0%, ${levelColor} 10%, ${levelColor}cc 10%, ${levelColor}cc 20%)` 
              : undefined,
          }}
        />
        
        {/* Pixel notches along the progress bar */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            backgroundImage: 'linear-gradient(to right, transparent 0%, transparent 90%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.3) 100%)',
            backgroundSize: '10% 100%',
            pointerEvents: 'none',
            opacity: 0.5,
            zIndex: 0,
          }}
        />
      </Box>
    </Box>
  );
};

// Section for skill category
const SkillCategorySection = ({ category }: { category: typeof skillCategories[0] }) => {
  const theme = useTheme();
  const Icon = category.icon;
  
  return (
    <Paper
      elevation={4}
      sx={{
        mb: 4,
        overflow: 'hidden',
        background: theme.palette.background.paper,
        borderRadius: 2,
        position: 'relative',
        boxShadow: `0 0 15px ${category.color}40, 0 0 30px ${category.color}20`,
        border: `2px solid ${category.color}50`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: `0 0 20px ${category.color}60, 0 0 40px ${category.color}30`,
        },
      }}
    >
      {/* Category header with icon */}
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: `${category.color}15`,
          borderBottom: `1px solid ${category.color}30`,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box 
          sx={{ 
            mr: 2, 
            width: 40, 
            height: 40, 
            borderRadius: '4px', 
            bgcolor: category.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 8px ${category.color}80`,
          }}
        >
          <Icon sx={{ color: '#fff' }} />
        </Box>
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              color: category.color,
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.8rem'
            }}
          >
            {category.title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary,
              mt: 0.5,
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.55rem',
              lineHeight: 1.5,
            }}
          >
            {category.description}
          </Typography>
        </Box>
      </Box>
      
      {/* Skills list */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
          {category.skills.map((skill, index) => (
            <Box 
              key={`${category.id}-${index}`} 
              sx={{ 
                width: { xs: '100%', md: '50%' }, 
                px: 1.5, 
                mb: 1 
              }}
            >
              <SkillBar 
                name={skill.name}
                level={skill.level}
                description={skill.description}
                years={skill.years}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

// Main Skills component
export const Skills = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
        background: theme.palette.background.default,
      }}
    >
      {/* Page title */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <GlowingText 
          text="Technical Skills" 
          variant="h3"
          sx={{
            ...sectionHeaderStyles,
            fontFamily: '"Press Start 2P", cursive',
          }}
          glowColor={theme.palette.primary.main}
        />
        
        <Typography 
          variant="body1" 
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto',
            mb: 2,
            px: 2,
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '0.7rem',
            lineHeight: 1.8,
          }}
        >
          A comprehensive overview of my technical expertise, developed through years of professional experience.
        </Typography>
      </Box>
      
      {/* Category tabs for mobile */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '.MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
              height: 3,
            }
          }}
        >
          {skillCategories.map((category, index) => (
            <Tab 
              key={category.id} 
              label={category.title}
              sx={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '0.6rem',
                py: 1,
                minHeight: 'unset',
                color: activeTab === index ? category.color : theme.palette.text.primary,
              }}
            />
          ))}
        </Tabs>
      </Box>
      
      {/* Mobile view - show one category at a time */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {skillCategories.map((category, index) => (
          <Box key={category.id} sx={{ display: activeTab === index ? 'block' : 'none' }}>
            <SkillCategorySection category={category} />
          </Box>
        ))}
      </Box>
      
      {/* Desktop view - show all categories */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {skillCategories.map((category) => (
          <SkillCategorySection key={category.id} category={category} />
        ))}
      </Box>
    </Box>
  );
}; 