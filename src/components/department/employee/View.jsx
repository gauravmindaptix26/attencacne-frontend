import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import  BASE_URL  from "../../../utils/apiConfig";
const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Employee Details
  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setEmployee(response.data.employee);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error fetching employee details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  if (loading)
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );

  if (!employee)
    return (
      <Typography align="center" color="text.secondary" mt={10}>
        No employee data found.
      </Typography>
    );

  // 🔹 Compute the correct image URL
  const profileImageUrl =
    employee.userId?.profileImage?.startsWith("http")
      ? employee.userId.profileImage
      : employee.userId?.profileImage
      ? `http://localhost:7000/${employee.userId.profileImage}`
      : "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={4}
          sx={{
            background:
              "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Employee Details
        </Typography>

        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Profile Image */}
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            justifyContent={{ xs: "center", md: "flex-end" }}
          >
            <Avatar
              src={profileImageUrl}
              alt={employee.userId.name}
              sx={{
                width: { xs: 150, sm: 180, md: 200 },
                height: { xs: 150, sm: 180, md: 200 },
                border: "4px solid #00bfa5",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            />
          </Grid>

          {/* Employee Info */}
          <Grid
            item
            xs={12}
            md={8}
            display="flex"
            justifyContent={{ xs: "center", md: "flex-start" }}
            width="100%"
          >
            <Card
              elevation={2}
              sx={{
                borderRadius: 2,
                width: "100%",
                maxWidth: { xs: "100%", md: "90%" },
              }}
            >
              <CardContent
                sx={{
                  width: "100%",
                  px: { xs: 2, sm: 3 },
                }}
              >
                <DetailRow label="Name" value={employee.userId.name} />
                <DetailRow label="Employee ID" value={employee.employeeId} />
                <DetailRow
                  label="Date of Birth"
                  value={new Date(employee.dob).toLocaleDateString()}
                />
                <DetailRow label="Gender" value={employee.gender} />
                <DetailRow
                  label="Department"
                  value={employee.department?.dep_name || "-"}
                />
                <DetailRow
                  label="Marital Status"
                  value={employee.maritalStatus || "-"}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

// 🔹 Small Reusable Component for Label + Value Rows
const DetailRow = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      justifyContent: "space-between",
      alignItems: { xs: "flex-start", sm: "center" },
      mb: 1.5,
      borderBottom: "1px solid #e0e0e0",
      pb: 0.5,
      gap: { xs: 0.5, sm: 0 },
      wordBreak: "break-word",
    }}
  >
    <Typography
      variant="subtitle1"
      fontWeight="bold"
      color="text.primary"
      sx={{ minWidth: { sm: "130px" } }}
    >
      {label}:
    </Typography>
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ textAlign: { xs: "left", sm: "right" }, flex: 1 }}
    >
      {value}
    </Typography>
  </Box>
);

export default View;
