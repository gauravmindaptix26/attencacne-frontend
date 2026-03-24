import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EmployeeButtons } from "../../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns } from "../../../utils/EmployeeHelper";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import  BASE_URL  from "../../../utils/apiConfig";
const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

  // 🔹 Fetch employee projects
  const fetchProjectsByEmployee = async (empId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/employee/projects/${empId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        return response.data.projects.map((p) => p.Title);
      }
      return [];
      console.log(response)
    } catch (error) {
      console.error("Error fetching projects for employee:", error);
      return [];
    }
  };

  // 🔹 Fetch all employees
  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/employee`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        const empData = await Promise.all(
          response.data.employees.map(async (emp, index) => {
            const projectTitles = await fetchProjectsByEmployee(emp._id);
            return {
              _id: emp._id,
              sno: index + 1,
              dep_name: emp.department?.dep_name || "",
              name: emp.userId?.name || "",
              dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "",
              profileImage: emp.userId?.profileImage ? (
               <img
    width={40}
    className="rounded-full"
    src={emp.userId.profileImage} // ✅ Cloudinary URL (no localhost prefix)
    alt={emp.userId.name}
  />
              ) : null,
              projects:
                projectTitles.length > 0 ? projectTitles.join(", ") : "No Projects",
              action: <EmployeeButtons Id={emp._id} />,
            };
          })
        );

        setEmployees(empData);
        setFilteredEmployees(empData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEmpLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  // 🔹 Custom DataTable Styling
  const customStyles = {
    headCells: {
      style: {
        background: "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "15px",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        "&:hover": {
          backgroundColor: "#E0F2F1",
        },
      },
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔹 Page Header */}
      
      {/* 🔹 Filter + Button Row */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          mb: 3,
          borderRadius: 3,
        }}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          onChange={handleFilter}
          sx={{ width: { xs: "100%", sm: "50%" }, mb: { xs: 2, sm: 0 } }}
        />
        <Button
          component={Link}
          to="/admin-dashboard/add-employee"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
           background: "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
            borderRadius: 2,
            px: 3,
            py: 1,
          }}
        >
          Add New Employee
        </Button>
      </Paper>

      {/* 🔹 Employee Data Table */}
      <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
        {empLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress color="success" />
          </Box>
        ) : (
          <DataTable
            columns={columns}
            data={filteredEmployee}
            pagination
            customStyles={customStyles}
            highlightOnHover
            striped
          />
        )}
      </Paper>
    </Box>
  );
};

export default List;
