import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  FaBuilding,
  FaCalendar,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaProjectDiagram,
  FaBars,
} from "react-icons/fa";
import logo from "../../../assests/ems.png";

const drawerWidth = 260;

const navItems = [
  { to: "/admin-dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/admin-dashboard/employees", label: "Employee", icon: <FaUsers /> },
  { to: "/admin-dashboard/departments", label: "Department", icon: <FaBuilding /> },
  { to: "/admin-dashboard/leaves", label: "Leave", icon: <FaCalendar /> },
  { to: "/admin-dashboard/salary/add", label: "Salary", icon: <FaMoneyBillWave /> },
  { to: "/admin-dashboard/Attendance/Marking", label: "Attendance", icon: <FaClipboardList /> },
  { to: "/admin-dashboard/Attendance/AttendanceList", label: "Attendance Report", icon: <FaClipboardList /> },
  { to: "/admin-dashboard/Project", label: "Project", icon: <FaProjectDiagram /> },
  { to: "/admin-dashboard/ProjectList", label: "Project List", icon: <FaProjectDiagram /> },
  { to: "/admin-dashboard/setting", label: "Settings", icon: <FaCogs /> },
];

const AdminSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerContent = (
    <>
      {/* Sidebar Header with Logo */}
      <Toolbar
        sx={{
          background: "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          mx: 1,
          mt: 1,
          height: 70,
          boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="EMS Logo"
          sx={{
            height: 40,
            width: 40,
            objectFit: "contain",
            borderRadius: "50%",
            backgroundColor: "white",
            p: 0.5,
          }}
        />
      </Toolbar>

      {/* Navigation Links */}
      <Box sx={{ overflow: "auto", mt: 2 }}>
        <List>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin-dashboard"}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => isMobile && setMobileOpen(false)} // close on mobile tap
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    my: 0.5,
                    backgroundColor: isActive ? "rgba(0, 150, 136, 0.1)" : "transparent",
                    color: isActive ? "#009688" : "inherit",
                    "&:hover": {
                      backgroundColor: "rgba(0, 150, 136, 0.1)",
                      color: "#009688",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#009688" : "inherit",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? "600" : "400",
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <>
      {/* Hamburger icon for mobile view */}
    {isMobile && !mobileOpen && (
  <IconButton
    onClick={() => setMobileOpen(true)}
    sx={{
      position: "fixed",
      top:  20 , // aligns with navbar
      left:  18,
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



      {/* Permanent Drawer on desktop */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#fff",
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default AdminSidebar;
