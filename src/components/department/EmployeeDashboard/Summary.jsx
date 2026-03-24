import React from "react";
import { Card, CardContent, Avatar, Box, Typography } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../../context/authcontext";

const Summary = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ }}>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 3,
          overflow: "hidden",
          transition: "transform 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.01)" },
        }}
      >
        {/* Left gradient section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            background:
              "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "white",
              color: "#00796b",
              width: 56,
              height: 56,
            }}
          >
            <FaUser size={28} />
          </Avatar>
        </Box>

        {/* Right text section */}
        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontWeight={500}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="h5"
            fontWeight={700}
            color="text.primary"
            sx={{ textTransform: "capitalize" }}
          >
            {user?.name}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Summary;
