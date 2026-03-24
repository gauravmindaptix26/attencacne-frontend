import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { AttendanceButtons } from "../../../utils/AttendanceHelper";
import  BASE_URL  from "../../../utils/apiConfig";
const Marking = () => {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/attendance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.employees.map((emp) => ({
          id: emp._id,
          sno: sno++,
          employeeId: emp.employeeId,
          name: emp.name,
          department: emp.department,
          date: emp.date,
          attendanceStatus: emp.attendanceStatus,
        }));
        setEmployees(data);
        setFiltered(data);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredData = employees.filter((emp) =>
      emp.employeeId.toLowerCase().includes(value)
    );
    setFiltered(filteredData);
  };

  const filterAttendance = (e) => {
    const value = e.target.value.trim();
    if (!value) {
      setFiltered(employees);
      return;
    }
    const filteredData = employees.filter((emp) =>
      emp.date?.startsWith(value)
    );
    setFiltered(filteredData);
  };

  const columns = [
    { field: "sno", headerName: "S.No", width: 90 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    { field: "employeeId", headerName: "Emp ID", flex: 1, minWidth: 120 },
    { field: "department", headerName: "Department", flex: 1, minWidth: 120 },
    { field: "date", headerName: "Date", flex: 1, minWidth: 120 },
    {
      field: "attendanceStatus",
      headerName: "Action",
      flex: 1.2,
      minWidth: 150,
      renderCell: (params) => (
        <AttendanceButtons
          Id={params.row.id}
          attendanceStatus={params.row.attendanceStatus}
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {loading ? (
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
      ) : (
        <Box>
          {/* 🔹 Top Bar */}
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              p: { xs: 2, sm: 3 },
              mb: 3,
              borderRadius: 3,
            }}
          >
            <TextField
              label="Search by Date (YYYY-MM-DD)"
              variant="outlined"
              size="small"
              onChange={filterAttendance}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 50%" },
                minWidth: { xs: "100%", sm: "250px" },
              }}
            />

            <Button
              component={Link}
              to="/admin-dashboard/add-employee"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                flexShrink: 0,
                background:
                  "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
                borderRadius: 2,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #00a896 0%, #2e7d32 50%, #00695c 100%)",
                },
              }}
            >
              Add New Employee
            </Button>
          </Paper>

          {/* 🔹 Data Table */}
         {/* PAPER (container) */}
<Paper
  elevation={3}
  sx={{
    p: { xs: 2, sm: 3, md: 4 },
    borderRadius: 3,
    width: "100%",
    mx: "auto",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
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
    Attendance Records
  </Typography>

  {/* Allow grid to grow; DO NOT hide overflow on parent */}
  <Box sx={{ width: "100%" }}>
    <DataGrid
      rows={filtered}
      columns={columns}
      pageSize={8}
      rowsPerPageOptions={[8, 15, 25]}
      disableSelectionOnClick
      autoHeight // grid expands to fit rows -> page scrolls
      sx={{
        border: "none",
        "& .MuiDataGrid-columnHeaders": {
          background:
            "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
          color: "white",
          fontWeight: "bold",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "#E0F2F1",
        },
        // make sure cell content (buttons) is visible
        "& .MuiDataGrid-cell": {
          overflow: "visible",
          whiteSpace: "nowrap",
        },
      }}
    />
  </Box>
</Paper>


        </Box>
      )}
    </Box>
  );
};

export default Marking;
