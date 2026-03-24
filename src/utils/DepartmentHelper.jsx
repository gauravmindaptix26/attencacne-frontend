import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import axios from "axios";
import  BASE_URL  from "../utils/apiConfig";
export const columns =[

  {
    name:"S no",
    selector:(row) =>row.sno
  },
  {
    name:"Department Name",
    selector:(row) =>row.dep_name,
    sortable:true
  },
  {
    name:"Action",
    selector:(row) => row.action
  },
]

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this department?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${BASE_URL}/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        onDepartmentDelete();
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred while deleting the department.");
      }
    }
  };

  return (
    <Stack direction="row" spacing={1.5} justifyContent="center">
      {/* Edit Button - Branded gradient */}
      <Button
        variant="contained"
        size="small"
        sx={{
          background: "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #00a896 0%, #2e7d32 50%, #00695c 100%)",
          },
          textTransform: "none",
          fontWeight: 500,
          color: "white",
          borderRadius: 2,
          boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
        }}
        onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
      >
        Edit
      </Button>

      {/* Delete Button - Deeper tone of same green theme */}
      <Button
        variant="contained"
        size="small"
        sx={{
          background: "linear-gradient(135deg, #00796b 0%, #2e7d32 50%, #004d40 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #00695c 0%, #1b5e20 50%, #00332c 100%)",
          },
          textTransform: "none",
          fontWeight: 500,
          color: "white",
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
        }}
        onClick={() => handleDelete(Id)}
      >
        Delete
      </Button>
    </Stack>
  );
};