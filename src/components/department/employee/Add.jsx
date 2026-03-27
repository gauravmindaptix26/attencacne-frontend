import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { fetchDepartments } from "../../../utils/EmployeeHelper";
import { getEmployeesProjects } from "../../../utils/ProjectHelper";
import { useNavigate } from "react-router-dom";
import  BASE_URL  from "../../../utils/apiConfig";

const Add = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
    projects: [],
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps || []);
      try {
        const projList = await getEmployeesProjects();
        setProjects(projList || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files, options, multiple } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (name === "projects" && multiple) {
      const selectedProjects = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prev) => ({ ...prev, projects: selectedProjects }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "projects") {
        value.forEach((proj) => formDataToSend.append("projects", proj));
      } else if (value !== null) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/employee/add`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("✅ Employee added successfully!");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert(error.response?.data?.error || "Server error. Check console.");
    }
  };

  // 🌈 Reusable smooth responsive style
  const fieldSx = {
    "& .MuiInputBase-root": {
      height: "clamp(42px, 5vw, 56px)",
      width: "clamp(180px, 40vw, 400px)",
      fontSize: "clamp(0.85rem, 1vw, 1rem)",
    },
    "& .MuiInputLabel-root": {
      fontSize: "clamp(0.8rem, 1vw, 1rem)",
    },
  };

  const selectSx = {
    height: "clamp(42px, 5vw, 56px)",
    width: "clamp(180px, 40vw, 400px)",
    fontSize: "clamp(0.85rem, 1vw, 1rem)",
  };

  const buttonSx = {
    py: "clamp(6px, 1vw, 12px)",
    fontSize: "clamp(0.9rem, 1vw, 1rem)",
    borderRadius: 2,
    textTransform: "none",
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
        Add New Employee
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid
            container
            spacing={{ xs: 2, sm: 3 }}
            alignItems="center"
            justifyContent="center"
          >
            {/* Name */}
            <Grid xs={12} sm={6}>
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                sx={fieldSx}
              />
            </Grid>

            {/* Email */}
            <Grid xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                sx={fieldSx}
              />
            </Grid>

            {/* Employee ID */}
            <Grid xs={12} sm={6}>
              <TextField
                name="employeeId"
                label="Employee ID"
                value={formData.employeeId}
                onChange={handleChange}
                required
                fullWidth
                sx={fieldSx}
              />
            </Grid>

            {/* DOB */}
            <Grid xs={12} sm={6}>
              <TextField
                name="dob"
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                sx={fieldSx}
              />
            </Grid>

            {/* Gender */}
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                  required
                  sx={selectSx}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Marital Status */}
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  label="Marital Status"
                  required
                  sx={selectSx}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Designation */}
            <Grid xs={12} sm={6}>
              <TextField
                name="designation"
                label="Designation"
                value={formData.designation}
                onChange={handleChange}
                required
                fullWidth
                sx={fieldSx}
              />
            </Grid>

            {/* Department */}
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  label="Department"
                  required
                  sx={selectSx}
                >
                  <MenuItem value="">Select Department</MenuItem>
                  {departments.map((dep) => (
                    <MenuItem key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Salary */}
            <Grid xs={12} sm={6}>
              <TextField
                name="salary"
                label="Salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                required
                fullWidth
                sx={fieldSx}
              />
            </Grid>

            {/* Password */}
            <Grid xs={12} sm={6}>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                sx={fieldSx}
              />
            </Grid>

            {/* Role */}
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  label="Role"
                  required
                  sx={selectSx}
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Projects */}
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Projects</InputLabel>
                <Select
                  name="projects"
                  multiple
                  value={formData.projects}
                  onChange={handleChange}
                  label="Projects"
                  sx={selectSx}
                >
                  {projects.map((proj) => (
                    <MenuItem key={proj._id} value={proj._id}>
                      {proj.Title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Image Upload */}
            <Grid xs={12} sm={6}>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  ...buttonSx,
                  width: "clamp(180px, 40vw, 400px)",
                }}
              >
                Upload Profile Image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  hidden
                  onChange={handleChange}
                />
              </Button>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 4,
              ...buttonSx,
              background:
                "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #009688 0%, #388e3c 60%, #00695c 100%)",
              },
            }}
          >
            Add Employee
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Add;
