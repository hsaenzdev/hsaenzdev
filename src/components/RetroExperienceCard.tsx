import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  IconButton,
  Collapse,
  useTheme,
  alpha,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { GlowingText } from "./GlowingText";
import { getExperienceLevelTitle } from "../config/experience";

export interface ExperienceData {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  icon: React.ElementType; // React component
  color: string;
  type: "work" | "education" | "project";
  rewards?: string[];
  skills?: string[];
  skillsGained?: {
    name: string;
    level: number;
  }[];
  level?: number; // 1-10 for RPG level display
  shortDescription?: string;
}

interface RetroExperienceCardProps {
  experience: ExperienceData;
}

export const RetroExperienceCard = ({
  experience,
}: RetroExperienceCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const Icon = experience.icon;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Helper to create skill badges
  const SkillBadge = ({ skill, color }: { skill: string; color: string }) => {
    return (
      <Chip
        label={skill}
        size="small"
        sx={{
          backgroundColor: alpha(color, 0.8),
          color: theme.palette.background.paper,
          fontWeight: "bold",
          border: `1px solid ${alpha(color, 0.9)}`,
          fontFamily: '"Press Start 2P", cursive',
          fontSize: "0.6rem",
          height: "auto",
          padding: "4px 0",
          m: 0.5,
        }}
      />
    );
  };

  // Create pixelated skill meter (like in projects)
  const SkillMeter = ({
    skill,
  }: {
    skill: { name: string; level: number };
  }) => {
    return (
      <Box sx={{ mb: 1 }}>
        <Typography
          variant="body2"
          sx={{
            mb: 0.5,
            fontFamily: '"Press Start 2P", cursive',
            fontSize: "0.6rem",
          }}
        >
          {skill.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "2px",
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: "12px",
                height: "12px",
                backgroundColor:
                  i < skill.level
                    ? theme.palette.secondary.main
                    : alpha(theme.palette.secondary.main, 0.2),
                border: `1px solid ${theme.palette.secondary.dark}`,
              }}
            />
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "visible",
        mb: 4,
        border: `2px solid ${alpha(theme.palette.primary.main, 0.7)}`,
        borderRadius: "8px",
        boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.7)}`,
        },
        background: `linear-gradient(135deg, 
                     ${alpha(theme.palette.background.paper, 0.6)}, 
                     ${alpha(theme.palette.background.default, 0.4)})`,
        backdropFilter: "blur(5px)",
      }}
    >
      {/* Quest Duration Badge */}
      <Box
        sx={{
          position: "absolute",
          top: "-10px",
          right: "20px",
          backgroundColor: theme.palette.accent1.main,
          color: theme.palette.background.paper,
          fontFamily: '"Press Start 2P", cursive',
          fontSize: "0.7rem",
          padding: "4px 8px",
          borderRadius: "4px",
          border: `2px solid ${theme.palette.background.paper}`,
          zIndex: 1,
        }}
      >
        {experience.period}
      </Box>

      <CardContent>
        <Box sx={{ mb: 2 }}>
          {/* Header with icon */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                position: "relative",
                mr: 2,
                width: 48,
                height: 48,
                borderRadius: "8px",
                bgcolor: alpha(theme.palette.primary.main, 0.9),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.6)}`,
              }}
            >
              <Icon sx={{ color: "white", fontSize: 24 }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <GlowingText
                text={experience.title}
                variant="h4"
                color={theme.palette.primary.main}
                sx={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: "1.2rem",
                  mb: 0.5,
                }}
              />

              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: '"Press Start 2P", cursive',
                  color: theme.palette.text.secondary,
                  fontSize: "0.7rem",
                }}
              >
                {experience.company}
              </Typography>
            </Box>

            {/* Experience level title */}
            {experience.level && (
              <Chip
                label={getExperienceLevelTitle(experience.level)}
                size="small"
                sx={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: "0.6rem",
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  color: theme.palette.primary.main,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                  height: 24,
                  ml: 1,
                  boxShadow: `0 0 8px ${alpha(
                    theme.palette.primary.main,
                    0.3,
                  )}`,
                }}
              />
            )}
          </Box>

          {/* Short description */}
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              fontFamily: '"Press Start 2P", cursive',
              fontSize: "0.7rem",
              lineHeight: "1.6",
            }}
          >
            {experience.shortDescription || experience.description[0]}
          </Typography>

          {/* All Skills as chips */}
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            {experience.skills &&
              experience.skills.map((skill, index) => (
                <SkillBadge
                  key={index}
                  skill={skill}
                  color={theme.palette.accent2.main}
                />
              ))}
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <EmojiEventsIcon
              sx={{ color: theme.palette.primary.main, fontSize: "1.2rem" }}
            />
            <Typography
              variant="caption"
              sx={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: "0.6rem",
                color: theme.palette.primary.main,
              }}
            >
              {experience.rewards ? experience.rewards.length : 0} REWARDS
            </Typography>
          </Box>

          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
              border: `2px solid ${theme.palette.primary.main}`,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              },
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box
            sx={{
              pt: 3,
              pb: 1,
              borderTop: `2px dashed ${alpha(theme.palette.primary.main, 0.5)}`,
              mt: 2,
            }}
          >
            {/* Description list with numbers */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: "0.9rem",
                  mb: 1,
                  color: theme.palette.secondary.main,
                  textShadow: `0 0 10px ${alpha(
                    theme.palette.secondary.main,
                    0.8,
                  )}`,
                }}
              >
                RESPONSIBILITIES
              </Typography>
              <Box component="ul" sx={{ pl: 0, mt: 0, listStyleType: "none" }}>
                {experience.description.map((item, index) => (
                  <Box
                    component="li"
                    key={index}
                    sx={{
                      mb: 1.5,
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 20,
                        height: 20,
                        mr: 2,
                        mt: 0.2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${
                          theme.palette.primary.main
                        } 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        color: "#fff",
                        fontWeight: "bold",
                        boxShadow: `0 0 8px ${alpha(
                          theme.palette.primary.main,
                          0.5,
                        )}`,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Press Start 2P", cursive',
                        fontSize: "0.65rem",
                        lineHeight: 1.8,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Skills section with skill meters */}
            {experience.skillsGained && experience.skillsGained.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: "0.9rem",
                    mb: 1,
                    color: theme.palette.secondary.main,
                    textShadow: `0 0 10px ${alpha(
                      theme.palette.secondary.main,
                      0.8,
                    )}`,
                  }}
                >
                  SKILLS GAINED
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  {experience.skillsGained.map((skill, index) => (
                    <SkillMeter key={index} skill={skill} />
                  ))}
                </Box>
              </Box>
            )}

            {/* Rewards section */}
            {experience.rewards && experience.rewards.length > 0 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: "0.9rem",
                    mb: 1,
                    color: theme.palette.secondary.main,
                    textShadow: `0 0 10px ${alpha(
                      theme.palette.secondary.main,
                      0.8,
                    )}`,
                  }}
                >
                  REWARDS
                </Typography>
                <Box
                  sx={{
                    pl: 2,
                    borderLeft: `4px solid ${alpha(
                      theme.palette.primary.main,
                      0.5,
                    )}`,
                  }}
                >
                  {experience.rewards.map((reward, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        fontFamily: '"Press Start 2P", cursive',
                        fontSize: "0.6rem",
                        lineHeight: "1.6",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          backgroundColor: theme.palette.primary.main,
                          mr: 1,
                        }}
                      />
                      {reward}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};
