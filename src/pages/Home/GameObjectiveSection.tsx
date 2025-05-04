import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { GlowingText } from "../../components/GlowingText";

export const GameObjectiveSection = () => {
  const theme = useTheme();

  // Friendly, conversational description highlighting key achievements from resume
  const enhancedDescription =
    "Hey there! I'm a passionate full-stack developer who loves turning complex challenges into user-friendly solutions. Over my 10+ year journey, I've built everything from interactive data dashboards to secure document management systems. My superpower? Combining React and TypeScript expertise with cloud solutions to create scalable, high-performance applications. I thrive in collaborative environments and genuinely enjoy optimizing code to make things run smoother and faster!";

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        maxWidth: { xs: "100%", sm: "450px", md: "480px" },
        zIndex: 9,
        position: "relative",
      }}
    >
      {/* Section Title with glowing effect */}
      <Box
        component={motion.div}
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GlowingText
          text="CAREER QUEST"
          variant="h4"
          color="#ffffff"
          glowColor={theme.palette.accent3.main}
          glowIntensity={10}
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.2rem" },
            mb: 1.5,
          }}
        />
      </Box>

      {/* Main description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            fontFamily: '"Press Start 2P", monospace',
            fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
            lineHeight: 1.8,
            mb: 2,
            letterSpacing: "0.03em",
          }}
        >
          {enhancedDescription}
        </Typography>
      </motion.div>
    </Box>
  );
};
