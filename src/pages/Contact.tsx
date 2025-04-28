import { Box, Typography, Paper, TextField, Button, useTheme } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import SendIcon from '@mui/icons-material/Send';

export const Contact = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4),
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ 
          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
          color: theme.palette.primary.main,
          mb: 4,
          textAlign: 'center'
        }}
      >
        Game Over?
      </Typography>
      
      <Box sx={{ maxWidth: 800, mx: 'auto', width: '100%' }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            border: `2px solid ${theme.palette.primary.main}`,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '1rem',
              color: theme.palette.primary.main,
              mb: 3,
              textAlign: 'center'
            }}
          >
            Continue The Adventure
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
            Ready to collaborate or have questions? Send me a message and I'll get back to you!
          </Typography>
          
          <Box component="form" sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              margin="normal"
              InputProps={{
                sx: {
                  borderRadius: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.accent1.main
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main
                  }
                }
              }}
            />
            
            <TextField
              fullWidth
              label="Your Email"
              variant="outlined"
              margin="normal"
              InputProps={{
                sx: {
                  borderRadius: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.accent2.main
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main
                  }
                }
              }}
            />
            
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              InputProps={{
                sx: {
                  borderRadius: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.accent3.main
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main
                  }
                }
              }}
            />
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ 
                mt: 2,
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: '0.8rem',
                py: 1.5
              }}
              endIcon={<SendIcon />}
            >
              SEND
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 3 }}>
            <Paper
              elevation={2}
              sx={{ 
                p: 1.5, 
                borderRadius: '50%',
                background: theme.palette.primary.main,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            >
              <EmailIcon sx={{ color: 'white' }} />
            </Paper>
            
            <Paper
              elevation={2}
              sx={{ 
                p: 1.5, 
                borderRadius: '50%',
                background: theme.palette.accent1.main,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            >
              <GitHubIcon sx={{ color: 'white' }} />
            </Paper>
            
            <Paper
              elevation={2}
              sx={{ 
                p: 1.5, 
                borderRadius: '50%',
                background: theme.palette.accent2.main,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            >
              <LinkedInIcon sx={{ color: 'white' }} />
            </Paper>
            
            <Paper
              elevation={2}
              sx={{ 
                p: 1.5, 
                borderRadius: '50%',
                background: theme.palette.accent3.main,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            >
              <TwitterIcon sx={{ color: 'white' }} />
            </Paper>
          </Box>
          
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block', 
              textAlign: 'center',
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '0.6rem'
            }}
          >
            PRESS SEND TO CONTINUE
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}; 