import React from "react";
export default function Card({title, value}){
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="big">{value}</div>
    </div>
  );
}