import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideNav } from "../components/SideNav";

export const Portfolio = () => {
  const theme = useTheme();
  
  return (
    <Box 
      display="flex" 
      flexDirection="row" 
      height="100vh"
      sx={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Retro grid background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(transparent, ${theme.palette.background.default})`,
          backgroundSize: '40px 40px',
          backgroundImage: `linear-gradient(to right, ${theme.palette.divider} 1px, transparent 1px),
                           linear-gradient(to bottom, ${theme.palette.divider} 1px, transparent 1px)`,
          opacity: 0.4,
          zIndex: 0
        }}
      />
      
      {/* Animated pixel dots */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.5,
          zIndex: 0,
          backgroundImage: `radial-gradient(circle, ${theme.palette.primary.main} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          animation: 'pixelate 30s infinite linear',
          '@keyframes pixelate': {
            '0%': {
              backgroundPosition: '0 0'
            },
            '100%': {
              backgroundPosition: '30px 30px'
            }
          }
        }}
      />
      
      <SideNav />
      
      <Box 
        flex={1} 
        p={0} 
        sx={{ 
          overflow: 'auto',
          position: 'relative',
          zIndex: 1,
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.background.default,
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            borderRadius: '2px',
            border: `3px solid ${theme.palette.background.default}`,
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
