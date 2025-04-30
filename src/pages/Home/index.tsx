import { Box } from "@mui/material";
import { GreetingSection } from "./GreetingSection";
import { GameObjectiveSection } from "./GameObjectiveSection";
import { RetroTerminalSection } from "./RetroTerminalSection";
import { ControlsSection } from "./ControlsSection";
import { DevStatsSection } from "./DevStatsSection";

export const Home = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box pt={{ xs: 2, md: 3 }}>
        <GreetingSection />
      </Box>

      {/* Main content area - game objective and terminal */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ xs: 'column', md: 'row' }}
        flex={1}
        px={{ xs: 1, sm: 2 }}
        gap={{ xs: 4, md: 4 }}
        mx="auto"
        maxWidth="100%"
      >
        {/* Game objective and stats section */}
        <Box 
          display="flex" 
          alignItems="flex-start"
          justifyContent="center"
          gap={3}
          alignSelf={{ xs: 'center', md: 'center' }}
          mt={{ xs: 0, md: -4 }}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <DevStatsSection />
          <GameObjectiveSection />
        </Box>

        {/* Terminal Container - Right side */}
        <Box 
          alignSelf={{ xs: 'center', md: 'center' }}
          mt={{ xs: 0, md: 2 }}
        >
          <RetroTerminalSection />
        </Box>
      </Box>

      <Box mb={2}>
        <ControlsSection />
      </Box>
    </Box>
  );
};
