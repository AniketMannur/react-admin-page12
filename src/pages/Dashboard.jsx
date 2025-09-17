import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import UsersTable from "../components/UsersTable";
import { useNavigate } from "react-router-dom";

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem("admin-users")) || [];
  } catch (e) {
    return [];
  }
}

export default function Dashboard() {
  const [users, setUsers] = useState(loadUsers());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const nav = useNavigate();

  // Keep users in localStorage in sync
  useEffect(() => {
    localStorage.setItem("admin-users", JSON.stringify(users));
  }, [users]);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Edit/Delete handlers
  function handleEdit(id) {
    nav(`/add-user?id=${id}`);
  }
  function handleDelete(id) {
    if (!confirm("Delete this user?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  // Real-time stats
  const totalUsers = users.length;
  // Instead of splitting a string
const totalTasks = users.reduce((acc, u) => acc + (u.tasks ? u.tasks.length : 0), 0);


  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="cards">
          <Card title="Total Users" value={totalUsers} />
          <Card title="Total Tasks" value={totalTasks} />
          <Card title="Current Time" value={time} />
        </div>

        <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
