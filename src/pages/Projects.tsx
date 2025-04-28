import { Box, Typography } from "@mui/material";

export const Projects = () => {
  return (
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          mb: 4
        }}
      >
        Projects
      </Typography>
      <Typography>
        [Your projects content goes here]
      </Typography>
    </Box>
  );
}; 