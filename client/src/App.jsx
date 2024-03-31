import About from "./pages/About";
import Dashboard from "./pages/Admin/Dashboard";
import Admins from "./pages/Admin/Admins";
import Announcements from "./pages/Admin/Announcements";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import { AuthProvider } from "./hooks/AuthProvider";
function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   } else {
  //     navigate("/auth/login");
  //   }
  // }, []);
  return (
    <>
      {/* <AuthProvider> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/announcements" element={<Announcements />} />
        <Route path="/admin/admins" element={<Admins />} />
        {/* </AuthProvider> */}
      </Routes>
    </>
  );
}

export default App;
