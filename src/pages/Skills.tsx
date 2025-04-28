import { Box, Typography } from "@mui/material";

export const Skills = () => {
  return (
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          mb: 4
        }}
      >
        Skills
      </Typography>
      <Typography>
        [Your skills content goes here]
      </Typography>
    </Box>
  );
}; 