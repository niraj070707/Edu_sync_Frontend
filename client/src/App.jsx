import { Routes, Route } from "react-router-dom";
import './App.css'
import AdminLogin from "./Components/Login/AdminLogin";

function App() {
  const user = {
    user_type: "Admin"
  }
  return (
      <>    
          <Routes>
              <Route exact path="/login/Adminlogin" element={user.user_type==="Admin" ? <AdminLogin /> : <InvalidPage/>} />
          </Routes>
      </>
  )
  
}

export default App
