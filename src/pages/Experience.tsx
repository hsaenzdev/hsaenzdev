import { Box, Typography, Paper, useTheme, Divider, Button } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import { ReactNode, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { GlowingText } from "../components/GlowingText";
import { motion } from "framer-motion";

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string[];
  icon: ReactNode;
  color: string;
  rewards?: string[];
}

const ExperienceItem = ({ title, company, period, description, icon, color, rewards = [] }: ExperienceItemProps) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          border: `2px solid ${color}`,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: `0 10px 20px rgba(0,0,0,0.2), 0 0 0 1px ${color}`,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: `linear-gradient(90deg, ${color}, ${theme.palette.background.default})`,
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box 
            sx={{ 
              mr: 2, 
              width: 50, 
              height: 50, 
              borderRadius: '50%', 
              bgcolor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 10px ${color}80`,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color,
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: '0.9rem'
              }}
            >
              {title}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
              {company}
            </Typography>
          </Box>
        </Box>
        
        <Box 
          sx={{ 
            display: 'inline-block',
            px: 1.5,
            py: 0.5,
            mb: 2,
            bgcolor: `${color}20`,
            border: `1px solid ${color}`,
            borderRadius: 1,
          }}
        >
          <Typography variant="caption" sx={{ fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif', fontSize: '0.6rem' }}>
            QUEST DURATION: {period}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box 
            sx={{ 
              width: 20, 
              height: 20, 
              borderRadius: '50%', 
              bgcolor: expanded ? theme.palette.accent2.main : theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowForwardIosIcon 
              sx={{ 
                fontSize: 12, 
                color: 'white',
                transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }} 
            />
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '0.6rem',
              color: expanded ? theme.palette.accent2.main : theme.palette.primary.main,
              transition: 'color 0.3s ease',
            }}
          >
            Mission Objectives:
          </Typography>
        </Box>
        
        <Box 
          component="ul" 
          sx={{ 
            pl: 2, 
            mt: 0,
            maxHeight: expanded ? '1000px' : '100px',
            overflow: expanded ? 'visible' : 'hidden',
            transition: 'max-height 0.5s ease',
            position: 'relative',
            '&::after': !expanded ? {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50px',
              background: `linear-gradient(to top, ${theme.palette.background.paper}, transparent)`,
            } : {},
          }}
        >
          {description.map((item, index) => (
            <Box component="li" key={index} sx={{ mb: 1 }}>
              <Typography variant="body2">
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
        
        {description.length > 3 && (
          <Button 
            variant="text" 
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{
              mt: 1,
              color: expanded ? theme.palette.accent2.main : theme.palette.primary.main,
              fontSize: '0.7rem',
              '&:hover': {
                backgroundColor: expanded ? `${theme.palette.accent2.main}10` : `${theme.palette.primary.main}10`,
              }
            }}
          >
            {expanded ? "CLOSE QUEST LOG" : "VIEW FULL QUEST LOG"}
          </Button>
        )}
        
        {rewards.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                  fontSize: '0.6rem',
                  color: theme.palette.accent1.main,
                }}
              >
                Quest Rewards:
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {rewards.map((reward, index) => (
                <Box 
                  key={index}
                  sx={{
                    px: 1,
                    py: 0.5,
                    bgcolor: `${theme.palette.accent1.main}20`,
                    border: `1px solid ${theme.palette.accent1.main}`,
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  {reward}
                </Box>
              ))}
            </Box>
          </>
        )}
      </Paper>
    </motion.div>
  );
};

export const Experience = () => {
  const theme = useTheme();
  
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Sonatafy Technology",
      period: "Jun 2022 - Present",
      description: [
        "Developed interactive data visualization dashboards using amCharts",
        "Collaborated on full-stack features using TypeScript/React, Material UI, Elixir/Phoenix, and Java",
        "Implemented feature flags with Launch Darkly",
        "Improved platform performance through caching, memoization, and workflow optimizations",
        "Recommended and implemented key architectural changes for platform V3",
        "Streamlined development processes by improving CI/CD pipelines",
        "Participated in QA/UX reviews"
      ],
      icon: <WorkIcon sx={{ color: 'white' }} />,
      color: theme.palette.primary.main,
      rewards: ["TypeScript Master", "React Champion", "Performance Guru"]
    },
    {
      title: "Full Stack Developer",
      company: "Classifile de México",
      period: "2014 - 2021",
      description: [
        "Led the development of a document management platform",
        "Developed a secure cloud storage and sync service",
        "Created an intuitive file classification system",
        "Built custom integrations using C#",
        "Led all aspects of development, from design and implementation to testing and deployment, using PHP, JavaScript, and C#"
      ],
      icon: <WorkIcon sx={{ color: 'white' }} />,
      color: theme.palette.accent1.main,
      rewards: ["Cloud Storage Expert", "Full-Stack Specialist"]
    },
    {
      title: "Computer Science Student",
      company: "Universidad Autónoma de Tamaulipas",
      period: "2010 - 2015",
      description: [
        "Built a student database system for the university library",
        "Completed coursework in Computer Science"
      ],
      icon: <SchoolIcon sx={{ color: 'white' }} />,
      color: theme.palette.accent2.main
    }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: '5%',
          left: '5%',
          width: '90%',
          height: '90%',
          opacity: 0.03,
          border: '2px solid',
          borderColor: theme.palette.primary.main,
          pointerEvents: 'none',
        }}
      />
      
      <Box 
        sx={{ 
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '80%',
          height: '80%',
          opacity: 0.02,
          border: '2px solid',
          borderColor: theme.palette.secondary.main,
          pointerEvents: 'none',
        }}
      />
      
      <GlowingText 
        text="Quest Journal"
        variant="h3"
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          color: theme.palette.primary.main,
          mb: 4,
          textAlign: 'center'
        }}
        glowColor={theme.palette.primary.main}
      />
      
      <Box 
        sx={{
          maxWidth: 800,
          mx: 'auto',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Experience timeline connector */}
        <Box
          sx={{
            position: 'absolute',
            left: '25px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.accent3.main})`,
            zIndex: -1,
          }}
        />
        
        {experiences.map((experience, index) => (
          <ExperienceItem
            key={index}
            title={experience.title}
            company={experience.company}
            period={experience.period}
            description={experience.description}
            icon={experience.icon}
            color={experience.color}
            rewards={experience.rewards}
          />
        ))}
        
        <Box
          sx={{
            p: 2,
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <Typography 
            variant="body2"
            sx={{
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '0.7rem',
              color: theme.palette.primary.main,
              display: 'inline-block',
              px: 2,
              py: 1,
              border: `1px dashed ${theme.palette.primary.main}`,
              borderRadius: 1,
            }}
          >
            More quests available soon...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}; 