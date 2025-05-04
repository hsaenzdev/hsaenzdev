import { useEffect, useRef } from "react";
import { Typography, useTheme, Box } from "@mui/material";
import { motion } from "framer-motion";

interface GlowingTextProps {
  text: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: string;
  glowColor?: string;
  glowIntensity?: number;
  className?: string;
  sx?: any;
}

export const GlowingText = ({
  text,
  variant = "h1",
  color,
  glowColor,
  glowIntensity = 10,
  className,
  sx = {},
}: GlowingTextProps) => {
  const theme = useTheme();
  const textRef = useRef<HTMLElement>(null);

  // Use provided colors or fallbacks
  const textColor = color || "#ffffff";
  const textGlowColor = glowColor || theme.palette.primary.main;

  useEffect(() => {
    if (!textRef.current) return;

    const animateGlow = () => {
      // Subtle pulse effect for the glow
      const intensity =
        glowIntensity + Math.sin(Date.now() * 0.001) * (glowIntensity * 0.3);
      textRef.current!.style.textShadow = `0 0 ${intensity}px ${textGlowColor}`;
    };

    const interval = setInterval(animateGlow, 16); // ~60fps

    return () => clearInterval(interval);
  }, [glowIntensity, textGlowColor]);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <Typography
        ref={textRef}
        variant={variant}
        className={className}
        sx={{
          fontFamily: '"Press Start 2P", cursive',
          color: textColor,
          textShadow: `0 0 ${glowIntensity}px ${textGlowColor}`,
          ...sx,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
