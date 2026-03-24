import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import  BASE_URL  from "../utils/apiConfig";
export const columns = [
  {
    name: "S no",
    selector: (row) => row.sno,
    width: "100px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "130px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    width: "90px"
  },
  {
    name: "Projects",                   
    selector: (row) => row.projects || "No Projects",
    sortable: false,
    width: "200px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    style: { textAlign: 'center' },
  },
];

export const fetchDepartments=async()=>{
      let departments;
     
      try{
        const response=await axios.get(`${BASE_URL}/department`,{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })

        if(response.data.success){
departments=response.data.departments
        }
      }catch(error){
        if(error.response && !error.response.data.success){
        alert(error.response.data.error);
      }

      }
     return departments
    };
    
export const getEmployees = async (id) =>{
      let employees;
     
      try{
        const response=await axios.get(`${BASE_URL}/employee/department/${id}`,{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })

        if(response.data.success){
employees=response.data.employees
        }
      }catch(error){
        if(error.response && !error.response.data.success){
        alert(error.response.data.error);
      }

      }
     return employees
    };


import { Button, Stack } from "@mui/material";


export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={1.5} justifyContent="center">
      {/* View - Light version of your gradient */}
      <Button
        variant="contained"
        size="small"
        sx={{
          background: "linear-gradient(135deg, #5df2d6 0%, #66bb6a 50%, #26a69a 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4dd0e1 0%, #43a047 50%, #009688 100%)",
          },
          textTransform: "none",
          fontWeight: 500,
          color: "white",
          borderRadius: 2,
          boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
        }}
        onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}
      >
        View
      </Button>

      {/* Edit - Your main gradient */}
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
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </Button>

      {/* Salary - Slightly darker tone */}
      <Button
        variant="contained"
        size="small"
        sx={{
          background: "linear-gradient(135deg, #009688 0%, #388e3c 50%, #00695c 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #00796b 0%, #2e7d32 50%, #004d40 100%)",
          },
          textTransform: "none",
          fontWeight: 500,
          color: "white",
          borderRadius: 2,
          boxShadow: "0 3px 6px rgba(0,0,0,0.25)",
        }}
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        Salary
      </Button>

      {/* Leave - Deepest tone */}
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
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </Button>
    </Stack>
  );
};
