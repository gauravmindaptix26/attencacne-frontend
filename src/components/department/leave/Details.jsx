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
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import  BASE_URL  from "../../../utils/apiConfig";
const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Leave Details
  const fetchLeave = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/leave/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) setLeave(response.data.detail);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error fetching leave details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeave();
  }, [id]);

  // 🔹 Approve/Reject Handlers
  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to update status");
    }
  };

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

  if (!leave)
    return (
      <Typography align="center" color="text.secondary" mt={10}>
        No leave data found.
      </Typography>
    );

  // 🔹 Compute employee image URL
  const profileImageUrl =
    leave.employeeId?.userId?.profileImage?.startsWith("http")
      ? leave.employeeId.userId.profileImage
      : leave.employeeId?.userId?.profileImage
      ? `http://localhost:7000/${leave.employeeId.userId.profileImage}`
      : "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png";

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 1100,
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
          Leave Details
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
              alt={leave.employeeId?.userId?.name}
              sx={{
                width: { xs: 150, sm: 180, md: 200 },
                height: { xs: 150, sm: 180, md: 200 },
                border: "4px solid #00bfa5",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            />
          </Grid>

          {/* Leave Info */}
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
                maxWidth: { xs: "100%", md: "95%" },
              }}
            >
              <CardContent
                sx={{
                  width: "100%",
                  px: { xs: 2, sm: 3 },
                }}
              >
                <DetailRow label="Name" value={leave.employeeId?.userId?.name} />
                <DetailRow
                  label="Employee ID"
                  value={leave.employeeId?.employeeId}
                />
                <DetailRow
                  label="Designation"
                  value={leave.designation || "-"}
                />
                <DetailRow
                  label="Department"
                  value={leave.employeeId?.department?.dep_name || "-"}
                />
                <DetailRow label="Leave Type" value={leave.leaveType} />
                <DetailRow
                  label="From Date"
                  value={new Date(leave.startDate).toLocaleDateString()}
                />
                <DetailRow
                  label="To Date"
                  value={new Date(leave.endDate).toLocaleDateString()}
                />
                <DetailRow label="No. of Days" value={leave.noOfDays} />
                <DetailRow label="Reason for Leave" value={leave.reason} />
                <DetailRow
                  label="Date of Application"
                  value={new Date(leave.date).toLocaleDateString()}
                />

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="text.primary"
                  mb={1}
                >
                  For Office Use Only
                </Typography>

                <DetailRow
                  label="Total Entitlement"
                  value={leave.totalEntitlement || "-"}
                />
                <DetailRow
                  label="Total Availed"
                  value={leave.totalAvailed || "-"}
                />
                <DetailRow label="Balance" value={leave.balance || "-"} />
                <DetailRow
                  label="Recommended By"
                  value={leave.recommendedBy || "-"}
                />
                <DetailRow label="Approved By" value={leave.approvedBy || "-"} />

                <DetailRow
                  label="Status"
                  value={
                    <Typography
                      sx={{
                        color:
                          leave.status === "Approved"
                            ? "green"
                            : leave.status === "Rejected"
                            ? "red"
                            : "orange",
                        fontWeight: "bold",
                      }}
                    >
                      {leave.status}
                    </Typography>
                  }
                />

                {/* 🔹 Action Buttons */}
                {leave.status === "Pending" && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "center",
                      mt: 3,
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => changeStatus(leave._id, "Approved")}
                      sx={{
                        background:
                          "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

// 🔹 Reusable Row Component
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
      sx={{ minWidth: { sm: "180px" } }}
    >
      {label}:
    </Typography>
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{
        textAlign: { xs: "left", sm: "right" },
        flex: 1,
        wordBreak: "break-word",
      }}
    >
      {value || "—"}
    </Typography>
  </Box>
);

export default Details;
