import React from "react";
import { useLocation } from "react-router-dom";

const TeamDetail = () => {
  const location = useLocation();
  const { employees } = location.state || []; 

  if (!employees || employees.length === 0) {
    return <div>No employee data available</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      {employees.map((employee) => (
        <div key={employee._id} className="mb-6 p-4 border rounded">
          <p><strong>Employee ID:</strong> {employee.employeeId}</p>
          <p><strong>User ID:</strong> {employee.userId}</p>
          <p><strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString()}</p>
          <p><strong>Gender:</strong> {employee.gender}</p>
          <p><strong>Marital Status:</strong> {employee.maritalStatus}</p>
          <p><strong>Designation:</strong> {employee.designation}</p>
          <p><strong>Department:</strong> {employee.department?.dep_name || employee.department}</p>
          <p><strong>Salary:</strong> ${employee.salary}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamDetail;
