import { Box, Typography, useTheme, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CloudIcon from '@mui/icons-material/Cloud';
import BuildIcon from '@mui/icons-material/Build';

export const DevStatsSection = () => {
  const theme = useTheme();
  
  // Developer stats as retro game attributes
  const devStats = [
    { 
      icon: <WorkHistoryIcon />, 
      label: "Experience", 
      value: "10+", 
      unit: "YRS", 
      color: theme.palette.accent1.main 
    },
    { 
      icon: <CodeIcon />, 
      label: "Frontend", 
      value: "97", 
      unit: "%", 
      color: theme.palette.primary.main 
    },
    { 
      icon: <BuildIcon />, 
      label: "Backend", 
      value: "92", 
      unit: "%", 
      color: theme.palette.accent2.main 
    },
    { 
      icon: <StorageIcon />, 
      label: "Database", 
      value: "88", 
      unit: "%", 
      color: theme.palette.accent3.main 
    },
    { 
      icon: <CloudIcon />, 
      label: "Cloud", 
      value: "AWS", 
      unit: "Cert", 
      color: theme.palette.accent1.dark 
    },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        background: `linear-gradient(145deg, ${theme.palette.background.paper}90, ${theme.palette.background.default}70)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        padding: 2,
        boxShadow: `0 4px 20px rgba(0,0,0,0.15), inset 0 1px 1px ${theme.palette.primary.main}20`,
        maxWidth: { xs: '100%', sm: '220px' },
        height: 'fit-content',
      }}
    >
      {/* Stats Title */}
      <Typography
        variant="subtitle1"
        component={motion.div}
        initial={{ y: -5 }}
        animate={{ y: 0 }}
        sx={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.7rem',
          color: theme.palette.text.secondary,
          mb: 2,
          textAlign: 'center',
          letterSpacing: '1px',
          textShadow: `0 0 5px ${theme.palette.primary.main}40`,
          borderBottom: `1px solid ${theme.palette.divider}`,
          paddingBottom: 1,
        }}
      >
        PLAYER STATS
      </Typography>

      {/* Stats Grid */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        {devStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Tooltip title={`${stat.label}: ${stat.value} ${stat.unit}`} placement="left">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 0.75,
                  borderRadius: '4px',
                  background: `linear-gradient(to right, ${stat.color}15, transparent)`,
                  border: `1px solid ${stat.color}30`,
                  boxShadow: `0 0 5px ${stat.color}15`,
                  transition: 'all 0.2s ease',
                  overflow: 'hidden',
                  '&:hover': {
                    background: `linear-gradient(to right, ${stat.color}25, transparent)`,
                    boxShadow: `0 0 8px ${stat.color}30`,
                    transform: 'translateX(-3px)',
                  },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    color: stat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    p: 0.5,
                    backgroundColor: `${stat.color}20`,
                    boxShadow: `0 0 5px ${stat.color}30`,
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
                      mb: 0.25,
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        fontFamily: '"Press Start 2P", monospace',
                        color: stat.color,
                        textShadow: `0 0 3px ${stat.color}50`,
                      }}
                    >
                      {stat.value}
                    </Typography>
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
                  </Box>
                </Box>
              </Box>
            </Tooltip>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}; 