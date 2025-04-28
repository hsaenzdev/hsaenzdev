import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Portfolio } from "./pages/Portfolio";
import { ThemeProvider } from "./context/ThemeContext";
import { ParallaxProvider } from "react-scroll-parallax";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { useThemeContext } from "./context/ThemeContext";
import { getAppTheme } from "./theme/theme";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Skills } from "./pages/Skills";
import { Experience } from "./pages/Experience";
import { Achievements } from "./pages/Achievements";
import { Contact } from "./pages/Contact";

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
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="skills" element={<Skills />} />
            <Route path="experience" element={<Experience />} />
            <Route path="achievements" element={<Achievements />} />
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
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
