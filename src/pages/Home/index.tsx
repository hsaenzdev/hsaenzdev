import { Box } from "@mui/material";
import { GreetingSection } from "./GreetingSection";
import { GameObjectiveSection } from "./GameObjectiveSection";
import { RetroTerminalSection } from "./RetroTerminalSection";
import { DevStatsSection } from "./DevStatsSection";

export const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="90%"
      maxWidth="1480px"
      mx="auto"
      gap={6}
    >
      <GreetingSection />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={2}>
          <DevStatsSection />
          <GameObjectiveSection />
        </Box>
        <RetroTerminalSection />
      </Box>
    </Box>
  );
};
