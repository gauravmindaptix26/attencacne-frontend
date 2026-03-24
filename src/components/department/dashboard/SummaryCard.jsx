import React from "react";
import { Paper, Box, Typography } from "@mui/material";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        p: 4,
        height: 280, // 👈 Increased height (was ~120–140 before)
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        },
      }}
    >
      <Box
        sx={{
          width: 97,
          height: 64,
         
          backgroundColor: color,
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          fontSize: 28, // larger icon
        }}
      >
        {icon}
      </Box>

      <Typography variant="h6" fontWeight="600" color="text.primary">
        {text}
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mt: 1, color }}
      >
        {number}
      </Typography>
    </Paper>
  );
};

export default SummaryCard;
