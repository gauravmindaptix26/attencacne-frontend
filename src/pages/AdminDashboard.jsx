import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import AdminSidebar from "../components/department/dashboard/AdminSidebar";
import Navbar from "../components/department/dashboard/Navbar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 260;

const AdminDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
        }}
      >
        {/* Navbar */}
        <Box
          sx={{
            width: "100%",
            position: "fixed",
            top: 0,
            left: isMobile ? 0 : drawerWidth,
            zIndex: 1100,
          }}
        >
          <Navbar />
        </Box>

        {/* Content below navbar */}
        <Box sx={{ mt: { xs: 4, sm: 6, md: 7 }, p: 3, flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
