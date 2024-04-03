import { Routes, Route, useInRouterContext } from "react-router-dom";
import './App.css'
import { useCon } from "./UserContext"
import axios from "axios";
import { Navigate } from "react-router-dom";

import Login from "./Components/Login/Login";

// Admin
import AdminLogin from "./Components/Login/AdminLogin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AddFaculty from "./Components/Admin/AddFaculty";
import RemoveFaculty from "./Components/Admin/RemoveFaculty";
import AdminProfile from "./Components/Admin/AdminProfile";
import FacultyList from "./Components/Admin/FacultyList";
import StudentList from "./Components/Admin/StudentList";


// Faculty
import FacultyLogin from "./Components/Login/FacultyLogin/FacultyLogin";
import FacultyDashboard from "./Components/Faculty/FacultyDashboard";

// Student
import StudentLogin from "./Components/Login/StudentLogin/StudentLogin";
import StudentDashboard from "./Components/Student/StudentDashboard";





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
                <Route exact path="/login/adminlogin" element={User && User.user_type == "admin" ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
                <Route exact path="/admin/dashboard" element={User && User.user_type == "admin" ? <AdminDashboard /> : <Navigate to="/login/adminlogin" />} />
                <Route exact path="/admin/addfaculty" element={User && User.user_type == "admin" ? <AddFaculty /> : <Navigate to="/login/adminlogin" />} />
                <Route exact path="/admin/removefaculty" element={User && User.user_type == "admin" ? <RemoveFaculty /> : <Navigate to="/login/adminlogin" />} />
                <Route exact path="/admin/adminprofile" element={User && User.user_type == "admin" ? <AdminProfile /> : <Navigate to="/login/adminlogin" />} />
                <Route exact path="/admin/facultylist" element={User && User.user_type == "admin" ? <FacultyList /> : <Navigate to="/login/adminlogin" />} />
                <Route exact path="/admin/studentlist" element={User && User.user_type == "admin" ? <StudentList /> : <Navigate to="/login/adminlogin" />} />


                {/* Faculty */}
                <Route path="/login/facultylogin" element={User && User.user_type == "teacher" ? <Navigate to="/faculty/dashboard" /> : <FacultyLogin />} />
                <Route exact path="/faculty/dashboard" element={User && User.user_type == "teacher" ? <FacultyDashboard /> : <Navigate to="/login/facultylogin" />} />

                {/* Student */}
                <Route path="/login/studentlogin" element={User && User.user_type == "student" ? <Navigate to="/student/dashboard" /> : <StudentLogin />} />
                <Route exact path="/student/dashboard" element={User && User.user_type == "student" ? <StudentDashboard /> : <Navigate to="/login/studentlogin" />} />

            </Routes>
        </>
    )

}

export default App
