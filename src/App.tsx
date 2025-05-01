import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Portfolio } from "./pages/Portfolio";
import { ThemeProvider } from "./context/ThemeContext";
import { ParallaxProvider } from "react-scroll-parallax";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { useThemeContext } from "./context/ThemeContext";
import { getAppTheme } from "./theme/theme";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { Skills } from "./pages/Skills";
import { Experience } from "./pages/Experience";
import { Contact } from "./pages/Contact";
import { GameProvider } from "./context/GameContext";

function AppContent() {
  const { mode } = useThemeContext();
  const theme = getAppTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ParallaxProvider>
        <Routes>
          <Route path="/" element={<Portfolio />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="skills" element={<Skills />} />
            <Route path="experience" element={<Experience />} />
            <Route path="contact" element={<Contact />} />
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
        <GameProvider>
          <AppContent />
        </GameProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
