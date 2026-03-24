import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import SummaryCard from "./SummaryCard";
import employeeAnimation from "../../../assests/employee.mp4";
import departmentAnimation from "../../../assests/Department.mp4";
import salaryAnimation from "../../../assests/Salary.mp4";
import leavesAnimation from "../../../assests/Leaves.mp4";
import  BASE_URL  from "../../../utils/apiConfig";
const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({
    employees: 0,
    departments: 0,
    salary: 0,
    leaves: 0,
  });

  // 🔹 Fetch dashboard summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/dashboard/summary`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };
    fetchSummary();
  }, []);

  // 🔹 Animate numbers
  useEffect(() => {
    if (summary) {
      const duration = 1000;
      const steps = 25;
      const intervalTime = duration / steps;

      const increments = {
        employees: summary.totalEmployees / steps,
        departments: summary.totalDepartments / steps,
        salary: summary.totalSalary / steps,
        leaves: summary.leaveSummary.appliedFor / steps,
      };

      let current = { employees: 0, departments: 0, salary: 0, leaves: 0 };
      const interval = setInterval(() => {
        current = {
          employees: Math.min(summary.totalEmployees, current.employees + increments.employees),
          departments: Math.min(summary.totalDepartments, current.departments + increments.departments),
          salary: Math.min(summary.totalSalary, current.salary + increments.salary),
          leaves: Math.min(summary.leaveSummary.appliedFor, current.leaves + increments.leaves),
        };
        setAnimatedValues({ ...current });
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [summary]);

  if (!summary)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 2 }}>
      {/* 🔹 Header Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
          borderRadius: 4,
          p: 7,
          mb: 3,
          color: "white",
          textAlign: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" letterSpacing={0.5}>
          Company Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
          Overview of Employees, Salary, Departments & Leaves
        </Typography>
      </Box>

      {/* 🔹 Summary Cards Section */}
      <Grid container spacing={4} justifyContent="center">
        {/* 👇 Employee Card */}
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            icon={
              <video
                src={employeeAnimation}
                autoPlay
                loop
                muted
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  borderRadius: "20px",
                }}
              />
            }
            text="Total Employees"
            number={Math.round(animatedValues.employees)}
            color="#009688"
          />
        </Grid>

        {/* 👇 Department Card */}
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            icon={
              <video
                src={departmentAnimation}
                autoPlay
                loop
                muted
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  borderRadius: "20px",
                }}
              />
            }
            text="Departments"
            number={Math.round(animatedValues.departments)}
            color="#26A69A"
          />
        </Grid>

        {/* 👇 Salary Card */}
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            icon={
              <video
                src={salaryAnimation}
                autoPlay
                loop
                muted
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  borderRadius: "20px",
                }}
              />
            }
            text="Total Salary (₹)"
            number={Math.round(animatedValues.salary)}
            color="#43A047"
          />
        </Grid>

        {/* 👇 Leaves Card */}
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            icon={
              <video
                src={leavesAnimation}
                autoPlay
                loop
                muted
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  borderRadius: "20px",
                }}
              />
            }
            text="Leaves Applied"
            number={Math.round(animatedValues.leaves)}
            color="#00796B"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminSummary;
