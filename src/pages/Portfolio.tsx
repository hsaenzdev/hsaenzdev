import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideNav } from "../components/SideNav";

export const Portfolio = () => {
  return (
    <Box display="flex" flexDirection="row" height="100vh">
      <SideNav />
      <Box flex={1} p={4} sx={{ overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
};
