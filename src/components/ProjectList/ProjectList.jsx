import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LaunchIcon from "@mui/icons-material/Launch";
import GroupsIcon from "@mui/icons-material/Groups";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/apiConfig";

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/Project/projectList`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      alert(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectDetails = async (project) => {
    setSelectedProject(project);

    if (!project.employeeIds?.length) {
      setSelectedEmployees([]);
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/Project/projectDetails`,
        { employeeIds: project.employeeIds },
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

  const filteredProjects = projects.filter((project) => {
    const query = search.toLowerCase();
    return (
      project.Title?.toLowerCase().includes(query) ||
      project.Client?.toLowerCase().includes(query) ||
      project.WoM?.toLowerCase().includes(query)
    );
  });

  return (
    <Box sx={{ p: 3 }}>
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
          label="Search by Title, Client or Work Order"
          variant="outlined"
          size="small"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>S.No</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Client</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Work Order</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Dates</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Internal Team</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>External</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Shared Links</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredProjects.map((project, index) => (
                  <TableRow key={project._id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">{project.Title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.description || "No description"}
                      </Typography>
                    </TableCell>
                    <TableCell>{project.Client}</TableCell>
                    <TableCell>{project.WoM}</TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {project.startDate
                          ? new Date(project.startDate).toLocaleDateString()
                          : "-"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        to{" "}
                        {project.endDate
                          ? new Date(project.endDate).toLocaleDateString()
                          : "Open"}
                      </Typography>
                    </TableCell>
                    <TableCell>{project.employeeIds?.length || 0}</TableCell>
                    <TableCell>{project.externalCollaborators?.length || 0}</TableCell>
                    <TableCell>{project.sharedResources?.length || 0}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleProjectDetails(project)}
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
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{selectedProject?.Title || "Project Details"}</DialogTitle>
        <DialogContent dividers>
          {selectedProject && (
            <Stack spacing={3}>
              <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <GroupsIcon color="success" />
                        <Typography fontWeight="bold">Internal Team</Typography>
                      </Stack>
                      <Typography variant="h5">{selectedProject.employeeIds?.length || 0}</Typography>
                      <Typography color="text.secondary">Assigned employees</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} md={4}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <GroupsIcon color="primary" />
                        <Typography fontWeight="bold">External Collaborators</Typography>
                      </Stack>
                      <Typography variant="h5">
                        {selectedProject.externalCollaborators?.length || 0}
                      </Typography>
                      <Typography color="text.secondary">Vendors, clients, consultants</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} md={4}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                        <FolderSharedIcon color="warning" />
                        <Typography fontWeight="bold">Shared Files</Typography>
                      </Stack>
                      <Typography variant="h5">{selectedProject.sharedResources?.length || 0}</Typography>
                      <Typography color="text.secondary">Drive links and documents</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Project Overview
                </Typography>
                <Grid container spacing={2}>
                  <Grid xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Client:</strong> {selectedProject.Client || "-"}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Work Order:</strong> {selectedProject.WoM || "-"}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Address:</strong> {selectedProject.Address || "-"}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Duration:</strong>{" "}
                      {selectedProject.startDate
                        ? new Date(selectedProject.startDate).toLocaleDateString()
                        : "-"}{" "}
                      to{" "}
                      {selectedProject.endDate
                        ? new Date(selectedProject.endDate).toLocaleDateString()
                        : "Open"}
                    </Typography>
                  </Grid>
                  <Grid xs={12}>
                    <Typography variant="body2">
                      <strong>Description:</strong> {selectedProject.description || "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  External Collaborators
                </Typography>
                {selectedProject.externalCollaborators?.length ? (
                  <Grid container spacing={2}>
                    {selectedProject.externalCollaborators.map((collaborator, index) => (
                      <Grid xs={12} md={6} key={`${collaborator.email || collaborator.name}-${index}`}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography fontWeight="bold">{collaborator.name}</Typography>
                            <Typography variant="body2">
                              {collaborator.role || "No role"}
                              {collaborator.organization ? `, ${collaborator.organization}` : ""}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {collaborator.email || "-"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {collaborator.phone || "-"}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography color="text.secondary">No external collaborators added.</Typography>
                )}
              </Paper>

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Shared Files And Links
                </Typography>
                {selectedProject.sharedResources?.length ? (
                  <Stack spacing={1.5}>
                    {selectedProject.sharedResources.map((resource, index) => (
                      <Card variant="outlined" key={`${resource.url}-${index}`}>
                        <CardContent>
                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            justifyContent="space-between"
                            spacing={1}
                          >
                            <Box>
                              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                <Typography fontWeight="bold">{resource.title}</Typography>
                                <Chip
                                  size="small"
                                  label={resource.resourceType || "other"}
                                  sx={{ textTransform: "capitalize" }}
                                />
                              </Stack>
                              <Typography variant="body2" color="text.secondary">
                                {resource.notes || "No notes added."}
                              </Typography>
                            </Box>
                            <Link
                              href={resource.url}
                              target="_blank"
                              rel="noreferrer"
                              underline="none"
                              sx={{ alignSelf: "center" }}
                            >
                              <Button variant="outlined" endIcon={<LaunchIcon />}>
                                Open Link
                              </Button>
                            </Link>
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                ) : (
                  <Typography color="text.secondary">No shared resources added.</Typography>
                )}
              </Paper>

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Internal Team Members
                </Typography>
                {selectedEmployees.length === 0 ? (
                  <Typography color="text.secondary">No employees found.</Typography>
                ) : (
                  <Grid container spacing={2}>
                    {selectedEmployees.map((employee) => (
                      <Grid xs={12} md={6} key={employee._id}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {employee.userId?.name || employee.employeeId}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Employee ID:</strong> {employee.employeeId}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Email:</strong> {employee.userId?.email || "-"}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Designation:</strong> {employee.designation || "-"}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Department:</strong> {employee.department?.dep_name || "-"}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Salary:</strong> {employee.salary ? `$${employee.salary}` : "-"}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Paper>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} variant="contained" color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectList;
