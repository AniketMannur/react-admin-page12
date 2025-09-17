import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loadUsers, saveUsers } from "../utils/storage";
import "./AddUser.css";

export default function AddUser() {
  const [users, setUsers] = useState(loadUsers());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tasks, setTasks] = useState([]); // array of strings
  const [time, setTime] = useState("");
  const [params] = useSearchParams();
  const nav = useNavigate();
  const id = params.get("id");

  // Predefined tasks
  const taskOptions = [
    "Website Creation",
    "Database Operations",
    "API Development",
    "UI/UX Design",
    "Bug Fixing",
    "Testing",
    "Project Documentation"
  ];

  const normalizeTasks = (t) => {
    if (!t) return [];
    if (Array.isArray(t)) return t;
    if (typeof t === "string") return t.split(",").map(s => s.trim()).filter(Boolean);
    return [];
  };

  useEffect(() => {
    // refresh users from storage (in case other pages changed it)
    setUsers(loadUsers());
  }, []);

  useEffect(() => {
    if (id) {
      const u = users.find(x => String(x.id) === String(id));
      if (u) {
        setName(u.name || "");
        setEmail(u.email || "");
        setTime(u.time || "");
        setTasks(normalizeTasks(u.tasks));
      }
    }
  }, [id, users]);

  function toggleTask(option) {
    setTasks(prev => (prev.includes(option) ? prev.filter(t => t !== option) : [...prev, option]));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Name and email are required");
      return;
    }

    let updated;
    if (id) {
      updated = users.map(u => u.id === Number(id) ? { ...u, name, email, tasks, time } : u);
    } else {
      const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
      updated = [...users, { id: nextId, name, email, tasks, time }];
    }

    saveUsers(updated);
    setUsers(updated);
    nav("/dashboard");
  }

  return (
    <div className="add-user-page">
      <div className="add-form">
        <h2>{id ? "Edit User" : "Add User"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          </div>

          <label style={{fontWeight:600, marginTop:8}}>Assign Tasks</label>
          <div className="checkbox-list">
            {taskOptions.map((opt) => (
              <label key={opt} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={tasks.includes(opt)}
                  onChange={() => toggleTask(opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>

          <div className="form-row">
            <input className="input" value={time} onChange={e => setTime(e.target.value)} placeholder="Time (e.g. 10:00 AM)" />
          </div>

          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-save" type="submit">{id ? "Update" : "Add"} User</button>
            <button type="button" className="btn" onClick={() => nav("/dashboard")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
