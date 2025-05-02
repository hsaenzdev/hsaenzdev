import { useState } from 'react';
import { Box, Typography, Grid, Paper, useTheme, Chip, alpha, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { GlowingText } from '../../components/GlowingText';

// Icons for each skill category
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import TerminalIcon from '@mui/icons-material/Terminal';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import JavascriptIcon from '@mui/icons-material/Javascript';
import PhpIcon from '@mui/icons-material/Php';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import LanguageIcon from '@mui/icons-material/Language';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarRateIcon from '@mui/icons-material/StarRate';

interface Skill {
  name: string;
  startYear: number;
  years: number;
  icon?: React.ReactNode;
}

export const Skills = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  // Skills categorized by type
  const [skills] = useState({
    frontend: [
      { name: 'JavaScript/TypeScript', startYear: 2012, years: currentYear - 2012, icon: <JavascriptIcon /> },
      { name: 'React', startYear: 2016, years: currentYear - 2016, icon: <CodeIcon /> },
      { name: 'Material UI', startYear: 2018, years: currentYear - 2018, icon: <DataObjectIcon /> },
      { name: 'Vue.js', startYear: 2017, years: currentYear - 2017, icon: <LanguageIcon /> },
      { name: 'GraphQL', startYear: 2018, years: currentYear - 2018, icon: <DataObjectIcon /> }
    ],
    backend: [
      { name: 'Node.js', startYear: 2014, years: currentYear - 2014, icon: <TerminalIcon /> },
      { name: 'Express.js', startYear: 2015, years: currentYear - 2015, icon: <DataObjectIcon /> },
      { name: 'Elixir/Phoenix', startYear: 2019, years: currentYear - 2019, icon: <AutoAwesomeIcon /> },
      { name: 'PHP', startYear: 2010, years: currentYear - 2010, icon: <PhpIcon /> },
      { name: 'C#', startYear: 2014, years: currentYear - 2014, icon: <CodeIcon /> },
      { name: 'Python', startYear: 2016, years: currentYear - 2016, icon: <CodeIcon /> }
    ],
    database: [
      { name: 'PostgreSQL', startYear: 2015, years: currentYear - 2015, icon: <StorageIcon /> },
      { name: 'Snowflake', startYear: 2020, years: currentYear - 2020, icon: <StorageRoundedIcon /> },
      { name: 'ClickHouse', startYear: 2021, years: currentYear - 2021, icon: <StorageRoundedIcon /> },
      { name: 'SQL/NoSQL', startYear: 2012, years: currentYear - 2012, icon: <StorageIcon /> }
    ],
    devops: [
      { name: 'AWS', startYear: 2018, years: currentYear - 2018, icon: <CloudIcon /> },
      { name: 'Docker', startYear: 2017, years: currentYear - 2017, icon: <CloudIcon /> },
      { name: 'Git (GitLab CI/CD)', startYear: 2014, years: currentYear - 2014, icon: <CodeIcon /> },
      { name: 'Linux', startYear: 2012, years: currentYear - 2012, icon: <TerminalIcon /> },
      { name: 'Jira', startYear: 2016, years: currentYear - 2016, icon: <CodeIcon /> },
      { name: 'LaunchDarkly', startYear: 2021, years: currentYear - 2021, icon: <AutoAwesomeIcon /> }
    ],
    soft: [
      { name: 'Team Collaboration', startYear: 2010, years: currentYear - 2010, icon: <EmojiPeopleIcon /> },
      { name: 'Problem Solving', startYear: 2010, years: currentYear - 2010, icon: <AutoAwesomeIcon /> },
      { name: 'Communication', startYear: 2010, years: currentYear - 2010, icon: <EmojiPeopleIcon /> },
      { name: 'Adaptability', startYear: 2010, years: currentYear - 2010, icon: <AutoAwesomeIcon /> },
      { name: 'Attention to Detail', startYear: 2010, years: currentYear - 2010, icon: <StarRateIcon /> }
    ]
  });

  // Animated variants for containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animated variants for skill cards
  const skillVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Category icons and animations
  const categoryIcons = {
    frontend: <CodeIcon fontSize="large" />,
    backend: <TerminalIcon fontSize="large" />,
    database: <StorageIcon fontSize="large" />,
    devops: <CloudIcon fontSize="large" />,
    soft: <EmojiPeopleIcon fontSize="large" />
  };

  // Function to render skill cards
  const renderSkillCard = (skill: Skill, index: number, category: string) => {
    // Determine color based on category
    const getColor = () => {
      switch(category) {
        case 'frontend': return theme.palette.primary.main;
        case 'backend': return theme.palette.secondary.main;
        case 'database': return theme.palette.accent1.main;
        case 'devops': return theme.palette.accent2.main;
        default: return theme.palette.accent3.main;
      }
    };

    const color = getColor();
    const glowIntensity = '0 0 15px';

    return (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${category}-${index}`}>
        <motion.div variants={skillVariants}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: '100%',
              border: `2px solid ${alpha(color, 0.5)}`,
              background: alpha(color, 0.05),
              backdropFilter: 'blur(8px)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s',
              boxShadow: `${glowIntensity} ${alpha(color, 0.15)}`,
              transform: 'translateY(-3px)',
              '&:hover': {
                transform: 'translateY(-5px) scale(1.02)',
                boxShadow: `${glowIntensity} ${alpha(color, 0.3)}`,
                border: `2px solid ${alpha(color, 0.7)}`,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '5px',
                background: `linear-gradient(90deg, ${alpha(color, 0.8)}, ${alpha(color, 0.4)})`,
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box 
                sx={{ 
                  mr: 1.5, 
                  color: color,
                  filter: `drop-shadow(0 0 3px ${alpha(color, 0.7)})`
                }}
              >
                {skill.icon}
              </Box>
              <Typography 
                sx={{ 
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.85rem',
                  color: color,
                  textShadow: `0 0 5px ${alpha(color, 0.5)}`,
                  flexGrow: 1
                }}
              >
                {skill.name}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
              <Tooltip title="Years of experience" arrow>
                <Chip 
                  size="small"
                  icon={<StarRateIcon sx={{ fontSize: '0.7rem !important', color: color }} />}
                  label={`${skill.years}+ YRS`}
                  sx={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: '0.5rem',
                    backgroundColor: alpha(color, 0.15),
                    color: color,
                    border: `1px solid ${alpha(color, 0.4)}`,
                    boxShadow: `0 0 5px ${alpha(color, 0.3)}`,
                    textShadow: `0 0 2px ${alpha(color, 0.2)}`,
                  }}
                />
              </Tooltip>
              <Tooltip title="Started learning in" arrow>
                <Chip 
                  size="small"
                  label={`SINCE ${skill.startYear}`}
                  sx={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: '0.5rem',
                    backgroundColor: alpha(theme.palette.background.paper, 0.5),
                    color: theme.palette.text.secondary,
                    border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                    boxShadow: `0 0 5px ${alpha(theme.palette.divider, 0.2)}`,
                  }}
                />
              </Tooltip>
            </Box>
          </Paper>
        </motion.div>
      </Grid>
    );
  };

  // Function to render a category
  const renderCategory = (title: string, categoryKey: keyof typeof skills) => {
    const categoryColor = (() => {
      switch(categoryKey) {
        case 'frontend': return theme.palette.primary.main;
        case 'backend': return theme.palette.secondary.main;
        case 'database': return theme.palette.accent1.main;
        case 'devops': return theme.palette.accent2.main;
        default: return theme.palette.accent3.main;
      }
    })();

    const icon = categoryIcons[categoryKey];

    return (
      <Box mb={6}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box 
              sx={{ 
                mr: 2, 
                color: categoryColor,
                textShadow: `0 0 8px ${alpha(categoryColor, 0.7)}`,
                filter: `drop-shadow(0 0 5px ${alpha(categoryColor, 0.5)})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {icon}
            </Box>
          </motion.div>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontFamily: '"Press Start 2P", cursive',
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: categoryColor,
              textShadow: `0 0 5px ${alpha(categoryColor, 0.7)}`,
              display: 'inline-block',
              '&::before': {
                content: '"[ "',
                opacity: 0.7,
              },
              '&::after': {
                content: '" ]"',
                opacity: 0.7,
              }
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          component={motion.div} 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Grid container spacing={2}>
            {skills[categoryKey].map((skill, index) => renderSkillCard(skill, index, categoryKey))}
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    <Box 
      sx={{ 
        pt: 4, 
        px: { xs: 2, md: 4 },
        maxWidth: '1400px',
        mx: 'auto'
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box textAlign="center" mb={6}>
        <GlowingText
          text="SKILL INVENTORY"
          variant="h2"
          glowIntensity={12}
          glowColor={theme.palette.secondary.main}
          sx={{ 
            mb: 2,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}
        />
        
        <GlowingText
          text="Throughout my journey as a developer, I've leveled up across multiple tech stacks and domains. Each skill represents experience points gained through real-world quests and challenges. This is my character sheet - built from over a decade of coding adventures!"
          variant="h6"
          glowIntensity={4}
          glowColor={theme.palette.secondary.main}
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto',
            px: 2,
            py: 1.5,
            fontFamily: '"Press Start 2P", cursive',
            fontSize: { xs: '0.6rem', sm: '0.7rem' },
            color: theme.palette.text.primary,
            lineHeight: 1.8,
            letterSpacing: '0.5px'
          }}
        />
      </Box>

      {renderCategory('FRONTEND', 'frontend')}
      {renderCategory('BACKEND', 'backend')}
      {renderCategory('DATABASE', 'database')}
      {renderCategory('DEVOPS & TOOLS', 'devops')}
      {renderCategory('SOFT SKILLS', 'soft')}

      {/* More skills coming soon message */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mt: 8, 
          mb: 4,
          position: 'relative'
        }}
      >
        <Box 
          sx={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8,
                delay: 0.5
              }
            }}
          >
            <GlowingText
              text="SKILL TREE EXPANDING..."
              variant="h6"
              glowIntensity={8}
              glowColor={theme.palette.primary.main}
              sx={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '0.9rem',
                color: theme.palette.primary.main,
                mb: 1,
                px: 3,
                py: 2,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.3),
                backdropFilter: 'blur(5px)',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.2)}`,
                display: 'inline-block'
              }}
            />
          </motion.div>
          <motion.div
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '8px',
              zIndex: -1,
              backgroundColor: alpha(theme.palette.primary.main, 0.05)
            }}
          />
        </Box>
        <GlowingText
          text="More abilities unlocking through side quests and continuous learning journeys. Check back for new skills and level-ups!"
          variant="h6"
          glowIntensity={3}
          glowColor={theme.palette.text.secondary}
          sx={{ 
            mt: 2,
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '0.6rem',
            color: alpha(theme.palette.text.secondary, 0.8),
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.8,
            letterSpacing: '0.5px'
          }}
        />
      </Box>
    </Box>
  );
};
