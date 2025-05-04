import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  Fade,
  Button,
  alpha,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";
import { GlowingText } from "../components/GlowingText";
import { experienceItems } from "../config/experience";
import { RetroExperienceCard } from "../components/RetroExperienceCard";

// Main Experience component
export const Experience = () => {
  const theme = useTheme();
  const [visibleExperiences, setVisibleExperiences] = useState(2);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sort experiences by date (newest first)
  const sortedExperiences = [...experienceItems].sort((a, b) => {
    const yearA = parseInt(a.period.split(" - ")[0].split(" ")[0]);
    const yearB = parseInt(b.period.split(" - ")[0].split(" ")[0]);
    return yearB - yearA;
  });

  // Set a flag after initial animation is complete
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const loadMoreExperiences = () => {
    setVisibleExperiences((prevCount) =>
      Math.min(prevCount + 2, sortedExperiences.length),
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8, position: "relative" }}>
      <Box
        ref={containerRef}
        id="experience-container"
        sx={{ position: "relative", minHeight: "100vh" }}
      >
        {/* Header Section */}
        <Box sx={{ mb: 6, position: "relative", zIndex: 2 }}>
          <Box
            component={motion.div}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <WorkIcon
              sx={{
                fontSize: "2.5rem",
                color: theme.palette.primary.main,
                mr: 2,
                filter: `drop-shadow(0 0 8px ${alpha(theme.palette.primary.main, 0.7)})`,
              }}
            />
            <GlowingText
              text="QUEST LOG"
              variant="h2"
              glowIntensity={15}
              sx={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            />
          </Box>

          <Typography
            component={motion.p}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variant="h6"
            sx={{
              maxWidth: "800px",
              mb: 1,
              color: alpha(theme.palette.text.primary, 0.9),
              fontFamily: '"Press Start 2P", cursive',
              fontSize: "0.75rem",
              lineHeight: "1.6",
              letterSpacing: "0.5px",
            }}
          >
            A chronicle of my professional journey and completed quests. Each
            entry represents a significant adventure in my career path.
          </Typography>

          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            sx={{
              height: "8px",
              width: "120px",
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: "4px",
              mb: 4,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                opacity: 0.5,
                filter: "blur(8px)",
                borderRadius: "4px",
              },
            }}
          />
        </Box>

        {/* Experience Cards */}
        <Stack spacing={3}>
          {sortedExperiences
            .slice(0, visibleExperiences)
            .map((experience, index) => {
              const animationDelay = hasAnimated ? 0 : index * 0.15 + 0.5;

              return (
                <Fade
                  key={experience.id}
                  in
                  timeout={500}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Box>
                    <motion.div
                      initial={{ y: 50, opacity: 0, scale: 0.95 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: animationDelay }}
                    >
                      <RetroExperienceCard experience={experience} />
                    </motion.div>
                  </Box>
                </Fade>
              );
            })}
        </Stack>

        {/* Load More Button */}
        {visibleExperiences < sortedExperiences.length && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              mb: 2,
              position: "relative",
              zIndex: 2,
            }}
          >
            <Button
              onClick={loadMoreExperiences}
              variant="contained"
              sx={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: "0.8rem",
                padding: "12px 24px",
                backgroundColor: theme.palette.accent1.main,
                color: theme.palette.background.paper,
                border: `2px solid ${theme.palette.background.paper}`,
                boxShadow: `0 4px 0 ${theme.palette.accent1.dark}`,
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: theme.palette.accent1.light,
                  transform: "translateY(-2px)",
                  boxShadow: `0 6px 0 ${theme.palette.accent1.dark}`,
                },
                "&:active": {
                  transform: "translateY(2px)",
                  boxShadow: `0 2px 0 ${theme.palette.accent1.dark}`,
                },
              }}
            >
              LOAD MORE QUESTS
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};
