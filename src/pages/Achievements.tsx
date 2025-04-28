import { Box, Typography, Paper, useTheme } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SchoolIcon from '@mui/icons-material/School';
import { ReactNode } from "react";

interface AchievementProps {
  title: string;
  date: string;
  description: string;
  icon: ReactNode;
  color: string;
}

const Achievement = ({ title, date, description, icon, color }: AchievementProps) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        border: `2px solid ${color}`,
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Box 
        sx={{ 
          width: 60, 
          height: 60, 
          borderRadius: '50%', 
          bgcolor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}
      >
        {icon}
      </Box>
      
      <Typography 
        variant="h6" 
        sx={{ 
          color: color,
          mb: 1,
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '0.9rem'
        }}
      >
        {title}
      </Typography>
      
      <Typography 
        variant="caption" 
        sx={{ 
          display: 'block',
          mb: 2,
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '0.6rem'
        }}
      >
        UNLOCKED: {date}
      </Typography>
      
      <Typography variant="body2">
        {description}
      </Typography>
    </Paper>
  );
};

export const Achievements = () => {
  const theme = useTheme();
  
  const achievements: AchievementProps[] = [
    {
      title: "Best Web Application Award",
      date: "2023",
      description: "Received award for developing an innovative web application that solved key business challenges.",
      icon: <EmojiEventsIcon sx={{ color: 'white', fontSize: 30 }} />,
      color: theme.palette.primary.main
    },
    {
      title: "Certified React Developer",
      date: "2022",
      description: "Completed advanced certification in React development, demonstrating expertise in modern frontend techniques.",
      icon: <WorkspacePremiumIcon sx={{ color: 'white', fontSize: 30 }} />,
      color: theme.palette.accent1.main
    },
    {
      title: "Top Contributor",
      date: "2021",
      description: "Recognized as top open-source contributor for innovations in frontend component libraries.",
      icon: <MilitaryTechIcon sx={{ color: 'white', fontSize: 30 }} />,
      color: theme.palette.accent2.main
    },
    {
      title: "Computer Science Degree",
      date: "2016",
      description: "Graduated with honors in Computer Science, specializing in web technologies and interactive applications.",
      icon: <SchoolIcon sx={{ color: 'white', fontSize: 30 }} />,
      color: theme.palette.accent3.main
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
        Trophy Room
      </Typography>
      
      <Box 
        sx={{
          display: 'flex', 
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {achievements.map((achievement, index) => (
          <Box 
            key={index}
            sx={{
              width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(25% - 24px)' },
              minWidth: '250px'
            }}
          >
            <Achievement 
              title={achievement.title}
              date={achievement.date}
              description={achievement.description}
              icon={achievement.icon}
              color={achievement.color}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}; 