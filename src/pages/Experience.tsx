import { Box, Typography } from "@mui/material";

export const Experience = () => {
  return (
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          mb: 4
        }}
      >
        Experience
      </Typography>
      <Typography>
        [Your experience content goes here]
      </Typography>
    </Box>
  );
}; 