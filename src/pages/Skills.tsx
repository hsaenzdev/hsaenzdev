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
  IconButton,
  alpha
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { motion } from "framer-motion";
import { GlowingText } from "../components/GlowingText";
import { 
  skillCategories, 
  getSkillLevelName, 
  getExperienceLevel,
  getExperienceTimespan
} from "../config/skills";
import { sectionHeaderStyles } from "../config/theme";
import { SkillProficiency } from "../components/SkillProficiency";

// Enhanced tooltip component
const EnhancedTooltip = ({ title, children }: { title: string, children: React.ReactElement }) => {
  const theme = useTheme();
  
  return (
    <Tooltip
      title={
        <Box sx={{ p: 1 }}>
          <Typography
            sx={{
              fontFamily: "'Press Start 2P', cursive",
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

// Component for displaying a single skill with an improved visual representation
const SkillItem = ({ 
  name, 
  level, 
  description, 
  years, 
  firstUsed,
  categoryColor
}: { 
  name: string; 
  level: number; 
  description?: string; 
  years?: number; 
  firstUsed?: number; 
  categoryColor: string;
}) => {
  const theme = useTheme();
  const experienceLevel = getExperienceLevel(years);
  
  return (
    <Paper
      elevation={2}
      sx={{ 
        mb: 2,
        width: '100%',
        p: 2,
        borderRadius: '8px',
        background: alpha(theme.palette.background.paper, 0.4),
        borderLeft: `4px solid ${categoryColor}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 5px 15px ${alpha(categoryColor, 0.2)}`,
          background: alpha(theme.palette.background.paper, 0.7),
        }
      }}
    >
      <Box display="flex" flexDirection="column" gap={1}>
        {/* Skill Name Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 'bold',
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '0.7rem',
                color: categoryColor
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
          
          {/* Experience Label */}
          {years && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {years && firstUsed && (
                <Tooltip 
                  title={`${experienceLevel} - ${getExperienceTimespan(firstUsed)}`}
                  arrow
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontSize: '0.55rem',
                      fontFamily: "'Press Start 2P', cursive", 
                      color: categoryColor,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      bgcolor: alpha(categoryColor, 0.05),
                      border: `1px dashed ${alpha(categoryColor, 0.2)}`,
                    }}
                  >
                    {experienceLevel}
                  </Typography>
                </Tooltip>
              )}
              
              <Chip 
                icon={<QueryBuilderIcon style={{ fontSize: 14 }}/>}
                label={`${years}Y`}
                size="small"
                sx={{ 
                  height: 20, 
                  fontSize: '0.6rem',
                  fontWeight: 'bold',
                  backgroundColor: alpha(categoryColor, 0.1),
                  color: categoryColor,
                  border: `1px solid ${alpha(categoryColor, 0.3)}`,
                  '& .MuiChip-icon': {
                    color: categoryColor
                  }
                }}
              />
            </Box>
          )}
        </Box>
        
        {/* Skill Proficiency */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <SkillProficiency level={level} colorOverride={categoryColor} />
        </Box>
      </Box>
    </Paper>
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
        mb: 5,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.8)})`,
        borderRadius: '12px',
        position: 'relative',
        boxShadow: `0 0 20px ${category.color}30, 0 0 40px ${category.color}10`,
        border: `2px solid ${alpha(category.color, 0.3)}`,
        transition: 'all 0.4s ease',
        '&:hover': {
          boxShadow: `0 0 25px ${category.color}50, 0 0 50px ${category.color}20`,
          transform: 'translateY(-3px)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `radial-gradient(circle at 30% 70%, ${alpha(category.color, 0.05)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }
      }}
    >
      {/* Pixel corners decorations */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '12px', borderTop: `3px solid ${category.color}`, borderLeft: `3px solid ${category.color}` }} />
      <Box sx={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', borderTop: `3px solid ${category.color}`, borderRight: `3px solid ${category.color}` }} />
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '12px', height: '12px', borderBottom: `3px solid ${category.color}`, borderLeft: `3px solid ${category.color}` }} />
      <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderBottom: `3px solid ${category.color}`, borderRight: `3px solid ${category.color}` }} />
    
      {/* Category header with icon */}
      <Box 
        sx={{ 
          p: 2.5, 
          bgcolor: `${alpha(category.color, 0.1)}`,
          borderBottom: `2px solid ${alpha(category.color, 0.2)}`,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-20%',
            width: '40%',
            height: '200%',
            background: `linear-gradient(to right, transparent, ${alpha(category.color, 0.1)}, transparent)`,
            transform: 'rotate(35deg)',
            transition: 'all 0.8s ease',
          },
          '&:hover::after': {
            left: '120%',
          }
        }}
      >
        <Box 
          component={motion.div}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ 
            mr: 2, 
            width: 50, 
            height: 50, 
            borderRadius: '8px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${category.color} 0%, ${alpha(category.color, 0.7)} 100%)`,
            boxShadow: `0 0 15px ${alpha(category.color, 0.5)}`,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '8px',
              padding: '2px',
              background: `linear-gradient(135deg, ${alpha('#fff', 0.8)}, ${alpha(category.color, 0.5)})`,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'destination-out',
              pointerEvents: 'none',
            }
          }}
        >
          <Icon sx={{ color: '#fff', fontSize: '1.8rem' }} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            component={motion.h2}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            sx={{ 
              color: category.color,
              fontFamily: "'Press Start 2P', cursive",
              fontSize: '1rem',
              textShadow: `0 0 5px ${alpha(category.color, 0.5)}`,
            }}
          >
            {category.title}
          </Typography>
          <Typography 
            variant="body2"
            component={motion.p}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            sx={{ 
              color: theme.palette.text.secondary,
              mt: 0.5,
              fontFamily: "'Press Start 2P', cursive",
              fontSize: '0.55rem',
            }}
          >
            {category.description}
          </Typography>
        </Box>
      </Box>
      
      {/* Skills list */}
      <Box 
        sx={{ 
          p: 3, 
          backgroundImage: `radial-gradient(${alpha(theme.palette.background.default, 0.8)} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      >
        <Box display="grid" sx={{ 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3
        }}>
          {category.skills.map((skill, index) => (
            <Box key={`${category.id}-${index}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SkillItem 
                  name={skill.name} 
                  level={skill.level} 
                  description={skill.description}
                  years={skill.years}
                  firstUsed={skill.firstUsed}
                  categoryColor={category.color}
                />
              </motion.div>
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
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          position: 'relative',
          padding: 3,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '20%',
            right: '20%',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
            opacity: 0.6,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '20%',
            right: '20%',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
            opacity: 0.6,
          }
        }}
      >
        <GlowingText 
          text="CHARACTER SKILLS" 
          variant="h3"
          sx={{
            ...sectionHeaderStyles,
            fontFamily: "'Press Start 2P', cursive",
          }}
          glowColor={theme.palette.primary.main}
        />
        
        <Typography 
          variant="body1" 
          component={motion.p}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto',
            mb: 2,
            px: 2,
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '0.7rem',
            lineHeight: 1.8,
            color: alpha(theme.palette.text.primary, 0.9)
          }}
        >
          Select a skill category to view abilities and experience stats.
        </Typography>
        
        {/* Skill level legend */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2, 
            mt: 2,
            flexWrap: 'wrap',
            px: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ color: theme.palette.accent1.main, fontSize: '1rem' }} />
            <Typography 
              variant="caption" 
              sx={{ 
                fontFamily: "'Press Start 2P', cursive", 
                fontSize: '0.55rem', 
                color: theme.palette.accent1.main 
              }}
            >
              Master
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ color: theme.palette.secondary.main, fontSize: '1rem' }} />
            <Typography 
              variant="caption" 
              sx={{ 
                fontFamily: "'Press Start 2P', cursive", 
                fontSize: '0.55rem',
                color: theme.palette.secondary.main 
              }}
            >
              Expert
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ color: theme.palette.primary.main, fontSize: '1rem' }} />
            <Typography 
              variant="caption" 
              sx={{ 
                fontFamily: "'Press Start 2P', cursive", 
                fontSize: '0.55rem',
                color: theme.palette.primary.main 
              }}
            >
              Advanced
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ color: theme.palette.accent3.main, fontSize: '1rem' }} />
            <Typography 
              variant="caption" 
              sx={{ 
                fontFamily: "'Press Start 2P', cursive", 
                fontSize: '0.55rem',
                color: theme.palette.accent3.main
              }}
            >
              Intermediate
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ color: theme.palette.accent2.main, fontSize: '1rem' }} />
            <Typography 
              variant="caption" 
              sx={{ 
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '0.55rem',
                color: theme.palette.accent2.main 
              }}
            >
              Beginner
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Category tabs for mobile */}
      <Box 
        sx={{ 
          display: { xs: 'block', md: 'none' }, 
          mb: 4,
          mx: 'auto',
          width: '100%',
          maxWidth: '600px',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            backgroundImage: `linear-gradient(to right, transparent, ${alpha(theme.palette.primary.main, 0.7)}, transparent)`,
          }
        }}
      >
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '.MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
              height: '3px',
              borderTopLeftRadius: '2px',
              borderTopRightRadius: '2px',
              boxShadow: `0 0 8px ${theme.palette.primary.main}`,
            },
            '.MuiTab-root': {
              fontFamily: "'Press Start 2P', cursive",
              fontSize: '0.6rem',
              minWidth: 'auto',
              p: 1,
              mr: 1,
            }
          }}
        >
          {skillCategories.map((category, index) => (
            <Tab 
              key={category.id} 
              label={category.title.split(' ')[0]} 
              sx={{ 
                color: activeTab === index ? category.color : theme.palette.text.primary,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: category.color,
                  backgroundColor: alpha(category.color, 0.1),
                },
                ...(activeTab === index && {
                  textShadow: `0 0 5px ${category.color}`,
                }),
              }}
            />
          ))}
        </Tabs>
      </Box>
      
      {/* Skills content */}
      <Box 
        sx={{ 
          maxWidth: '900px', 
          mx: 'auto',
          width: '100%',
        }}
      >
        {/* Mobile: Show only active tab */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {skillCategories.map((category, index) => (
            activeTab === index && (
              <Box 
                key={category.id}
                component={motion.div}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SkillCategorySection category={category} />
              </Box>
            )
          ))}
        </Box>
        
        {/* Desktop: Show all categories */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {skillCategories.map((category, index) => (
            <Box 
              key={category.id}
              component={motion.div}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillCategorySection category={category} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}; 