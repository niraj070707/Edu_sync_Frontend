import { Routes, Route, useInRouterContext } from "react-router-dom";
import './App.css'
import { useCon } from "./UserContext"
import axios from "axios";
import { Navigate } from "react-router-dom";

import Login from "./Components/Login/Login";

// Admin
import AdminLogin from "./Components/Login/AdminLogin/AdminLogin";
import Dashboard from "./Components/Admin/Dashboard";

// Faculty
import FacultyLogin from "./Components/Login/FacultyLogin/FacultyLogin";

// Student
import StudentLogin from "./Components/Login/StudentLogin/StudentLogin";


function App() {
  axios.defaults.baseURL = "http://localhost:8080";
  axios.defaults.withCredentials = true;
  
  const { User } = useCon();
  
  console.log("App_User", User);
  return (
      <>    
          <Routes>
              {/* Home */}
              <Route exact path="/" element={<Login />} />

              {/* Admin */}
              <Route exact path="/login/adminlogin" element={User && User.username=="admin" ?  <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
              <Route exact path="/admin/dashboard" element={User && User.username=="admin"? <Dashboard/> : <Navigate to="/login/adminlogin" /> } />

              {/* Faculty */}
              <Route path="/login/facultylogin" element={<FacultyLogin />} />


              {/* Student */}
              <Route path="/login/studentlogin" element={<StudentLogin />} />

          </Routes>
      </>
  )
  
}

export default App
