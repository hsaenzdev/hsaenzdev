import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { GlowingText } from "../../components/GlowingText";

export const GameObjectiveSection = () => {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        maxWidth: { xs: "100%", sm: "450px", md: "600px" },
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
          sx={{
            color: theme.palette.text.secondary,
            fontFamily: '"Press Start 2P", monospace',
            fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
            lineHeight: 1.8,
            letterSpacing: "0.03em",
          }}
        >
          With 10+ years of experience building high-performance web apps, I
          specialize in React, TypeScript, and backend development with Node.js,
          SQL/NoSQL. I focus on making systems faster, more efficient, and
          scalable while solving technical challenges that drive real impact. If
          you're looking for a developer who brings reliability,
          problem-solving, and a strong commitment to getting things done, let’s
          connect!
        </Typography>
      </motion.div>
    </Box>
  );
};
