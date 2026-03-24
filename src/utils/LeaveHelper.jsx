import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

export const columns =[

  {
    name:"S no",
    selector:(row) =>row.sno,
    width:"100px"
  },
   {
    name:"Emp ID",
    selector:(row) =>row.employeeId,
    sortable:true,
    width:"130px"
  },
  {
    name:"Name",
    selector:(row) =>row.name,
    width:"90px"
  },
  {
    name:"Leave Type",
    selector:(row) => row.leaveType,
   width:"120px"
  },
   {
    name:"Department",
    selector:(row) => row.department,
    width:"90px"
  },
  {
    name:"Days",
    selector:(row) => row.days,
    center:true
   
  },
  {
    name:"Status",
    selector:(row) => row.status,
    width:"90px"
  },
  {
    name:"Action",
    selector:(row) => row.action,
    center:true
   
  },
]


    

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <Stack direction="row" justifyContent="center">
      <Button
        variant="contained"
        size="small"
        sx={{
          background: "linear-gradient(135deg, #00bfa5 0%, #43a047 50%, #00796b 100%)",
          textTransform: "none",
          fontWeight: 500,
          px: 3,
          py: 0.8,
        }}
        onClick={() => handleView(Id)}
      >
        View
      </Button>
    </Stack>
  );
};