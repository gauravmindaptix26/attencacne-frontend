import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import  BASE_URL  from "../../../utils/apiConfig";
const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({ dep_name: "", description: "" });
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        console.error("Error fetching department:", error);
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("✅ Department updated successfully!");
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      console.error("Error updating department:", error);
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      }
    }
  };

  if (depLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress
          size={50}
          sx={{
            color: "#00bfa5",
          }}
        />
      </Box>
    );
  }

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
          Edit Department
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
            sx={{
              mt: 4,
              py: 1.5,
              fontSize: "1rem",
              background:
                "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
            }}
          >
            Save Changes
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditDepartment;
