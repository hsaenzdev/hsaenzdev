import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideNav } from "../components/SideNav";
import { ParticleBackground } from "../components/ParticleBackground";

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
      {/* Animated background particles */}
      <ParticleBackground />
      
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
