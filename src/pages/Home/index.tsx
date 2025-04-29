import { Box } from "@mui/material";
import { GreetingSection } from "./GreetingSection";
import { GameObjectiveSection } from "./GameObjectiveSection";
import { RetroTerminalSection } from "./RetroTerminalSection";
import { TechIconsSection } from "./TechIconsSection";

export const Home = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      flexDirection="column"
      justifyContent="space-between"
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
      {/* <TechIconsSection /> */}
      <h1>hello there</h1>
    </Box>



  );
  // return (
  // <Box
  //   sx={{
  //     width: '100%',
  //     minHeight: '100vh',
  //     display: 'flex',
  //     flexDirection: 'column',
  //     position: 'relative',
  //     overflow: 'hidden',
  //   }}
  // >
  //   {/* Main Container with flexbox */}
  //   <Box 
  //     sx={{ 
  //       minHeight: '100vh',
  //       position: 'relative',
  //       display: 'flex',
  //       flexDirection: 'column',
  //       px: { xs: 2, sm: 3, md: 5 },
  //     }}
  //   >
  //     {/* Top greeting text - positioned at top left */}
  //     <GreetingSection />

  //     {/* Main content area - game objective and terminal */}
  //     <Box 
  //       sx={{ 
  //         flex: 1,
  //         display: 'flex',
  //         alignItems: 'center',
  //         backgroundColor: "teal",
  //         justifyContent: 'space-between',
  //       }}
  //     >
  //       {/* Game objective section - centered vertically */}
  //       <GameObjectiveSection />

  //       {/* Terminal Container - Right side */}
  //       <RetroTerminalSection />
  //     </Box>
  //   </Box>

  //   {/* Technology Icons at Bottom Center */}
  //   <TechIconsSection />
  // </Box>
  // );
};

// Export all components for direct imports
export * from "./GreetingSection";
export * from "./GameObjectiveSection";
export * from "./RetroTerminalSection";
export * from "./TechIconsSection";
export * from "./constants"; 
