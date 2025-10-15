import React, { useEffect, useMemo, useState } from "react";
import { fetchLeads } from "../services/api";
import FilterBar from "../components/FilterBar.jsx";
import LeadTable from "../components/LeadTable.jsx";
import InsightsChart from "../components/InsightsChart.jsx";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ industry: "", region: "", minScore: 0 });

  useEffect(() => {
    setLoading(true);
    fetchLeads().then((data) => setLeads(data || [])).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const byIndustry = filters.industry ? String(l.industry).toLowerCase() === filters.industry.toLowerCase() : true;
      const byRegion = filters.region ? String(l.region).toLowerCase() === filters.region.toLowerCase() : true;
      const byScore = Number(l.score || 0) >= Number(filters.minScore || 0);
      return byIndustry && byRegion && byScore;
    });
  }, [leads, filters]);

  const onExport = () => {
    const headers = Object.keys(filtered[0] || {});
    const rows = filtered.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "top_leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <FilterBar value={filters} onChange={setFilters} onExport={onExport} />
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-lg">Leads</h2>
            {loading && <span className="text-xs text-gray-500">Loading…</span>}
          </div>
          <LeadTable items={filtered} />
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Insights</h2>
          <InsightsChart items={filtered} />
        </div>
      </div>
    </div>
  );
}


