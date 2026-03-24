import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../context/authcontext";
import  BASE_URL  from "../../utils/apiConfig";
const View = () => {
  const [salaries, setSalaries] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let sno = 1;

  // 🔹 Fetch Salaries
  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/salary/${id}/${user.role}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setSalaries(response.data.salary);
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
    fetchSalaries();
  }, []);

  // 🔹 Loader
  if (!salaries) {
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
      {/* 🔹 Header */}
      <Typography
        variant={isMobile ? "h6" : "h5"}
        sx={{
          fontWeight: "bold",
          mb: { xs: 2, sm: 3 },
          textAlign: "center",
          color: "#004D40",
        }}
      >
        Salary Details
      </Typography>

      {/* 🔹 Add Salary Button (For Admin) */}
      {user.role === "admin" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            mb: { xs: 2, sm: 3 },
          }}
        >
          <Button
            component={Link}
            to="/admin-dashboard/add-salary"
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
            Add Salary
          </Button>
        </Box>
      )}

      {/* 🔹 Salary Table */}
      <TableContainer
        component={Paper}
        elevation={4}
        sx={{
          borderRadius: 3,
          overflowX: "auto", // ✅ Enables scroll on small screens
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Table sx={{ minWidth: 700 }}>
          <TableHead
            sx={{
              background:
                "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
            }}
          >
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>S.No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Employee ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Basic Salary</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Allowance</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Deduction</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Net Salary</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Pay Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {salaries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4, color: "gray" }}>
                  No salary records found.
                </TableCell>
              </TableRow>
            ) : (
              salaries.map((salary) => (
                <TableRow
                  key={salary._id}
                  sx={{
                    "&:hover": { backgroundColor: "#E0F2F1" },
                  }}
                >
                  <TableCell>{sno++}</TableCell>
                  <TableCell>{salary.employeeId?.employeeId || "—"}</TableCell>
                  <TableCell>₹{salary.basicSalary.toLocaleString()}</TableCell>
                  <TableCell>₹{salary.allowances.toLocaleString()}</TableCell>
                  <TableCell>₹{salary.deductions.toLocaleString()}</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#00796b" }}>
                    ₹{salary.netSalary.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(salary.payDate).toLocaleDateString("en-IN")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default View;
