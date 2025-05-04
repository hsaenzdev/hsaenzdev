import { Box } from "@mui/material";
import { GreetingSection } from "./GreetingSection";
import { GameObjectiveSection } from "./GameObjectiveSection";
import { RetroTerminalSection } from "./RetroTerminalSection";
import { DevStatsSection } from "./DevStatsSection";

export const Home = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        width="90%"
        maxWidth="1480px"
        mx="auto"
        gap={6}
        justifyContent="space-between"
      >
        <GreetingSection />

        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box display="flex" flexDirection="column" gap={4}>
            <GameObjectiveSection />
            <DevStatsSection />
          </Box>
          <RetroTerminalSection />
        </Box>
      </Box>
    </>
  );
};
