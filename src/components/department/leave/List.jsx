import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../../context/authcontext";
import  BASE_URL  from "../../../utils/apiConfig";
const List = () => {
  const [leaves, setLeaves] = useState(null);
  const { user } = useAuth();
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let sno = 1;

  // 🔹 Fetch Leaves
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/leave/${id}/${user.role}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (!leaves) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 3 },
      }}
    >
      {/* 🔹 Header Section */}
      <Typography
        variant={isMobile ? "h6" : "h5"}
        fontWeight="bold"
        gutterBottom
        sx={{ textAlign: isMobile ? "center" : "left", mb: 2 }}
      >
        Leave List
      </Typography>

      {/* 🔹 Add Leave Button (for Employees) */}
      {user.role === "employee" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            mb: 2,
          }}
        >
          <Button
            component={Link}
            to="/employee-dashboard/add-leave"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background:
                "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
              py: { xs: 0.5, sm: 1 },
              fontSize: { xs: "0.8rem", sm: "1rem" },
              textTransform: "none",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #00a68c 0%, #388e3c 50%, #00695c 100%)",
              },
            }}
          >
            Add Leave
          </Button>
        </Box>
      )}

      {/* 🔹 Table Section */}
      <TableContainer
        component={Paper}
        elevation={4}
        sx={{
          borderRadius: 3,
          overflowX: "auto", // ✅ allows horizontal scroll on small screens
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Table sx={{ minWidth: 600 /* ✅ Ensures scroll on mobile */ }}>
          <TableHead
            sx={{
              background:
                "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
            }}
          >
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>S.No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Leave Type</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>From</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>To</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {leaves.map((leave) => (
              <TableRow
                key={leave._id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#E0F2F1",
                  },
                }}
              >
                <TableCell>{sno++}</TableCell>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>
                  {new Date(leave.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(leave.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                  {leave.reason}
                </TableCell>
                <TableCell>
                  <Chip
                    label={leave.status}
                    sx={{
                      fontWeight: "bold",
                      color:
                        leave.status === "Approved"
                          ? "green"
                          : leave.status === "Pending"
                          ? "orange"
                          : "red",
                      backgroundColor:
                        leave.status === "Approved"
                          ? "#E8F5E9"
                          : leave.status === "Pending"
                          ? "#FFF8E1"
                          : "#FFEBEE",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default List;
