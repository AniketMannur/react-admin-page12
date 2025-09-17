import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  function submit(e){
    e.preventDefault();
    if(user === "admin" && pass === "admin123"){
      localStorage.setItem("admin-auth","1");
      nav("/dashboard");
    } else {
      setErr("Invalid credentials. Use admin / admin123");
    }
  }

  return (
    <div style={{display:'flex',minHeight:'100vh',alignItems:'center',justifyContent:'center',background:'#f3f5f7',padding:20}}>
      <form onSubmit={submit} style={{width:420,background:'#fff',padding:28,borderRadius:12,boxShadow:'0 10px 30px rgba(12,19,28,0.08)'}}>
        <h2 style={{marginTop:0}}>Admin Login</h2>
        <div style={{marginBottom:12}}>
          <label>Username</label>
          <input className="input" value={user} onChange={e=>setUser(e.target.value)} placeholder="admin" />
        </div>
        <div style={{marginBottom:12}}>
          <label>Password</label>
          <input type="password" className="input" value={pass} onChange={e=>setPass(e.target.value)} placeholder="admin123" />
        </div>
        {err && <div style={{color:'red',marginBottom:12}}>{err}</div>}
        <button className="btn" style={{background:'#24303b',color:'#fff',padding:'10px 16px',borderRadius:8}}>Login</button>
      </form>
    </div>
  );
}