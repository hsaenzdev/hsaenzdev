import { useTheme, IconButton } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        color:
          mode === "dark"
            ? theme.palette.accent1.main
            : theme.palette.accent2.main,
        border: `2px solid ${mode === "dark" ? theme.palette.accent1.main : theme.palette.accent2.main}`,
        p: 1,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.1)",
          boxShadow: `0 0 8px ${mode === "dark" ? theme.palette.accent1.main : theme.palette.accent2.main}`,
        },
      }}
    >
      {mode === "dark" ? (
        <LightModeIcon
          sx={{
            filter: `drop-shadow(0 0 4px ${theme.palette.accent1.main})`,
            animation: "pulse 2s infinite ease-in-out",
            "@keyframes pulse": {
              "0%": {
                filter: `drop-shadow(0 0 2px ${theme.palette.accent1.main})`,
              },
              "50%": {
                filter: `drop-shadow(0 0 6px ${theme.palette.accent1.main})`,
              },
              "100%": {
                filter: `drop-shadow(0 0 2px ${theme.palette.accent1.main})`,
              },
            },
          }}
        />
      ) : (
        <DarkModeIcon
          sx={{
            filter: `drop-shadow(0 0 4px ${theme.palette.accent2.main})`,
            animation: "glow 2s infinite ease-in-out",
            "@keyframes glow": {
              "0%": {
                filter: `drop-shadow(0 0 2px ${theme.palette.accent2.main})`,
              },
              "50%": {
                filter: `drop-shadow(0 0 6px ${theme.palette.accent2.main})`,
              },
              "100%": {
                filter: `drop-shadow(0 0 2px ${theme.palette.accent2.main})`,
              },
            },
          }}
        />
      )}
    </IconButton>
  );
};
