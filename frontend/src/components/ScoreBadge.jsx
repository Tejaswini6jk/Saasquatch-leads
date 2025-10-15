import React from "react";

export default function ScoreBadge({ score }) {
  const s = Number(score || 0);
  const color = s >= 80 ? "bg-green-100 text-green-800" : s >= 50 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800";
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>{s}</span>
  );
}


