import { useState } from "react";
import { Box, Typography, Grid, Paper, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { GlowingText } from "../../components/GlowingText";

// Icons for each skill category
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import TerminalIcon from "@mui/icons-material/Terminal";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import JavascriptIcon from "@mui/icons-material/Javascript";
import PhpIcon from "@mui/icons-material/Php";
import DataObjectIcon from "@mui/icons-material/DataObject";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import LanguageIcon from "@mui/icons-material/Language";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StarRateIcon from "@mui/icons-material/StarRate";
import WebIcon from "@mui/icons-material/Web";
import ApiIcon from "@mui/icons-material/Api";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DevicesIcon from "@mui/icons-material/Devices";
import GitHubIcon from "@mui/icons-material/GitHub";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import BrushIcon from "@mui/icons-material/Brush";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import EventNoteIcon from "@mui/icons-material/EventNote";

interface Skill {
  name: string;
  startYear: number;
  years: number;
  icon?: React.ReactNode;
  description?: string;
}

export const Skills = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  // Custom vibrant colors for skill categories
  const customColors = {
    frontendColor: "#9B5DE5", // Vibrant purple
    backendColor: "#00F5D4", // Bright teal
    databaseColor: "#FFD23F", // Gold
    devopsColor: "#0496FF", // Azure blue
    softColor: "#FB5607", // Vibrant orange (changed from green)
  };

  // Skills categorized by type
  const [skills] = useState({
    frontend: [
      {
        name: "JavaScript",
        startYear: 2014,
        years: currentYear - 2014,
        icon: <JavascriptIcon />,
      },
      {
        name: "TypeScript",
        startYear: 2019,
        years: currentYear - 2019,
        icon: <CodeIcon />,
      },
      {
        name: "React",
        startYear: 2020,
        years: currentYear - 2020,
        icon: <WebIcon />,
      },
      {
        name: "Material UI",
        startYear: 2022,
        years: currentYear - 2022,
        icon: <DevicesIcon />,
      },
      {
        name: "Vue.js",
        startYear: 2018,
        years: currentYear - 2018,
        icon: <LanguageIcon />,
      },
      {
        name: "GraphQL",
        startYear: 2022,
        years: currentYear - 2022,
        icon: <ApiIcon />,
      },
    ],
    backend: [
      {
        name: "Node.js",
        startYear: 2015,
        years: currentYear - 2015,
        icon: <TerminalIcon />,
      },
      {
        name: "Express.js",
        startYear: 2015,
        years: currentYear - 2015,
        icon: <DataObjectIcon />,
      },
      {
        name: "Elixir/Phoenix",
        startYear: 2022,
        years: currentYear - 2022,
        icon: <AutoAwesomeIcon />,
      },
      {
        name: "PHP",
        startYear: 2015,
        years: currentYear - 2015,
        icon: <PhpIcon />,
      },
      {
        name: "C#",
        startYear: 2015,
        years: currentYear - 2015,
        icon: <CodeIcon />,
      },
      {
        name: "Python",
        startYear: 2023,
        years: currentYear - 2023,
        icon: <DesignServicesIcon />,
      },
    ],
    database: [
      {
        name: "PostgreSQL",
        startYear: 2023,
        years: currentYear - 2023,
        icon: <StorageIcon />,
      },
      {
        name: "MongoDB",
        startYear: 2015,
        years: currentYear - 2015,
        icon: <StorageRoundedIcon />,
      },
      {
        name: "SQL/NoSQL",
        startYear: 2014,
        years: currentYear - 2014,
        icon: <CalendarViewWeekIcon />,
      },
    ],
    devops: [
      {
        name: "AWS",
        startYear: 2024,
        years: currentYear - 2024,
        icon: <CloudIcon />,
      },
      {
        name: "Docker",
        startYear: 2019,
        years: currentYear - 2019,
        icon: <WebIcon />,
      },
      {
        name: "Git - CI/CD",
        startYear: 2018,
        years: currentYear - 2018,
        icon: <GitHubIcon />,
      },
      {
        name: "Linux",
        startYear: 2010,
        years: currentYear - 2010,
        icon: <TerminalIcon />,
      },
      {
        name: "Jira",
        startYear: 2022,
        years: currentYear - 2022,
        icon: <DeveloperModeIcon />,
      },
      {
        name: "LaunchDarkly",
        startYear: 2022,
        years: currentYear - 2022,
        icon: <ApiIcon />,
      },
    ],
    soft: [
      {
        name: "Team Collaboration",
        startYear: 2014,
        years: currentYear - 2014,
        icon: <HandshakeIcon />,
        description:
          "Party member synergy +100. Works well in multiplayer mode!",
      },
      {
        name: "Problem Solving",
        startYear: 2014,
        years: currentYear - 2014,
        icon: <PsychologyIcon />,
        description:
          "Can solve puzzles and defeat boss bugs with strategic thinking",
      },
      {
        name: "Communication",
        startYear: 2014,
        years: currentYear - 2014,
        icon: <RecordVoiceOverIcon />,
        description:
          "High charisma stat! Explains complex concepts in simple terms",
      },
      {
        name: "Adaptability",
        startYear: 2014,
        years: currentYear - 2014,
        icon: <AutoFixHighIcon />,
        description: "Quick to master new environments and tech skill trees",
      },
      {
        name: "Attention to Detail",
        startYear: 2014,
        years: currentYear - 2014,
        icon: <StarRateIcon />,
        description: "Eagle-eyed bug hunter with +10 precision stat",
      },
      {
        name: "Creativity",
        startYear: 2014,
        years: currentYear - 2014,
        icon: <BrushIcon />,
        description:
          "Thinks outside the inventory box for innovative solutions",
      },
    ],
  });

  // Animated variants for containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animated variants for skill cards
  const skillVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Category icons and animations
  const categoryIcons = {
    frontend: <WebIcon fontSize="large" />,
    backend: <TerminalIcon fontSize="large" />,
    database: <StorageIcon fontSize="large" />,
    devops: <CloudIcon fontSize="large" />,
    soft: <EmojiPeopleIcon fontSize="large" />,
  };

  // Function to render skill cards
  const renderSkillCard = (skill: Skill, index: number, category: string) => {
    // Determine color based on category
    const getColor = () => {
      switch (category) {
        case "frontend":
          return customColors.frontendColor;
        case "backend":
          return customColors.backendColor;
        case "database":
          return customColors.databaseColor;
        case "devops":
          return customColors.devopsColor;
        default:
          return customColors.softColor;
      }
    };

    const color = getColor();
    const glowIntensity = "0 0 15px";

    return (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${category}-${index}`}>
        <motion.div variants={skillVariants}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: "100%",
              border: `2px solid ${alpha(color, 0.7)}`,
              borderImageSlice: "2",
              borderImageWidth: "2px",
              background: alpha(color, 0.05),
              backdropFilter: "blur(8px)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s",
              boxShadow: `${glowIntensity} ${alpha(color, 0.2)}`,
              "&:hover": {
                transform: "translateY(-5px) scale(1.02)",
                boxShadow: `${glowIntensity} ${alpha(color, 0.3)}`,
                border: `2px solid ${alpha(color, 0.9)}`,
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "5px",
                background: `linear-gradient(90deg, ${alpha(
                  color,
                  0.9,
                )}, ${alpha(color, 0.5)})`,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  mr: 1.5,
                  color: color,
                  filter: `drop-shadow(0 0 5px ${alpha(color, 0.8)})`,
                  transform: "scale(1.2)",
                }}
              >
                {skill.icon}
              </Box>
              <Typography
                sx={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: "0.85rem",
                  color: color,
                  textShadow: `0 0 7px ${alpha(color, 0.6)}`,
                  flexGrow: 1,
                }}
              >
                {skill.name}
              </Typography>
            </Box>

            {/* For character traits (soft skills), don't show the stats */}
            {category !== "soft" && (
              <Box
                sx={{
                  mt: 2,
                  border: `1px solid ${alpha(color, 0.4)}`,
                  borderRadius: "4px",
                  backdropFilter: "blur(5px)",
                  background: alpha(color, 0.05),
                  overflow: "hidden",
                  boxShadow: `inset 0 0 10px ${alpha(color, 0.2)}`,
                }}
              >
                {/* Stat 1: Experience */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 0.8,
                    gap: 1,
                    borderBottom: `1px dashed ${alpha(color, 0.3)}`,
                    "&:hover": {
                      background: alpha(color, 0.1),
                    },
                  }}
                >
                  <StarRateIcon
                    sx={{
                      fontSize: "0.8rem",
                      color: color,
                      filter: `drop-shadow(0 0 3px ${alpha(color, 0.7)})`,
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: "0.5rem",
                      color: alpha(color, 0.9),
                      textShadow: `0 0 3px ${alpha(color, 0.3)}`,
                      flexGrow: 1,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    EXP
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: "0.5rem",
                      color: alpha(theme.palette.common.white, 0.9),
                      textShadow: `0 0 4px ${alpha(color, 0.6)}`,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {skill.years}+ YRS
                  </Typography>
                </Box>

                {/* Stat 2: Level Up */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 0.8,
                    gap: 1,
                    borderBottom: `1px dashed ${alpha(color, 0.3)}`,
                    "&:hover": {
                      background: alpha(color, 0.1),
                    },
                  }}
                >
                  <EventNoteIcon
                    sx={{
                      fontSize: "0.8rem",
                      color: color,
                      filter: `drop-shadow(0 0 3px ${alpha(color, 0.7)})`,
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: "0.5rem",
                      color: alpha(color, 0.9),
                      textShadow: `0 0 3px ${alpha(color, 0.3)}`,
                      flexGrow: 1,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    SINCE
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: "0.5rem",
                      color: alpha(theme.palette.common.white, 0.9),
                      textShadow: `0 0 4px ${alpha(color, 0.6)}`,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {skill.startYear}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* For character traits, show a description instead */}
            {category === "soft" && (
              <Box
                sx={{
                  mt: 2,
                  p: 1.5,
                  border: `1px solid ${alpha(color, 0.4)}`,
                  borderRadius: "4px",
                  backdropFilter: "blur(5px)",
                  background: alpha(color, 0.05),
                  overflow: "hidden",
                  boxShadow: `inset 0 0 10px ${alpha(color, 0.2)}`,
                  minHeight: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: "0.5rem",
                    color: alpha(theme.palette.common.white, 0.9),
                    textShadow: `0 0 4px ${alpha(color, 0.6)}`,
                    textAlign: "center",
                    lineHeight: 1.8,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {skill.description}
                </Typography>
              </Box>
            )}
          </Paper>
        </motion.div>
      </Grid>
    );
  };

  // Function to render a category
  const renderCategory = (title: string, categoryKey: keyof typeof skills) => {
    const categoryColor = (() => {
      switch (categoryKey) {
        case "frontend":
          return customColors.frontendColor;
        case "backend":
          return customColors.backendColor;
        case "database":
          return customColors.databaseColor;
        case "devops":
          return customColors.devopsColor;
        default:
          return customColors.softColor;
      }
    })();

    const icon = categoryIcons[categoryKey];

    return (
      <Box mb={6}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            pb: 1,
            borderBottom: `2px dashed ${alpha(categoryColor, 0.3)}`,
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                mr: 2,
                color: categoryColor,
                textShadow: `0 0 10px ${alpha(categoryColor, 0.8)}`,
                filter: `drop-shadow(0 0 8px ${alpha(categoryColor, 0.6)})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "scale(1.2)",
              }}
            >
              {icon}
            </Box>
          </motion.div>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontFamily: '"Press Start 2P", cursive',
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: categoryColor,
              textShadow: `0 0 8px ${alpha(categoryColor, 0.8)}`,
              display: "inline-block",
              "&::before": {
                content: '"[ "',
                opacity: 0.8,
              },
              "&::after": {
                content: '" ]"',
                opacity: 0.8,
              },
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Grid container spacing={2}>
            {skills[categoryKey].map((skill, index) =>
              renderSkillCard(skill, index, categoryKey),
            )}
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        pt: 4,
        px: { xs: 2, md: 4 },
        maxWidth: "1400px",
        mx: "auto",
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box textAlign="center" mb={6}>
        <GlowingText
          text="SKILL INVENTORY"
          variant="h2"
          glowIntensity={12}
          glowColor={customColors.backendColor}
          sx={{
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        />

        <GlowingText
          text="Throughout my journey as a developer, I've leveled up across multiple tech stacks and domains. Each skill represents experience points gained through real-world quests and challenges. This is my character sheet - built from over a decade of coding adventures!"
          variant="h6"
          glowIntensity={4}
          glowColor={customColors.backendColor}
          sx={{
            maxWidth: "800px",
            mx: "auto",
            px: 2,
            py: 1.5,
            fontFamily: '"Press Start 2P", cursive',
            fontSize: { xs: "0.6rem", sm: "0.7rem" },
            color: theme.palette.text.primary,
            lineHeight: 1.8,
            letterSpacing: "0.5px",
          }}
        />
      </Box>

      {renderCategory("FRONTEND", "frontend")}
      {renderCategory("BACKEND", "backend")}
      {renderCategory("DATABASE", "database")}
      {renderCategory("DEVOPS & TOOLS", "devops")}
      {renderCategory("CHARACTER TRAITS", "soft")}

      {/* More skills coming soon message */}
      <Box
        sx={{
          textAlign: "center",
          mt: 8,
          mb: 4,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                delay: 0.5,
              },
            }}
          >
            <GlowingText
              text="SKILL TREE EXPANDING..."
              variant="h6"
              glowIntensity={8}
              glowColor="#FF3366"
              sx={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: "0.9rem",
                color: "#FF3366",
                mb: 1,
                px: 3,
                py: 2,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.background.paper, 0.3),
                backdropFilter: "blur(5px)",
                border: `1px solid ${alpha("#FF3366", 0.3)}`,
                boxShadow: `0 0 15px ${alpha("#FF3366", 0.2)}`,
                display: "inline-block",
              }}
            />
          </motion.div>
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "8px",
              zIndex: -1,
              backgroundColor: alpha("#FF3366", 0.05),
            }}
          />
        </Box>
        <GlowingText
          text="More abilities unlocking through side quests and continuous learning journeys. Check back for new skills and level-ups!"
          variant="h6"
          glowIntensity={3}
          glowColor={theme.palette.text.secondary}
          sx={{
            mt: 2,
            fontFamily: '"Press Start 2P", cursive',
            fontSize: "0.6rem",
            color: alpha(theme.palette.text.secondary, 0.8),
            maxWidth: "600px",
            mx: "auto",
            lineHeight: 1.8,
            letterSpacing: "0.5px",
          }}
        />
      </Box>
    </Box>
  );
};
