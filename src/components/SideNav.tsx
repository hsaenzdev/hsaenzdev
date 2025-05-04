import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Paper, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DownloadIcon from '@mui/icons-material/Download';
import { motion } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Skills', icon: <CodeIcon />, path: '/skills' },
  { text: 'Experience', icon: <BusinessCenterIcon />, path: '/experience' },
];

// Social links
const socialLinks = [
  { text: 'GitHub', icon: <GitHubIcon />, url: 'https://github.com/hsaenzdev' },
  { text: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/saenzo/' },
  { text: 'Resume', icon: <DownloadIcon />, url: '/resume.pdf' }
];

export const SideNav = () => {
  const location = useLocation();
  const { mode } = useThemeContext();
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
        display: 'flex',
        flexDirection: 'column',
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
      
      {/* Logo Header */}
      <Box 
        sx={{ 
          py: 5,
          px: 3,
          display: 'flex', 
          alignItems: 'center',
          borderBottom: `2px solid ${theme.palette.divider}`,
        }}
      >
        {/* Name and subtitle with proper alignment */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%',
        }}>
          {/* Main name */}
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '1.6rem',
              letterSpacing: '0.05em',
              mb: 0.7,
              textShadow: `2px 2px 0px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'}`,
            }}
          >
            <Box component="span" sx={{ 
              color: theme.palette.accent2.main,
              textShadow: `
                0 0 5px ${theme.palette.accent2.main}60,
                0 0 10px ${theme.palette.accent2.main}40
              `,
              filter: `drop-shadow(0 0 3px ${theme.palette.accent2.main})`,
              mr: 1
            }}>
              &lt;&gt;
            </Box>
            <Box component="span" sx={{ 
              color: theme.palette.primary.main,
              textShadow: `
                0 0 5px ${theme.palette.primary.main}60,
                0 0 10px ${theme.palette.primary.main}40
              `,
              filter: `drop-shadow(0 0 3px ${theme.palette.primary.main})`,
            }}>
              HSAENZ
            </Box>
          </Typography>
          
          {/* Subtitle with right alignment to match the image */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 0.6,
            mt: -0.5,
            pr: 0.5,
          }}>
            <VideogameAssetIcon sx={{ 
              fontSize: '0.9rem', 
              color: theme.palette.accent3.main,
              filter: `drop-shadow(0 0 3px ${theme.palette.accent3.main}70)`,
            }} />
            <Typography 
              component="div" 
              sx={{ 
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: theme.palette.accent3.main,
                textShadow: `0 0 3px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
              }}
            >
              DEV QUEST
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* MAIN QUESTS Section */}
      <Box sx={{ px: 2, py: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.7rem',
            color: '#00BFFF',
            mb: 1,
            pl: 2,
            letterSpacing: '0.1em'
          }}
        >
          MAIN QUESTS
        </Typography>
        
        <Box sx={{ pr: 3 }}>
          <List sx={{ p: 0 }}>
            {menuItems.map((item, index) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 2 }}>
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
      
      {/* Divider after MAIN QUESTS */}
      <Box 
        sx={{ 
          borderBottom: `2px solid ${theme.palette.divider}`,
        }}
      />
      
      {/* QUEST ITEMS Section (merged Resume and Contact) */}
      <Box sx={{ px: 2, py: 3, flex: 1 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.7rem',
            color: theme.palette.accent1.main,
            mb: 2,
            pl: 2,
            letterSpacing: '0.1em'
          }}
        >
          QUEST ITEMS
        </Typography>
        
        {/* Resource links as a list */}
        <List sx={{ p: 0 }}>
          {socialLinks.map((link) => (
            <ListItem disablePadding sx={{ mb: 2 }} key={link.text}>
              <motion.div
                style={{ width: '100%' }}
              >
                <ListItemButton
                  component="a"
                  href={link.url}
                  target="_blank"
                  sx={{
                    borderRadius: 1,
                    border: `2px solid ${theme.palette.accent2.main}`,
                    py: 0.8,
                    px: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      color: theme.palette.accent2.main,
                      minWidth: 40,
                      '& .MuiSvgIcon-root': {
                        filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.2))',
                      }
                    }}
                  >
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={link.text} 
                    primaryTypographyProps={{
                      sx: {
                        fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontSize: '0.65rem',
                        letterSpacing: '0.05em',
                        color: theme.palette.accent2.main
                      }
                    }}
                  />
                </ListItemButton>
              </motion.div>
            </ListItem>
          ))}
        </List>
      </Box>
      
      {/* Copyright bottom section */}
      <Box 
        sx={{ 
          p: 2,
          borderTop: `2px solid ${theme.palette.divider}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.5rem',
            color: mode === 'dark' ? theme.palette.accent1.main : theme.palette.accent2.main,
            letterSpacing: '0.05em',
            opacity: 0.7
          }}
        >
          © 2024 HSAENZ
        </Typography>
      </Box>
    </Paper>
  );
}; 