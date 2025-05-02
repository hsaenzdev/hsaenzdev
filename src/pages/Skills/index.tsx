import { useState } from 'react';
import { Box, Typography, Grid, Paper, useTheme, Chip, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { GlowingText } from '../../components/GlowingText';

interface Skill {
  name: string;
  startYear: number;
  years: number;
}

export const Skills = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  // Skills categorized by type
  const [skills] = useState({
    frontend: [
      { name: 'JavaScript/TypeScript', startYear: 2012, years: currentYear - 2012 },
      { name: 'React', startYear: 2016, years: currentYear - 2016 },
      { name: 'Material UI', startYear: 2018, years: currentYear - 2018 },
      { name: 'Vue.js', startYear: 2017, years: currentYear - 2017 },
      { name: 'GraphQL', startYear: 2018, years: currentYear - 2018 }
    ],
    backend: [
      { name: 'Node.js', startYear: 2014, years: currentYear - 2014 },
      { name: 'Express.js', startYear: 2015, years: currentYear - 2015 },
      { name: 'Elixir/Phoenix', startYear: 2019, years: currentYear - 2019 },
      { name: 'PHP', startYear: 2010, years: currentYear - 2010 },
      { name: 'C#', startYear: 2014, years: currentYear - 2014 },
      { name: 'Python', startYear: 2016, years: currentYear - 2016 }
    ],
    database: [
      { name: 'PostgreSQL', startYear: 2015, years: currentYear - 2015 },
      { name: 'Snowflake', startYear: 2020, years: currentYear - 2020 },
      { name: 'ClickHouse', startYear: 2021, years: currentYear - 2021 },
      { name: 'SQL/NoSQL', startYear: 2012, years: currentYear - 2012 }
    ],
    devops: [
      { name: 'AWS', startYear: 2018, years: currentYear - 2018 },
      { name: 'Docker', startYear: 2017, years: currentYear - 2017 },
      { name: 'Git (GitLab CI/CD)', startYear: 2014, years: currentYear - 2014 },
      { name: 'Linux', startYear: 2012, years: currentYear - 2012 },
      { name: 'Jira', startYear: 2016, years: currentYear - 2016 },
      { name: 'LaunchDarkly', startYear: 2021, years: currentYear - 2021 }
    ],
    soft: [
      { name: 'Team Collaboration', startYear: 2010, years: currentYear - 2010 },
      { name: 'Problem Solving', startYear: 2010, years: currentYear - 2010 },
      { name: 'Communication', startYear: 2010, years: currentYear - 2010 },
      { name: 'Adaptability', startYear: 2010, years: currentYear - 2010 },
      { name: 'Attention to Detail', startYear: 2010, years: currentYear - 2010 }
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

    return (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${category}-${index}`}>
        <motion.div variants={skillVariants}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: '100%',
              border: `2px solid ${alpha(color, 0.3)}`,
              background: alpha(color, 0.05),
              backdropFilter: 'blur(8px)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 5px 15px ${alpha(color, 0.3)}`,
                border: `2px solid ${alpha(color, 0.5)}`,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '5px',
                background: `linear-gradient(90deg, ${alpha(color, 0.7)}, ${alpha(color, 0.2)})`,
              }
            }}
          >
            <Typography 
              sx={{ 
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '0.9rem',
                mb: 1,
                color: color
              }}
            >
              {skill.name}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
              <Chip 
                size="small"
                label={`${skill.years} YRS`}
                sx={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.5rem',
                  backgroundColor: alpha(color, 0.1),
                  color: color,
                  border: `1px solid ${alpha(color, 0.3)}`
                }}
              />
              <Chip 
                size="small"
                label={`SINCE ${skill.startYear}`}
                sx={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '0.5rem',
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                  color: theme.palette.text.secondary,
                  border: `1px solid ${alpha(theme.palette.divider, 0.3)}`
                }}
              />
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

    return (
      <Box mb={6}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontFamily: '"Press Start 2P", cursive',
            fontSize: { xs: '1rem', md: '1.2rem' },
            mb: 2,
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
          glowColor={theme.palette.secondary.main}
          sx={{ 
            mb: 2,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}
        />
        
        <Typography 
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto',
            px: 2,
            py: 1.5,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.4),
            backdropFilter: 'blur(5px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            lineHeight: 1.6
          }}
        >
          Throughout my journey as a developer, I've leveled up across multiple tech stacks and domains.
          Each skill represents experience points gained through real-world quests and challenges.
          This is my character sheet - built from over a decade of coding adventures!
        </Typography>
      </Box>

      {renderCategory('FRONTEND', 'frontend')}
      {renderCategory('BACKEND', 'backend')}
      {renderCategory('DATABASE', 'database')}
      {renderCategory('DEVOPS & TOOLS', 'devops')}
      {renderCategory('SOFT SKILLS', 'soft')}
    </Box>
  );
};
