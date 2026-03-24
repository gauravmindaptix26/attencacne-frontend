import React from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import {
  FaCalendar,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../../../context/authcontext";
import logo from "../../../assests/ems.png";

const EmployeeSidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { to: "/employee-dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: `/employee-dashboard/profile/${user?._id}`, label: "My Profile", icon: <FaUser /> },
    { to: `/employee-dashboard/leaves/${user?._id}`, label: "Leaves", icon: <FaCalendar /> },
    { to: `/employee-dashboard/salary/${user?._id}`, label: "Salary", icon: <FaMoneyBillWave /> },
    { to: "/employee-dashboard/setting", label: "Settings", icon: <FaCogs /> },
  ];

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Gradient Header */}
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
              end={item.to === "/employee-dashboard"}
              style={{ textDecoration: "none", color: "inherit" }}
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
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.2s ease",
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
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default EmployeeSidebar;
