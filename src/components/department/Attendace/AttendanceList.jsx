import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import  BASE_URL  from "../../../utils/apiConfig";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AttendanceList = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [attendLoading, setAttendLoading] = useState(false);

  // 🔹 Fetch Attendance Records
  const fetchAttendance = async () => {
    setAttendLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/attendance/attend/local`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        let sno = 1;
        const grouped = response.data.data;

        const data = grouped.map((group) => ({
          _id: group._id,
          sno: sno++,
          date: group._id,
          totalEmployees: group.count,
          presentCount: group.records.filter((r) => r.status === "Present")
            .length,
          absentCount: group.records.filter((r) => r.status === "Absent").length,
        }));

        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching attendance list");
    } finally {
      setAttendLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // 🔹 Search Filter
  const filterAttendance = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const records = attendance.filter((a) =>
      a.date.toLowerCase().includes(searchValue)
    );
    setFilteredAttendance(records);
  };

  // 🔹 DataTable Columns
  const columns = [
    {
      name: "S.No",
      selector: (row) => row.sno,
      sortable: true,
      width: "90px",
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Total Employees",
      selector: (row) => row.totalEmployees,
      sortable: true,
    },
    {
      name: "Present",
      selector: (row) => row.presentCount,
      sortable: true,
      cell: (row) => (
        <Typography color="green" fontWeight="bold">
          {row.presentCount}
        </Typography>
      ),
    },
    {
      name: "Absent",
      selector: (row) => row.absentCount,
      sortable: true,
      cell: (row) => (
        <Typography color="error" fontWeight="bold">
          {row.absentCount}
        </Typography>
      ),
    },
  ];

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
      {/* 🔹 Header Panel (Search + Add Button) */}
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
          label="Search by Date (YYYY-MM-DD)"
          variant="outlined"
          size="small"
          onChange={filterAttendance}
          sx={{
            width: { xs: "100%", sm: "50%" },
            mb: { xs: 2, sm: 0 },
          }}
        />
        <Button
          component={Link}
          to="/admin-dashboard/Attendance/Marking"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background:
              "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
            borderRadius: 2,
            px: 3,
            py: 1,
            "&:hover": {
              background:
                "linear-gradient(135deg, #00a896 0%, #2e7d32 50%, #00695c 100%)",
            },
          }}
        >
          Add New Attendance
        </Button>
      </Paper>

      {/* 🔹 Attendance Data Table */}
      <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
        {attendLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress color="success" />
          </Box>
        ) : (
          <DataTable
            columns={columns}
            data={filteredAttendance}
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

export default AttendanceList;
