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
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { getEmployees } from "../../utils/ProjectHelper";
import { useNavigate } from "react-router-dom";
import  BASE_URL  from "../../utils/apiConfig";
const Project = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    Title: "",
    Client: "",
    Address: "",
    WoM: "",
    startDate: "",
    endDate: "",
    employeeIds: [],
    description: "",
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      const emps = await getEmployees();
      setEmployees(emps || []);
    };
    fetchAllEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (event) => {
    const {
      target: { value },
    } = event;
    setProject((prev) => ({
      ...prev,
      employeeIds: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/Project/add`,
        project,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Server Error");
    }
  };

  // 🌈 Reusable responsive field style
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
    background:
      "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
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
        Add Project
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
            {/* Title */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="Title"
                label="Title of the Project"
                value={project.Title}
                onChange={handleChange}
                fullWidth
                required
                sx={fieldSx}
              />
            </Grid>

            {/* Client */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="Client"
                label="Client"
                value={project.Client}
                onChange={handleChange}
                fullWidth
                required
                sx={fieldSx}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="Address"
                label="Address of the Client"
                value={project.Address}
                onChange={handleChange}
                fullWidth
                required
                sx={fieldSx}
              />
            </Grid>

            {/* Work Order */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="WoM"
                label="Work Order Number"
                value={project.WoM}
                onChange={handleChange}
                fullWidth
                required
                sx={fieldSx}
              />
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="startDate"
                label="From Date"
                type="date"
                value={project.startDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
                sx={fieldSx}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="endDate"
                label="To Date"
                type="date"
                value={project.endDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={fieldSx}
              />
            </Grid>

            {/* Employees */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={fieldSx}>
                <InputLabel>Assign Employees</InputLabel>
                <Select
                  multiple
                  name="employeeIds"
                  value={project.employeeIds}
                  onChange={handleMultiSelect}
                  input={<OutlinedInput label="Assign Employees" />}
                  renderValue={(selected) =>
                    employees
                      .filter((emp) => selected.includes(emp._id))
                      .map((emp) => emp.employeeId)
                      .join(", ")
                  }
                  MenuProps={{ disableScrollLock: true }}
                >
                  {employees.map((emp) => (
                    <MenuItem key={emp._id} value={emp._id}>
                      <Checkbox
                        checked={project.employeeIds.indexOf(emp._id) > -1}
                      />
                      <ListItemText primary={emp.employeeId} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Description */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="description"
                label="Description"
                value={project.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                sx={fieldSx}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" fullWidth sx={buttonSx}>
            Add Project
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Project;
