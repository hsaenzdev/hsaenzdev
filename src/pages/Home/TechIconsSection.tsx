import { Box, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { TECH_ICONS } from "./constants";

interface TechIconsSectionProps {
  techIcons?: Array<{
    label: string;
    icon: string;
    color: string;
  }>;
}

export const TechIconsSection = ({ techIcons = TECH_ICONS }: TechIconsSectionProps) => {
  const theme = useTheme();
  
  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'CodeIcon':
        return <CodeIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.accent1.main }} />;
      case 'StorageIcon':
        return <StorageIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.accent2.main }} />;
      case 'WebIcon':
        return <WebIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.accent3.main }} />;
      case 'PsychologyIcon':
        return <PsychologyIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: theme.palette.primary.main }} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        pb: { xs: 2, md: 3 },
      }}
    >
      <Stack
        direction="row"
        spacing={{ xs: 4, sm: 5, md: 6 }}
        sx={{ 
          px: 3,
          py: 1.5,
          borderRadius: 2,
          backgroundColor: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {techIcons.map((icon, index) => (
          <Stack key={index} direction="column" alignItems="center">
            {getIconComponent(icon.icon)}
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, 
                color: '#fff' 
              }}
            >
              {icon.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}; 