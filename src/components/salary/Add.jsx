import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import  BASE_URL  from "../../utils/apiConfig";
const Add = () => {
  const navigate = useNavigate();
  const [salary, setSalary] = useState({
    employeeId: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: "",
  });

  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch departments
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  // Fetch employees by department
  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  if (!departments)
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

  // 🌈 Reusable responsive styles
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
        Add Salary
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
            {/* Department */}
            <Grid xs={12} sm={6}>
              <TextField
                select
                label="Department"
                fullWidth
                onChange={handleDepartment}
                SelectProps={{ MenuProps: { disableScrollLock: true } }}
                required
                sx={fieldSx}
              >
                <MenuItem value="">Select Department</MenuItem>
                {departments.map((dep) => (
                  <MenuItem key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Employee */}
            <Grid xs={12} sm={6}>
              <TextField
                select
                label="Employee"
                name="employeeId"
                fullWidth
                onChange={handleChange}
                SelectProps={{ MenuProps: { disableScrollLock: true } }}
                required
                sx={fieldSx}
              >
                <MenuItem value="">Select Employee</MenuItem>
                {employees.map((emp) => (
                  <MenuItem key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Basic Salary */}
            <Grid xs={12} sm={6}>
              <TextField
                type="number"
                label="Basic Salary"
                name="basicSalary"
                fullWidth
                onChange={handleChange}
                required
                sx={fieldSx}
              />
            </Grid>

            {/* Allowances */}
            <Grid xs={12} sm={6}>
              <TextField
                type="number"
                label="Allowances"
                name="allowances"
                fullWidth
                onChange={handleChange}
                required
                sx={fieldSx}
              />
            </Grid>

            {/* Deductions */}
            <Grid xs={12} sm={6}>
              <TextField
                type="number"
                label="Deductions"
                name="deductions"
                fullWidth
                onChange={handleChange}
                required
                sx={fieldSx}
              />
            </Grid>

            {/* Pay Date */}
            <Grid xs={12} sm={6}>
              <TextField
                type="date"
                label="Pay Date"
                name="payDate"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                required
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
            {loading ? "Adding Salary..." : "Add Salary"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Add;
