import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar(){
  const loc = useLocation();
  return (
    <aside className="sidebar">
      <div className="logo">Admin Dashboard</div>
      <nav>
        <Link to="/dashboard" className="nav-item" style={{background: loc.pathname === '/dashboard' || loc.pathname === '/' ? 'rgba(255,255,255,0.04)':''}}>
          <span>▦</span><span>Dashboard</span>
        </Link>
        <Link to="/add-user" className="nav-item" style={{background: loc.pathname === '/add-user' ? 'rgba(255,255,255,0.04)':''}}>
          <span>＋</span><span>Add User</span>
        </Link>
      </nav>
    </aside>
  );
}