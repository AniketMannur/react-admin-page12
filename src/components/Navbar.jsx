import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar(){
  const nav = useNavigate();
  function logout(){
    localStorage.removeItem("admin-auth");
    nav("/login");
  }
  return (
    <div className="topbar">
      <div></div>
      <div className="top-actions">
        <div style={{display:'flex',alignItems:'center',gap:10,color:'#fff'}}>
          <div style={{width:36,height:36,borderRadius:18,background:'#fff3',display:'flex',alignItems:'center',justifyContent:'center'}}>👤</div>
        </div>
        <button className="logout" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}