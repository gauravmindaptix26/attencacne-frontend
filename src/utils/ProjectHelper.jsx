import axios from "axios";
import  BASE_URL  from "../utils/apiConfig";
export const getEmployees = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/Project`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      return response.data.employees;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};
// Fetch all projects for employee selection
export const getEmployeesProjects = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/project/projectList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      // Return just the projects array
      return response.data.projects || [];
    } else {
      console.error("Failed to fetch projects:", response.data.error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
