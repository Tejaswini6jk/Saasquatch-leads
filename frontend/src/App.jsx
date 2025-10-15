import React from "react";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">SaaSquatch Leads</h1>
        <p className="text-sm text-gray-600">AI-Powered Lead Scoring & Insights</p>
      </header>
      <Dashboard />
    </div>
  );
}


