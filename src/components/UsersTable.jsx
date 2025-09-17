import React from "react";

export default function UsersTable({users, onEdit, onDelete}){
  return (
    <div className="table-card">
      <h2>Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th style={{width:40}}>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Tasks</th>
            <th>Time</th>
            <th style={{width:180}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr><td colSpan={6} style={{padding:20}}>No users yet.</td></tr>
          )}
          {users.map((u,i)=>(
            <tr key={u.id}>
              <td>{i+1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{ Array.isArray(u.tasks) ? u.tasks.join(", ") : (u.tasks || "-") }</td>
              <td>{u.time}</td>
              <td>
                <button className="btn btn-edit" onClick={()=>onEdit(u.id)}>Edit</button>
                <button className="btn btn-delete" onClick={()=>onDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
