import { Box, Typography } from "@mui/material";

export const Contact = () => {
  return (
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          mb: 4
        }}
      >
        Contact
      </Typography>
      <Typography>
        [Your contact information goes here]
      </Typography>
    </Box>
  );
}; 