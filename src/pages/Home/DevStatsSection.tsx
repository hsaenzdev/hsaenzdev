import { Box, Typography, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import BuildIcon from '@mui/icons-material/Build';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SchoolIcon from '@mui/icons-material/School';

export const DevStatsSection = () => {
  const theme = useTheme();
  
  // Developer stats as retro game attributes focused on recruiter-valued qualities
  const devStats = [
    { 
      icon: <WorkHistoryIcon />, 
      label: "Experience", 
      value: "10+", 
      unit: "YRS", 
      color: theme.palette.accent1.main,
    },
    { 
      icon: <BuildIcon />, 
      label: "Projects", 
      value: "8+", 
      unit: "MAJOR", 
      color: theme.palette.primary.main,
    },
    { 
      icon: <PsychologyIcon />, 
      label: "Problem Solving", 
      value: "MASTER", 
      unit: "", 
      color: "#00F5D4",
    },
    { 
      icon: <SchoolIcon />, 
      label: "Adaptability", 
      value: "EXPERT", 
      unit: "", 
      color: theme.palette.error.main, // Different color for distinction
    },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        padding: 2.5,
        maxWidth: { xs: '100%', sm: '230px' },
        height: 'fit-content',
        position: 'relative',
      }}
    >
      {/* Stats Grid */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {devStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.8,
                p: 0.8,
                borderRadius: '8px',
                background: `linear-gradient(120deg, ${alpha(stat.color, 0.12)} 0%, transparent 100%)`,
                border: `1px solid ${alpha(stat.color, 0.2)}`,
                boxShadow: `0 0 8px ${alpha(stat.color, 0.08)}`,
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateX(5px) scale(1.03)',
                  background: `linear-gradient(120deg, ${alpha(stat.color, 0.2)} 0%, transparent 100%)`,
                  boxShadow: `0 0 12px ${alpha(stat.color, 0.15)}`,
                  '& .stat-icon': {
                    transform: 'scale(1.1) rotate(5deg)',
                    boxShadow: `0 0 12px ${stat.color}`,
                  },
                  '& .stat-value': {
                    transform: 'scale(1.05)',
                    textShadow: `0 0 8px ${stat.color}`,
                  }
                }
              }}
            >
              {/* Icon with animated background */}
              <Box
                className="stat-icon"
                sx={{
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  p: 0.8,
                  backgroundColor: alpha(stat.color, 0.12),
                  boxShadow: `0 0 8px ${alpha(stat.color, 0.15)}`,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at center, ${alpha(stat.color, 0.3)} 0%, transparent 70%)`,
                    opacity: 0.5,
                    transform: 'scale(0)',
                    transition: 'transform 0.5s ease',
                  },
                  '&:hover::after': {
                    transform: 'scale(1.5)',
                  }
                }}
              >
                {stat.icon}
              </Box>
              
              {/* Label and value */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    fontSize: '0.55rem',
                    color: theme.palette.text.secondary,
                    fontFamily: '"Press Start 2P", monospace',
                    mb: 0.4,
                  }}
                >
                  {stat.label}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.6 }}>
                  <Typography
                    className="stat-value"
                    variant="body2"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      fontFamily: '"Press Start 2P", monospace',
                      color: stat.color,
                      textShadow: `0 0 5px ${alpha(stat.color, 0.5)}`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  {stat.unit && (
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '0.55rem',
                        color: theme.palette.text.secondary,
                        opacity: 0.8,
                      }}
                    >
                      {stat.unit}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}; 