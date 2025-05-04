// Theme configuration for retro gaming aesthetic
import { SxProps } from "@mui/material";

export interface RetroThemeColors {
  primary: string;
  secondary: string;
  accent1: string;
  accent2: string;
  accent3: string;
  accent4: string;
  background: {
    default: string;
    paper: string;
    alt: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
}

// Rarity colors for achievements and special items
export const rarityColors = {
  common: "#9e9e9e",
  uncommon: "#4caf50",
  rare: "#2196f3",
  epic: "#9c27b0",
  legendary: "#ffc107",
};

// Section header styles
export const sectionHeaderStyles: SxProps = {
  fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
  textAlign: "center",
  mb: 4,
  position: "relative",
  display: "inline-block",
  width: "100%",
};

// Retro card styles
export const retroCardStyles = (color: string): SxProps => ({
  border: `2px solid ${color}`,
  borderRadius: 2,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 10px 20px rgba(0,0,0,0.2), 0 0 0 1px ${color}`,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: `linear-gradient(90deg, ${color}, transparent)`,
  },
});

// Pixel dots background
export const pixelDotsBackground = (color: string): SxProps => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  opacity: 0.05,
  backgroundImage: `radial-gradient(${color} 2px, transparent 2px)`,
  backgroundSize: "20px 20px",
});

// Retro terminal text style
export const retroTerminalText: SxProps = {
  fontFamily: "monospace",
  color: "#33ff33",
  textShadow: "0 0 5px #33ff33",
  letterSpacing: "0.05em",
};

// 8-bit button style
export const retroButtonStyle = (color: string): SxProps => ({
  fontFamily: '"Press Start 2P", "Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: "0.7rem",
  padding: "8px 16px",
  border: `2px solid ${color}`,
  color: color,
  position: "relative",
  "&:hover": {
    backgroundColor: `${color}30`,
    "&::before": {
      opacity: 1,
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    border: `2px solid ${color}`,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
});

// Grid pattern background
export const gridBackground = (color: string): SxProps => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  opacity: 0.03,
  backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
  backgroundSize: "20px 20px",
});
