import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns, DepartmentButtons } from "../../../utils/DepartmentHelper";
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
const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  // 🔹 Refresh after delete
  const onDepartmentDelete = async () => {
    fetchDepartments();
  };

  // 🔹 Fetch departments
  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/department`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />
          ),
        }));

        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      } else {
        console.error(error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // 🔹 Filter departments
  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  // 🔹 Custom Table Styling
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
     

      {/* 🔹 Search and Add Button */}
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
          label="Search by Department Name"
          variant="outlined"
          size="small"
          onChange={filterDepartments}
          sx={{ width: { xs: "100%", sm: "50%" }, mb: { xs: 2, sm: 0 } }}
        />
        <Button
          component={Link}
          to="/admin-dashboard/add-department"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
            borderRadius: 2,
            px: 3,
            py: 1,
          }}
        >
          Add New Department
        </Button>
      </Paper>

      {/* 🔹 Data Table */}
      <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
        {depLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress color="success" />
          </Box>
        ) : (
          <DataTable
            columns={columns}
            data={filteredDepartments}
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

export default DepartmentList;

