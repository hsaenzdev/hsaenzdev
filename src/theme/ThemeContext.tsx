import { createContext, useContext } from "react";
import { PaletteMode } from "@mui/material";

// Create a theme context to manage theme state
export type ThemeContextType = {
  mode: PaletteMode;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleTheme: () => {},
});

// Custom hook for accessing theme context
export const useTheme = () => useContext(ThemeContext);