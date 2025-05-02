import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideNav } from "../components/SideNav";
import { ParticleBackground } from "../components/ParticleBackground";
import { InputFocusHandler } from "../components/InputFocusHandler";
import { GameScoreDisplay } from "../components/GameScoreDisplay";
import { useGameContext } from "../context/GameContext";
import { useEffect } from "react";

export const Portfolio = () => {
  const theme = useTheme();
  const { enableGame } = useGameContext();
  
  // Enable the game by default when the portfolio loads
  useEffect(() => {
    enableGame();
  }, [enableGame]);
  
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
      {/* Track input focus to prevent game activation when typing */}
      <InputFocusHandler />
      
      {/* Animated background particles and snake game */}
      <ParticleBackground />
      
      {/* Display score when game is active */}
      <GameScoreDisplay />
      
      <SideNav />
      
      <Box 
        flex={1}  
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
