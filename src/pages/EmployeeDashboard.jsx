import React, { useState } from "react";
import EmployeeSidebar from "../components/department/EmployeeDashboard/Sidebar";
import Navbar from "../components/department/dashboard/Navbar";
import { Outlet } from "react-router-dom";
import {
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaBars } from "react-icons/fa";

const drawerWidth = 260;

const EmployeeDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      {/* Hamburger Icon for Mobile */}
      {isMobile && !mobileOpen && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 20,
            left: 18,
            zIndex: 1301,
            background: "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
            color: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            borderRadius: "12px",
            width: 42,
            height: 42,
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #00c9a7 0%, #2e7d32 100%)",
              transform: "scale(1.05)",
            },
          }}
        >
          <FaBars size={18} />
        </IconButton>
      )}

      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        <EmployeeSidebar />
      </Drawer>

      {/* Permanent Sidebar for Desktop */}
      {!isMobile && (
        <Box
          sx={{
            width: drawerWidth,
            flexShrink: 0,
          }}
        >
          <EmployeeSidebar />
        </Box>
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
          transition: "all 0.3s ease",
          backgroundColor: "#f9f9f9",
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

        {/* Page Content */}
        <Box
          sx={{
            mt: { xs: 12.5, sm: 13, md: 13.5 },
            p: { xs: 1.5, sm: 2, md: 3 },
            mx: { xs: 1.5, sm: 2.5, md: 3 },
            mb: { xs: 3, sm: 3, md: 3 },
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: { xs: 1, md: 3 },
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;
