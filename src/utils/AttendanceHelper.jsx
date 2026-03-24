import {useState,React} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import  BASE_URL  from "../utils/apiConfig";
export const columns=[
{
name:"S no",
selector:(row)=>row.sno,
width:"100px"
},
{
name:"Name",
selector:(row)=>row.name,
width:"140px"
},
{
name:"Emp Id",
selector:(row)=>row.employeeId,
width:"160px"
},
{
name:"Department",
selector:(row)=>row.department,
width:"160px"
},
 {
    name:"Action",
    selector:(row) => row.action,
    center:true
   
  }


]
export const column = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "80px",
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "Total Records",
    selector: (row) => row.totalEmployees,
    sortable: true,
  },
  {
    name: "Present",
    selector: (row) => row.presentCount,
  },
  {
    name: "Absent",
    selector: (row) => row.absentCount,
  },
];


import { Button, Stack } from "@mui/material";

export const AttendanceButtons = ({ Id, attendanceStatus }) => {
  const [selected, setSelected] = useState(attendanceStatus);
  const [loading, setLoading] = useState(false);

  const handleButton = async (id, status) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/attendance/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert(`Attendance marked as ${status} for employee ${id}`);
        setSelected(status);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      {selected ? (
        <Button
          variant="contained"
          disabled
          sx={{
            backgroundColor:
              selected === "Present"
                ? "#009688"
                : selected === "Absent"
                ? "#d32f2f"
                : "#fbc02d",
            color: "white",
            textTransform: "capitalize",
            fontWeight: "bold",
            px: 3,
          }}
        >
          {selected}
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            color="success"
            size="small"
            disabled={loading}
            onClick={() => handleButton(Id, "Present")}
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
              px: 2,
            }}
          >
            Present
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            disabled={loading}
            onClick={() => handleButton(Id, "Absent")}
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
              px: 2,
            }}
          >
            Absent
          </Button>
          <Button
            variant="contained"
            size="small"
            disabled={loading}
            onClick={() => handleButton(Id, "Sick")}
            sx={{
              backgroundColor: "#fbc02d",
              color: "white",
              textTransform: "capitalize",
              fontWeight: "bold",
              px: 3,
              "&:hover": { backgroundColor: "#f9a825" },
            }}
          >
            Sick
          </Button>
        </>
      )}
    </Stack>
  );
};
