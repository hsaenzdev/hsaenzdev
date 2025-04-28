import { Box, Typography } from "@mui/material";

export const Home = () => {
  return (
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          mb: 4
        }}
      >
        Welcome to My Portfolio
      </Typography>
      <Typography>
        [Your welcome message and introduction goes here]
      </Typography>
    </Box>
  );
}; 