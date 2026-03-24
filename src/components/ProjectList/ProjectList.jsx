import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  BASE_URL  from "../../utils/apiConfig";
const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/Project/projectList`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) setProjects(response.data.projects);
    } catch (error) {
      alert(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 🔹 Handle viewing team members
  const handleTeam = async (employeeIds) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/Project/projectDetails`,
        { employeeIds },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        setSelectedEmployees(response.data.employees);
        setShowModal(true);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  // 🔹 Filter projects
  const filteredProjects = projects.filter((project) =>
    project.Title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔹 Search & Add Button Panel */}
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
          label="Search by Project Title"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: "100%", sm: "50%" }, mb: { xs: 2, sm: 0 } }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin-dashboard/Project")}
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
          Add New Project
        </Button>
      </Paper>

      {/* 🔹 Project Table */}
      <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress color="success" />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead
                sx={{
                  background:
                    "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
                }}
              >
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    S.No
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Title
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Client
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Address
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Work Order No.
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Start Date
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    End Date
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredProjects.map((project, index) => (
                  <TableRow key={project._id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{project.Title}</TableCell>
                    <TableCell>{project.Client}</TableCell>
                    <TableCell>{project.Address}</TableCell>
                    <TableCell>{project.WoM}</TableCell>
                    <TableCell>
                      {new Date(project.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {project.endDate
                        ? new Date(project.endDate).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>{project.description || "-"}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleTeam(project.employeeIds)}
                        sx={{
                          textTransform: "none",
                          background:
                            "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #00a896 0%, #2e7d32 50%, #00695c 100%)",
                          },
                        }}
                      >
                        Team
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* 🔹 Team Modal */}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent dividers>
          {selectedEmployees.length === 0 ? (
            <Typography color="textSecondary">No employees found.</Typography>
          ) : (
            <Grid container spacing={2}>
              {selectedEmployees.map((employee) => (
                <Grid item xs={12} sm={6} key={employee._id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {employee.employeeId}
                      </Typography>
                      <Typography variant="body2">
                        <strong>User ID:</strong> {employee.userId || "-"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>DOB:</strong>{" "}
                        {employee.dob
                          ? new Date(employee.dob).toLocaleDateString()
                          : "-"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Gender:</strong> {employee.gender || "-"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Marital Status:</strong>{" "}
                        {employee.maritalStatus || "-"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Designation:</strong>{" "}
                        {employee.designation || "-"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Department:</strong>{" "}
                        {employee.department?.dep_name || "-"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Salary:</strong>{" "}
                        {employee.salary ? `$${employee.salary}` : "-"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowModal(false)}
            variant="contained"
            color="error"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectList;
