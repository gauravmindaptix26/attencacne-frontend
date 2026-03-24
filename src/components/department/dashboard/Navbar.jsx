import React, { useState } from "react";
import {
  Toolbar,
  IconButton,
  Avatar,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProfileDrawer from "./ProfileDrawer";
import mainAvatar from "../../../assests/avatar-main.png";

const drawerWidth = 286; // width of sidebar

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(mainAvatar);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // ✅ Navbar width logic
  const navbarWidth = isMobile || isTablet ? "100%" : `calc(100% - ${drawerWidth}px)`;
  const navbarMarginLeft = isMobile || isTablet ? 0 : `${drawerWidth}px`;

  return (
    <>
      <Paper
  elevation={6}
  sx={{
    position: "fixed",
    top: 7,
    left: isMobile || isTablet ? 11 : `${drawerWidth + 0}px`, // ✅ pushes navbar right of sidebar
    right: 20, // ✅ equal gap on right
    zIndex: 1200,
    background:
      "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
    width: isMobile || isTablet
      ? "calc(100% - 20px)" // ✅ 20px margin on both sides (left + right)
      : `calc(100% - ${drawerWidth}px - 20px)`, // ✅ subtract sidebar + side margins
    transition: "width 0.3s ease, left 0.3s ease",
  }}
>
  <Toolbar
    sx={{
      height: 72,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      px: { xs: 2, sm: 3, md: 4 },
    }}
  >
    <IconButton onClick={() => setOpen(true)}>
      <Avatar
        src={currentAvatar}
        sx={{
          width: isMobile ? 36 : isTablet ? 42 : 46,
          height: isMobile ? 36 : isTablet ? 42 : 46,
          border: "2px solid white",
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.07)",
            boxShadow: "0 0 10px rgba(255,255,255,0.6)",
          },
        }}
      />
    </IconButton>
  </Toolbar>
</Paper>


      {/* Profile Drawer */}
      <ProfileDrawer
        open={open}
        onClose={() => setOpen(false)}
        currentAvatar={currentAvatar}
        setCurrentAvatar={setCurrentAvatar}
      />
    </>
  );
};

export default Navbar;
