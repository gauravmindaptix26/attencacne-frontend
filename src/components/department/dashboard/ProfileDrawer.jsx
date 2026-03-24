import React from "react";
import {
  Drawer,
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authcontext";

// ✅ Import avatars from assets
import mainAvatar from "../../../assests/avatar-main.png";
import avatar1 from "../../../assests/avatar1.png";
import avatar2 from "../../../assests/avatar2.png";
import avatar3 from "../../../assests/avatar3.png";

const ProfileDrawer = ({ open, onClose, currentAvatar, setCurrentAvatar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      onClose?.();
      navigate("/login");
    }
  };

  const handleAvatarChange = (newAvatar) => {
    setCurrentAvatar(newAvatar);
  };

  const userName = user?.name || "Guest User";
  const userEmail = user?.email || "guest@example.com";
  const userRole = user?.role || "Employee";

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          p: 2,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Profile
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {/* User Info */}
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <Avatar
          src={currentAvatar || mainAvatar}
          sx={{
            width: 80,
            height: 80,
            mb: 1,
            border: "2px solid #009688",
          }}
        />
        <Typography fontWeight="bold">{userName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {userEmail}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
          Role: {userRole}
        </Typography>
      </Box>

      {/* Avatar Selection */}
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 3, mb: 1 }}
      >
        Choose your avatar
      </Typography>

      <Box display="flex" gap={1} justifyContent="center">
        {[avatar1, avatar2, avatar3].map((a, i) => (
          <Avatar
            key={i}
            src={a}
            onClick={() => handleAvatarChange(a)}
            sx={{
              width: 40,
              height: 40,
              cursor: "pointer",
              border:
                currentAvatar === a
                  ? "2px solid #009688"
                  : "2px solid transparent",
              transition: "all 0.2s",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />
        ))}
      </Box>

      {/* Logout */}
      <Box mt="auto" p={2}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            bgcolor: "#ffe8e6",
            color: "red",
            "&:hover": { bgcolor: "#ffd7d6" },
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default ProfileDrawer;
