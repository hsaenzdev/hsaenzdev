import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from "../context/ThemeContext";

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'About Me', icon: <PersonIcon />, path: '/about' },
  { text: 'Projects', icon: <WorkIcon />, path: '/projects' },
  { text: 'Skills', icon: <CodeIcon />, path: '/skills' },
  { text: 'Experience', icon: <BusinessCenterIcon />, path: '/experience' },
  { text: 'Achievements', icon: <EmojiEventsIcon />, path: '/achievements' },
  { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
];

export const SideNav = () => {
  const location = useLocation();
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Box 
      width={280} 
      p={4} 
      sx={{ 
        backgroundColor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold',
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1rem',
            letterSpacing: '0.1em'
          }}
        >
          Portfolio
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <Box 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}; 