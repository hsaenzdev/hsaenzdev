import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Paper, useTheme, Button, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import DownloadIcon from '@mui/icons-material/Download';
import { motion } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/hsaenz-portfolio' },
  { text: 'Projects', icon: <WorkIcon />, path: '/hsaenz-portfolio/projects' },
  { text: 'Skills', icon: <CodeIcon />, path: '/hsaenz-portfolio/skills' },
  { text: 'Experience', icon: <BusinessCenterIcon />, path: '/hsaenz-portfolio/experience' },
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
      
      {/* Menu */}
      <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.7rem',
            color: theme.palette.text.secondary,
            mb: 1,
            pl: 2,
            textShadow: `0 0 2px ${theme.palette.text.secondary}70`,
            filter: `drop-shadow(0 0 1px ${theme.palette.text.secondary})`
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
        
        {/* Divider between sections */}
        <Box 
          sx={{ 
            borderTop: `2px solid ${theme.palette.divider}`,
            my: 3,
            mx: 0
          }}
        />
        
        {/* Contact Section */}
        <Box sx={{ 
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
        }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '0.7rem',
              color: theme.palette.text.secondary,
              mb: 0.5,
              alignSelf: 'flex-start',
              pl: 2,
              textShadow: `0 0 2px ${theme.palette.text.secondary}70`,
              filter: `drop-shadow(0 0 1px ${theme.palette.text.secondary})`
            }}
          >
            CONTACT
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Tooltip title="Email">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton 
                  component="a" 
                  href="mailto:hello@hsaenz.dev" 
                  target="_blank"
                  sx={{ 
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                    width: 36,
                    height: 36,
                  }}
                >
                  <EmailIcon fontSize="small" />
                </IconButton>
              </motion.div>
            </Tooltip>
            
            <Tooltip title="GitHub">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton 
                  component="a" 
                  href="https://github.com/hsaenzdev" 
                  target="_blank" 
                  sx={{ 
                    backgroundColor: theme.palette.accent1.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.accent1.dark,
                    },
                    width: 36,
                    height: 36,
                  }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </motion.div>
            </Tooltip>
            
            <Tooltip title="LinkedIn">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton 
                  component="a" 
                  href="https://www.linkedin.com/in/saenzo" 
                  target="_blank" 
                  sx={{ 
                    backgroundColor: theme.palette.accent2.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.accent2.dark,
                    },
                    width: 36,
                    height: 36,
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </motion.div>
            </Tooltip>
            
            <Tooltip title="Twitter">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton 
                  component="a" 
                  href="https://twitter.com" 
                  target="_blank" 
                  sx={{ 
                    backgroundColor: theme.palette.accent3.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.accent3.dark,
                    },
                    width: 36,
                    height: 36,
                  }}
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
              </motion.div>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Divider between contact and resume */}
        <Box 
          sx={{ 
            borderTop: `2px solid ${theme.palette.divider}`,
            my: 3,
            mx: 0
          }}
        />
        
        {/* Resume Section */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
        }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
              fontSize: '0.7rem',
              color: theme.palette.text.secondary,
              mb: 0.5,
              alignSelf: 'flex-start',
              pl: 2,
              textShadow: `0 0 2px ${theme.palette.text.secondary}70`,
              filter: `drop-shadow(0 0 1px ${theme.palette.text.secondary})`
            }}
          >
            RESUME
          </Typography>
          
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            style={{ width: '100%' }}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<DownloadIcon />}
              component="a"
              href="/hsaenz-portfolio/assets/hsaenzresume.pdf"
              download
              sx={{ 
                fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: '0.6rem',
                py: 1,
                textTransform: 'uppercase',
                boxShadow: `0 4px 0 ${theme.palette.primary.dark}`,
                '&:hover': {
                  boxShadow: `0 2px 0 ${theme.palette.primary.dark}`,
                  transform: 'translateY(2px)',
                }
              }}
            >
              Download CV
            </Button>
          </motion.div>
        </Box>
      </Box>
      
      {/* Theme Toggle Bottom Section */}
      <Box 
        sx={{ 
          p: 2,
          borderTop: `2px solid ${theme.palette.divider}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          mt: 'auto',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.5rem',
            color: theme.palette.text.secondary,
          }}
        >
          {mode === 'dark' ? 'LIGHT' : 'DARK'} MODE
        </Typography>
        <motion.div whileTap={{ scale: 0.9 }}>
          <IconButton 
            onClick={toggleTheme} 
            size="small"
            color="inherit"
            sx={{ 
              border: `2px solid ${theme.palette.mode === 'dark' ? theme.palette.accent1.main : theme.palette.accent2.main}`,
              p: 0.5
            }}
          >
            {mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
          </IconButton>
        </motion.div>
      </Box>
    </Paper>
  );
}; 