import { Box } from "@mui/material";
import { GreetingSection } from "./GreetingSection";
import { GameObjectiveSection } from "./GameObjectiveSection";
import { RetroTerminalSection } from "./RetroTerminalSection";

export const Home = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      flexDirection="column"
      // justifyContent="space-between"
    >
      <GreetingSection />

      {/* Main content area - game objective and terminal */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Game objective section - centered vertically */}
        <GameObjectiveSection />

        {/* Terminal Container - Right side */}
        <RetroTerminalSection />
      </Box>
    </Box>
  );
};
