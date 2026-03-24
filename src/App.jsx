import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Login from "./pages/Login";
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoute from './utils/PrivateRoute';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/department/dashboard/AdminSummary';
import DepartmentList from './components/department/department/DepartmentList';
import AddDepartment from './components/department/department/AddDepartment';
import EditDepartment from './components/department/department/EditDepartment';
import List from './components/department/employee/List';
import Add from './components/department/employee/Add';
import View from './components/department/employee/View';
import Edit from './components/department/employee/Edit';
import AddSalary from './components/salary/Add';
import ViewSalary from './components/salary/View'
import Summary from './components/department/EmployeeDashboard/Summary';
import LeaveList from './components/department/leave/List';
import AddLeave from './components/department/leave/Add';
import Setting from './components/department/EmployeeDashboard/Setting';
import Table from './components/department/leave/Table';
import Details from './components/department/leave/Details';
import Marking from './components/department/Attendace/Marking';
import AttendanceList from './components/department/Attendace/AttendanceList';
import Project from './components/ProjectList/Project';
import ProjectList from './components/ProjectList/ProjectList';
import TeamDetail from './components/ProjectList/TeamDetail';
function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
    <Route path="/login" element={<Login />}></Route>
     <Route path="/admin-dashboard" element={
      <PrivateRoute>
        <RoleBaseRoutes requiredRole={["admin"]}>
      <AdminDashboard />
      </RoleBaseRoutes>
      </PrivateRoute>
      }>
        <Route index element={<AdminSummary/>}></Route>
        <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
        <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
        <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>}></Route>
        <Route path="/admin-dashboard/employees" element={<List/>}></Route>
        <Route path="/admin-dashboard/add-employee" element={<Add/>}></Route>
<Route path="/admin-dashboard/employee/:id" element={<View/>}></Route>
<Route path="/admin-dashboard/employees/edit/:id" element={<Edit/>}></Route>
<Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary/>}></Route>
<Route path="/admin-dashboard/salary/add" element={<AddSalary/>}></Route>
<Route path="/admin-dashboard/leaves" element={<Table/>}></Route>
<Route path="/admin-dashboard/leaves/:id" element={<Details/>}></Route>
<Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList/>}></Route>
<Route path="/admin-dashboard/Attendance/Marking" element={<Marking/>}></Route>
<Route path="/admin-dashboard/Attendance/AttendanceList" element={<AttendanceList/>}></Route>
<Route path="/admin-dashboard/setting" element={<Setting/>}></Route>
<Route path="/admin-dashboard/Project" element={<Project/>}></Route>
<Route path="/admin-dashboard/ProjectList" element={<ProjectList/>}></Route>
<Route path="/admin-dashboard/ProjectList/teamDetail" element={<TeamDetail/>}></Route>

      </Route>
      
     <Route path="/employee-dashboard" element={
      <PrivateRoute>
        <RoleBaseRoutes requiredRole={["admin","employee"]}>
      <EmployeeDashboard />
      </RoleBaseRoutes>
      </PrivateRoute>
      }>
        <Route index element={<Summary/>}></Route>
        <Route path="/employee-dashboard/profile/:id" element={<View/>}></Route>
        <Route path="/employee-dashboard/leaves/:id" element={<LeaveList/>}></Route>
        <Route path="/employee-dashboard/add-leave" element={<AddLeave/>}></Route>
        <Route path="/employee-dashboard/salary/:id" element={<ViewSalary/>}></Route>
         <Route path="/employee-dashboard/setting" element={<Setting/>}></Route>
         
      </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App;
