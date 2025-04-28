import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Portfolio } from "./pages/Portfolio";
import { ThemeProvider } from "./context/ThemeContext";
import { ParallaxProvider } from "react-scroll-parallax";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { useThemeContext } from "./context/ThemeContext";
import { getAppTheme } from "./theme/theme";

function AppContent() {
  const { mode } = useThemeContext();
  const theme = getAppTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ParallaxProvider>
        <Routes>
          <Route path="/" element={<Portfolio />}>
            <Route path="about" element={<div>About Me Page</div>} />
            <Route path="projects" element={<div>Projects Page</div>} />
            <Route path="skills" element={<div>Skills Page</div>} />
            <Route path="experience" element={<div>Experience Page</div>} />
            <Route path="achievements" element={<div>Achievements Page</div>} />
            <Route path="contact" element={<div>Contact Page</div>} />
          </Route>
        </Routes>
      </ParallaxProvider>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
