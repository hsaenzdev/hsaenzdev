import { Box, Typography } from "@mui/material";

export const Achievements = () => {
  return (
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          mb: 4
        }}
      >
        Achievements
      </Typography>
      <Typography>
        [Your achievements content goes here]
      </Typography>
    </Box>
  );
}; 