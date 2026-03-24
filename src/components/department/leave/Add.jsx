import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../../../context/authcontext";
import { useNavigate } from "react-router-dom";
import  BASE_URL  from "../../../utils/apiConfig";
const AddLeave = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [leaveData, setLeaveData] = useState({
    userId: user?._id || "",
    name: user?.name || "",
    designation: user?.designation || "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    totalEntitlement: "",
    totalAvailed: "",
    balance: "",
    recommendedBy: "",
    approvedBy: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);

  const leaveTypes = ["Sick Leave", "Casual Leave", "Annual Leave"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/leave/add`,
        leaveData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error ||
          "Something went wrong while submitting leave"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🌈 Responsive shared styles
  const fieldSx = {
    "& .MuiInputBase-root": {
      height: "clamp(42px, 5vw, 56px)",
      width: "clamp(200px, 50vw, 400px)",
      fontSize: "clamp(0.85rem, 1vw, 1rem)",
    },
    "& .MuiInputLabel-root": {
      fontSize: "clamp(0.8rem, 1vw, 1rem)",
    },
  };

  const buttonSx = {
    mt: 4,
    py: "clamp(6px, 1vw, 12px)",
    fontWeight: "bold",
    borderRadius: 2,
    fontSize: "clamp(0.9rem, 1vw, 1rem)",
    background: "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
    "&:hover": {
      background:
        "linear-gradient(135deg, #009688 0%, #388e3c 60%, #00695c 100%)",
    },
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        mb={3}
        sx={{
          background:
            "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Add Leave
      </Typography>

      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          maxWidth: 900,
          mx: "auto",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#fafafa",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={{ xs: 2, sm: 3 }}
            alignItems="center"
            justifyContent="center"
          >
            {/* Leave Type */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Leave Type"
                name="leaveType"
                value={leaveData.leaveType}
                onChange={handleChange}
                fullWidth
                SelectProps={{ MenuProps: { disableScrollLock: true } }}
                required
                sx={fieldSx}
              >
                <MenuItem value="">Select Leave Type</MenuItem>
                {leaveTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Start Date"
                name="startDate"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleChange}
                required
                sx={fieldSx}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="End Date"
                name="endDate"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleChange}
                required
                sx={fieldSx}
              />
            </Grid>

            {/* Designation */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Designation"
                name="designation"
                fullWidth
                value={leaveData.designation}
                onChange={handleChange}
                required
                sx={fieldSx}
              />
            </Grid>

            {/* Reason */}
            {/* Reason */}
{/* Reason */}
<Grid item xs={12} sm={6}>
  <TextField
    label="Reason"
    name="reason"
    fullWidth
    multiline
    rows={3}
    onChange={handleChange}
    required
    sx={{
      "& .MuiInputBase-root": {
        height: "clamp(42px, 5vw, 56px)",
        width: "clamp(200px, 50vw, 400px)", // ✅ matches other fields
        fontSize: "clamp(0.85rem, 1vw, 1rem)",
      },
      "& .MuiInputLabel-root": {
        fontSize: "clamp(0.8rem, 1vw, 1rem)",
      },
    }}
  />
</Grid>



            {/* Total Entitlement */}
            <Grid item xs={12} sm={4}>
              <TextField
                type="number"
                label="Total Entitlement"
                name="totalEntitlement"
                fullWidth
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>

            {/* Total Availed */}
            <Grid item xs={12} sm={4}>
              <TextField
                type="number"
                label="Total Availed"
                name="totalAvailed"
                fullWidth
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>

            {/* Balance */}
            <Grid item xs={12} sm={4}>
              <TextField
                type="number"
                label="Balance"
                name="balance"
                fullWidth
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>

            {/* Recommended By */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Recommended By"
                name="recommendedBy"
                fullWidth
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>

            {/* Approved By */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Approved By"
                name="approvedBy"
                fullWidth
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={buttonSx}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
            ) : (
              "Submit Leave"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddLeave;
