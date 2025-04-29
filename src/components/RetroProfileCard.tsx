import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface RetroProfileCardProps {
  name: string;
  title: string;
  description: string;
  avatarSrc?: string;
  stats?: {
    label: string;
    value: string | number;
    maxValue?: number;
  }[];
}

export const RetroProfileCard = ({
  name,
  title,
  description,
  avatarSrc,
  stats = []
}: RetroProfileCardProps) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          border: `4px solid ${theme.palette.primary.main}`,
          borderRadius: '8px',
          padding: 2,
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(20, 21, 57, 0.85)' 
            : 'rgba(255, 255, 255, 0.85)',
          boxShadow: `0 0 15px ${theme.palette.primary.main}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(0deg, transparent 24%, ${
              theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.03)' 
                : 'rgba(0, 0, 0, 0.03)'
            } 25%, ${
              theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.03)' 
                : 'rgba(0, 0, 0, 0.03)'
            } 26%, transparent 27%, transparent 74%, ${
              theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.03)' 
                : 'rgba(0, 0, 0, 0.03)'
            } 75%, ${
              theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.03)' 
                : 'rgba(0, 0, 0, 0.03)'
            } 76%, transparent 77%, transparent)`,
            backgroundSize: '50px 50px',
            pointerEvents: 'none',
            zIndex: 1,
          }
        }}
      >
        {/* Header */}
        <Box sx={{ 
          borderBottom: `2px solid ${theme.palette.secondary.main}`, 
          pb: 1, 
          mb: 2, 
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          {avatarSrc && (
            <Box 
              component="img"
              src={avatarSrc}
              alt={name}
              sx={{
                width: 64,
                height: 64,
                borderRadius: '8px',
                border: `2px solid ${theme.palette.primary.main}`,
                boxShadow: `0 0 5px ${theme.palette.primary.light}`,
                objectFit: 'cover',
              }}
            />
          )}
          <Box>
            <Typography variant="h6" fontFamily="'Press Start 2P', cursive" fontSize="0.9rem">
              {name}
            </Typography>
            <Typography variant="body2" color={theme.palette.accent1.main} fontWeight="bold">
              {title}
            </Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2, 
            px: 1,
            fontFamily: 'Roboto, sans-serif',
            color: theme.palette.text.secondary,
            fontSize: '0.9rem',
            lineHeight: 1.5
          }}
        >
          {description}
        </Typography>

        {/* Stats */}
        {stats.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {stats.map((stat, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography 
                    variant="caption" 
                    fontFamily="'Press Start 2P', cursive" 
                    fontSize="0.6rem"
                  >
                    {stat.label}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    fontFamily="'Press Start 2P', cursive" 
                    fontSize="0.6rem"
                  >
                    {stat.value}{stat.maxValue ? `/${stat.maxValue}` : ''}
                  </Typography>
                </Box>
                {stat.maxValue && (
                  <Box 
                    sx={{ 
                      width: '100%', 
                      height: 10, 
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)', 
                      borderRadius: 1,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      component={motion.div}
                      initial={{ width: 0 }}
                      animate={{ width: `${(Number(stat.value) / stat.maxValue) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                      sx={{
                        height: '100%',
                        backgroundColor: theme.palette.accent2.main,
                        boxShadow: `0 0 5px ${theme.palette.accent2.main}`,
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </motion.div>
  );
}; 