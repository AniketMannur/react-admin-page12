import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import Login from "./pages/Login";
import "./App.css";

function RequireAuth({ children }) {
  const auth = localStorage.getItem("admin-auth");
  return auth ? children : <Navigate to="/login" replace />;
}

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<RequireAuth><Dashboard/></RequireAuth>} />
      <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} />
      <Route path="/add-user" element={<RequireAuth><AddUser/></RequireAuth>} />
      <Route path="*" element={<Navigate to='/' replace />} />
    </Routes>
  );
}