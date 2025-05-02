import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Paper, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { motion } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/hsaenz-portfolio' },
  { text: 'Projects', icon: <WorkIcon />, path: '/hsaenz-portfolio/projects' },
  { text: 'Skills', icon: <CodeIcon />, path: '/hsaenz-portfolio/skills' },
  { text: 'Experience', icon: <BusinessCenterIcon />, path: '/hsaenz-portfolio/experience' },
  { text: 'Contact', icon: <ContactMailIcon />, path: '/hsaenz-portfolio/contact' },
];

export const SideNav = () => {
  const location = useLocation();
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  
  // Animate active menu item
  const [activeMenuIndex, setActiveMenuIndex] = useState<number>(-1);
  
  useEffect(() => {
    const index = menuItems.findIndex(item => item.path === location.pathname);
    setActiveMenuIndex(index);
  }, [location.pathname]);
  
  return (
    <Paper
      elevation={3}
      sx={{ 
        width: 280, 
        height: '100%',
        borderRadius: 0,
        border: 'none',
        borderRight: `4px solid ${theme.palette.primary.main}`,
        background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Pixelated border effect */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '8px',
          height: '100%',
          background: `repeating-linear-gradient(
            0deg,
            ${theme.palette.primary.dark} 0px,
            ${theme.palette.primary.dark} 8px,
            ${theme.palette.primary.main} 8px,
            ${theme.palette.primary.main} 16px
          )`,
          opacity: 0.8
        }}
      />
      
      {/* Header */}
      <Box 
        sx={{ 
          p: 3,
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          borderBottom: `2px solid ${theme.palette.divider}`
        }}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <SportsEsportsIcon 
            sx={{ 
              fontSize: 50, 
              color: theme.palette.primary.main,
              mb: 1
            }} 
          />
        </motion.div>
        
        <Typography 
          variant="h5" 
          sx={{ 
            textTransform: 'uppercase',
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.2rem',
            textAlign: 'center',
            mb: 1,
            color: theme.palette.primary.main
          }}
        >
          Dev Quest
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <IconButton 
              onClick={toggleTheme} 
              color="inherit"
              sx={{ 
                border: `2px solid ${theme.palette.mode === 'dark' ? theme.palette.accent1.main : theme.palette.accent2.main}`,
                p: 1
              }}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </motion.div>
          
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              border: `2px solid ${theme.palette.accent3.main}`,
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <VideogameAssetIcon fontSize="small" />
            <Typography
              variant="caption"
              sx={{
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: '0.6rem'
              }}
            >
              PLAYER 1
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Menu */}
      <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.7rem',
            color: theme.palette.text.secondary,
            mb: 1,
            pl: 2
          }}
        >
          MAIN QUESTS
        </Typography>
        
        <Box sx={{ pr: 3 }}>
          <List sx={{ p: 0 }}>
            {menuItems.map((item, index) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1.5 }}>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ 
                    x: activeMenuIndex === index ? 8 : 0,
                    scale: activeMenuIndex === index ? 1.02 : 1
                  }}
                  style={{ width: '100%' }}
                >
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={location.pathname === item.path}
                    sx={{
                      borderRadius: 1,
                      border: location.pathname === item.path 
                        ? `2px solid ${theme.palette.primary.main}` 
                        : `2px solid transparent`,
                      mb: 0.5,
                      px: 2,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.15)',
                        },
                      },
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                        minWidth: 40
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{
                        sx: {
                          fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                          fontSize: '0.7rem',
                          letterSpacing: '0.05em'
                        }
                      }}
                    />
                  </ListItemButton>
                </motion.div>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      
      {/* Footer */}
      <Box 
        sx={{ 
          p: 2,
          borderTop: `2px solid ${theme.palette.divider}`,
          textAlign: 'center'
        }}
      >
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block',
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.6rem',
            color: theme.palette.text.secondary
          }}
        >
          PRESS START
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block',
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.6rem',
            color: theme.palette.text.secondary,
            mt: 0.5
          }}
        >
          TO CONTINUE
        </Typography>
      </Box>
    </Paper>
  );
}; 