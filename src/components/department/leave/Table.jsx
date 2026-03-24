import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  ButtonGroup,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { columns } from "../../../utils/LeaveHelper";
import { LeaveButtons } from "../../../utils/LeaveHelper";
import { Link } from "react-router-dom";
import  BASE_URL  from "../../../utils/apiConfig";
const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/leave`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const value = e.target.value.toLowerCase();
    const records = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(value)
    );
    setFilteredLeaves(records);
  };

  const filterByStatus = (status) => {
    const records = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(records);
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );

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
          label="Search by Employee ID"
          variant="outlined"
          size="small"
          onChange={filterByInput}
          sx={{
            width: { xs: "100%", sm: "50%" },
            mb: { xs: 2, sm: 0 },
          }}
        />
         <ButtonGroup variant="contained" aria-label="outlined button group">
          <Button
            onClick={() => filterByStatus("Pending")}
            sx={{
              background:
                "linear-gradient(135deg, #FFD54F 0%, #FFA000 50%, #FF8F00 100%)",
            }}
          >
            Pending
          </Button>
          <Button
            onClick={() => filterByStatus("Approve")}
            sx={{
              background:
                "linear-gradient(135deg, #66BB6A 0%, #43A047 50%, #2E7D32 100%)",
            }}
          >
            Approved
          </Button>
          <Button
            onClick={() => filterByStatus("Rejected")}
            sx={{
              background:
                "linear-gradient(135deg, #EF5350 0%, #E53935 50%, #C62828 100%)",
            }}
          >
            Rejected
          </Button>
        </ButtonGroup>
      </Paper>

      {/* 🔹 Status Filter Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
       
      </Box>

      {/* 🔹 Table */}
      <Paper
        elevation={4}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <DataTable
          columns={columns}
          data={filteredLeaves}
          pagination
          highlightOnHover
          customStyles={{
            headCells: {
              style: {
                background:
                  "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
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
          }}
        />
      </Paper>
    </Box>
  );
};

export default Table;
