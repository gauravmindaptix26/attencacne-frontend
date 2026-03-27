import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { getEmployees } from "../../utils/ProjectHelper";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/apiConfig";

const emptyCollaborator = {
  name: "",
  organization: "",
  role: "",
  email: "",
  phone: "",
};

const emptyResource = {
  title: "",
  url: "",
  resourceType: "google-drive",
  notes: "",
};

const resourceTypes = [
  { value: "google-drive", label: "Google Drive" },
  { value: "onedrive", label: "OneDrive" },
  { value: "dropbox", label: "Dropbox" },
  { value: "document", label: "Document" },
  { value: "folder", label: "Folder" },
  { value: "other", label: "Other" },
];

const Project = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    Title: "",
    Client: "",
    Address: "",
    WoM: "",
    startDate: "",
    endDate: "",
    employeeIds: [],
    description: "",
    externalCollaborators: [{ ...emptyCollaborator }],
    sharedResources: [{ ...emptyResource }],
  });
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      const emps = await getEmployees();
      setEmployees(emps || []);
    };
    fetchAllEmployees();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (event) => {
    const {
      target: { value },
    } = event;
    setProject((prev) => ({
      ...prev,
      employeeIds: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleArrayChange = (group, index, field, value) => {
    setProject((prev) => ({
      ...prev,
      [group]: prev[group].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addGroupItem = (group, template) => {
    setProject((prev) => ({
      ...prev,
      [group]: [...prev[group], { ...template }],
    }));
  };

  const removeGroupItem = (group, index) => {
    setProject((prev) => ({
      ...prev,
      [group]:
        prev[group].length === 1
          ? [{ ...(group === "externalCollaborators" ? emptyCollaborator : emptyResource) }]
          : prev[group].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const payload = {
      ...project,
      Title: project.Title.trim(),
      Client: project.Client.trim(),
      Address: project.Address.trim(),
      WoM: project.WoM.trim(),
      description: project.description.trim(),
      externalCollaborators: project.externalCollaborators.filter(
        (collaborator) => collaborator.name.trim()
      ),
      sharedResources: project.sharedResources.filter(
        (resource) => resource.title.trim() && resource.url.trim()
      ),
    };

    try {
      const response = await axios.put(`${BASE_URL}/Project/add`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        navigate("/admin-dashboard/ProjectList");
      }
    } catch (submitError) {
      setError(submitError.response?.data?.error || "Server Error");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldSx = {
    "& .MuiInputBase-root": {
      minHeight: "56px",
      fontSize: "0.95rem",
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
        Add Project
      </Typography>

      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          maxWidth: 1100,
          mx: "auto",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#fafafa",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Project Basics
              </Typography>
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                name="Title"
                label="Title of the Project"
                value={project.Title}
                onChange={handleChange}
                fullWidth
                required
                sx={fieldSx}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                name="Client"
                label="Client"
                value={project.Client}
                onChange={handleChange}
                fullWidth
                required
                sx={fieldSx}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                name="Address"
                label="Address of the Client"
                value={project.Address}
                onChange={handleChange}
                fullWidth
                required
                sx={fieldSx}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                name="WoM"
                label="Work Order Number"
                value={project.WoM}
                onChange={handleChange}
                fullWidth
                required
                sx={fieldSx}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                name="startDate"
                label="From Date"
                type="date"
                value={project.startDate}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                sx={fieldSx}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                name="endDate"
                label="To Date"
                type="date"
                value={project.endDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={fieldSx}
              />
            </Grid>

            <Grid xs={12}>
              <FormControl fullWidth sx={fieldSx}>
                <InputLabel>Assign Internal Employees (Optional)</InputLabel>
                <Select
                  multiple
                  name="employeeIds"
                  value={project.employeeIds}
                  onChange={handleMultiSelect}
                  input={<OutlinedInput label="Assign Internal Employees (Optional)" />}
                  renderValue={(selected) =>
                    employees
                      .filter((employee) => selected.includes(employee._id))
                      .map((employee) => `${employee.employeeId} - ${employee.userId?.name || ""}`)
                      .join(", ")
                  }
                  MenuProps={{ disableScrollLock: true }}
                >
                  {employees.map((employee) => (
                    <MenuItem key={employee._id} value={employee._id}>
                      <Checkbox checked={project.employeeIds.includes(employee._id)} />
                      <ListItemText
                        primary={`${employee.employeeId} - ${employee.userId?.name || "Employee"}`}
                        secondary={employee.department?.dep_name || ""}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                Internal team selection is optional. You can create a project with only external collaborators
                or shared file links.
              </Typography>
            </Grid>

            <Grid xs={12}>
              <TextField
                name="description"
                label="Description"
                value={project.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>

            <Grid xs={12}>
              <Divider />
            </Grid>

            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  External Collaborators
                </Typography>
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => addGroupItem("externalCollaborators", emptyCollaborator)}
                >
                  Add Collaborator
                </Button>
              </Stack>
            </Grid>

            {project.externalCollaborators.map((collaborator, index) => (
              <Grid xs={12} key={`collaborator-${index}`}>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Collaborator {index + 1}
                    </Typography>
                    <IconButton
                      color="error"
                      onClick={() => removeGroupItem("externalCollaborators", index)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                  <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                      <TextField
                        label="Name"
                        value={collaborator.name}
                        onChange={(event) =>
                          handleArrayChange(
                            "externalCollaborators",
                            index,
                            "name",
                            event.target.value
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        label="Organization"
                        value={collaborator.organization}
                        onChange={(event) =>
                          handleArrayChange(
                            "externalCollaborators",
                            index,
                            "organization",
                            event.target.value
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} md={4}>
                      <TextField
                        label="Role"
                        value={collaborator.role}
                        onChange={(event) =>
                          handleArrayChange(
                            "externalCollaborators",
                            index,
                            "role",
                            event.target.value
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} md={4}>
                      <TextField
                        label="Email"
                        type="email"
                        value={collaborator.email}
                        onChange={(event) =>
                          handleArrayChange(
                            "externalCollaborators",
                            index,
                            "email",
                            event.target.value
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} md={4}>
                      <TextField
                        label="Phone"
                        value={collaborator.phone}
                        onChange={(event) =>
                          handleArrayChange(
                            "externalCollaborators",
                            index,
                            "phone",
                            event.target.value
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}

            <Grid xs={12}>
              <Divider />
            </Grid>

            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Shared Files And Links
                </Typography>
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => addGroupItem("sharedResources", emptyResource)}
                >
                  Add Resource
                </Button>
              </Stack>
            </Grid>

            {project.sharedResources.map((resource, index) => (
              <Grid xs={12} key={`resource-${index}`}>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Resource {index + 1}
                    </Typography>
                    <IconButton color="error" onClick={() => removeGroupItem("sharedResources", index)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                  <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                      <TextField
                        label="Resource Title"
                        value={resource.title}
                        onChange={(event) =>
                          handleArrayChange("sharedResources", index, "title", event.target.value)
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={resource.resourceType}
                          label="Type"
                          onChange={(event) =>
                            handleArrayChange(
                              "sharedResources",
                              index,
                              "resourceType",
                              event.target.value
                            )
                          }
                        >
                          {resourceTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                              {type.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={4}>
                      <TextField
                        label="Share URL"
                        placeholder="https://drive.google.com/..."
                        value={resource.url}
                        onChange={(event) =>
                          handleArrayChange("sharedResources", index, "url", event.target.value)
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        label="Notes"
                        value={resource.notes}
                        onChange={(event) =>
                          handleArrayChange("sharedResources", index, "notes", event.target.value)
                        }
                        fullWidth
                        multiline
                        rows={2}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}

            {error && (
              <Grid xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}

            <Grid xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={submitting}
                sx={{
                  mt: 1,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #009688 0%, #388e3c 60%, #00695c 100%)",
                  },
                }}
              >
                {submitting ? "Saving..." : "Add Project"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Project;
