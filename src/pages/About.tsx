import { Box, Typography } from "@mui/material";

export const About = () => {
  return (
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          mb: 4
        }}
      >
        About Me
      </Typography>
      <Typography>
        [Your about me content goes here]
      </Typography>
    </Box>
  );
}; 