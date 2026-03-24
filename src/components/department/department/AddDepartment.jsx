import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  BASE_URL  from "../../../utils/apiConfig";
const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/department/add`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("✅ Department added successfully!");
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      console.error("Error adding department:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 8 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fafafa",
        }}
      >
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
          Add Department
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Department Name"
            name="dep_name"
            value={department.dep_name}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              mb: 3,
              "& .MuiInputBase-root": { height: 56, fontSize: "1rem" },
            }}
          />

          <TextField
            label="Description"
            name="description"
            value={department.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{
              "& .MuiInputBase-root": { fontSize: "1rem" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 4,
              py: 1.5,
              fontSize: "1rem",
              background:
                "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
            }}
          >
            {loading ? <CircularProgress size={26} sx={{ color: "#fff" }} /> : "Add Department"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddDepartment;
