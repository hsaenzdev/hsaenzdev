import { Box, Typography, Paper, useTheme, Divider } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import { ReactNode } from "react";

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string[];
  icon: ReactNode;
  color: string;
}

const ExperienceItem = ({ title, company, period, description, icon, color }: ExperienceItemProps) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        border: `2px solid ${color}`,
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
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
            justifyContent: 'center'
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
          border: `1px solid ${theme.palette.text.secondary}`,
          borderRadius: 1,
        }}
      >
        <Typography variant="caption" sx={{ fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif', fontSize: '0.6rem' }}>
          QUEST DURATION: {period}
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Typography variant="body2" sx={{ mb: 1 }}>
        Mission Objectives:
      </Typography>
      
      <Box component="ul" sx={{ pl: 2, mt: 0 }}>
        {description.map((item, index) => (
          <Box component="li" key={index} sx={{ mb: 1 }}>
            <Typography variant="body2">
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export const Experience = () => {
  const theme = useTheme();
  
  const experiences: ExperienceItemProps[] = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2021 - Present",
      description: [
        "Led a team of 5 developers to build a complex web application",
        "Implemented modern React patterns and practices",
        "Improved site performance by 40%",
        "Mentored junior developers"
      ],
      icon: <WorkIcon sx={{ color: 'white' }} />,
      color: theme.palette.primary.main
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "2018 - 2021",
      description: [
        "Developed responsive websites for various clients",
        "Created reusable component libraries",
        "Worked with design team to implement pixel-perfect interfaces",
        "Introduced TypeScript to improve code quality"
      ],
      icon: <WorkIcon sx={{ color: 'white' }} />,
      color: theme.palette.accent1.main
    },
    {
      title: "Junior Web Developer",
      company: "Startup Innovations",
      period: "2016 - 2018",
      description: [
        "Built and maintained company website",
        "Developed internal tools using JavaScript",
        "Assisted with UI/UX improvements",
        "Learned modern web development practices"
      ],
      icon: <WorkIcon sx={{ color: 'white' }} />,
      color: theme.palette.accent2.main
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          color: theme.palette.primary.main,
          mb: 4,
          textAlign: 'center'
        }}
      >
        Quest Journal
      </Typography>
      
      <Box 
        sx={{
          maxWidth: 800,
          mx: 'auto',
          width: '100%'
        }}
      >
        {experiences.map((experience, index) => (
          <ExperienceItem
            key={index}
            title={experience.title}
            company={experience.company}
            period={experience.period}
            description={experience.description}
            icon={experience.icon}
            color={experience.color}
          />
        ))}
      </Box>
    </Box>
  );
}; 