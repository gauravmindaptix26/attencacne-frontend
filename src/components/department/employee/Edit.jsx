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
import { useNavigate, useParams } from "react-router-dom";
import  BASE_URL  from "../../../utils/apiConfig";
const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps || []);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          const emp = response.data.employee;
          setEmployee({
            name: emp.userId.name || "",
            maritalStatus: emp.maritalStatus || "",
            designation: emp.designation || "",
            salary: emp.salary || "",
            department: emp.department || "",
          });
        }
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`{BASE_URL}/employee/${id}`, employee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6 }}>
      <Paper
        elevation={4}
        sx={{ p: 4, borderRadius: 3, backgroundColor: "#fafafa" }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Edit Employee
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12} md={6}>
              <TextField
                name="name"
                label="Employee Name"
                value={employee.name}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-root": {
                    height: 56,
                    width: 400,
                    fontSize: "1rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1rem",
                  },
                }}
              />
            </Grid>

            {/* Marital Status */}
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-root": {
                    height: 56,
                    width: 400,
                    fontSize: "1rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1rem",
                  },
                }}
              >
                <InputLabel>Marital Status</InputLabel>
                <Select
                  name="maritalStatus"
                  value={employee.maritalStatus}
                  onChange={handleChange}
                  label="Marital Status"
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Designation */}
            <Grid item xs={12} md={6}>
              <TextField
                name="designation"
                label="Designation"
                value={employee.designation}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-root": {
                    height: 56,
                    width: 400,
                    fontSize: "1rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1rem",
                  },
                }}
              />
            </Grid>

            {/* Department */}
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-root": {
                    height: 56,
                    width: 400,
                    fontSize: "1rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1rem",
                  },
                }}
              >
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  label="Department"
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
            <Grid item xs={12} md={6}>
              <TextField
                name="salary"
                label="Salary"
                type="number"
                value={employee.salary}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  "& .MuiInputBase-root": {
                    height: 56,
                    width: 400,
                    fontSize: "1rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1rem",
                  },
                }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 4,
              background:
                "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
            }}
          >
            Update Employee
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Edit;
