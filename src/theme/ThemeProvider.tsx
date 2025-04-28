import React, {
  useState,
  useMemo,
  ReactNode,
} from "react";
import {
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
  PaletteMode,
} from "@mui/material";
import { getAppTheme } from "./theme";
import { ThemeContext } from "./ThemeContext";

// Props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // State for managing theme mode
  const [mode, setMode] = useState<PaletteMode>("dark");

  // Toggle theme function
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Context value
  const contextValue = useMemo(() => {
    return {
      mode,
      toggleTheme,
    };
  }, [mode]);

  // Get the appropriate theme based on mode
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
