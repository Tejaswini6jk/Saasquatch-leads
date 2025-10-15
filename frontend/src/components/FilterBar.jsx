import React from "react";

export default function FilterBar({ value, onChange, onExport }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col md:flex-row gap-3 md:items-end justify-between">
      <div className="flex gap-3 flex-1">
        <div>
          <label className="text-xs text-gray-600">Industry</label>
          <input className="block border rounded px-3 py-2 w-40" placeholder="e.g. SaaS" value={value.industry} onChange={(e) => set("industry", e.target.value)} />
        </div>
        <div>
          <label className="text-xs text-gray-600">Region</label>
          <input className="block border rounded px-3 py-2 w-32" placeholder="e.g. US" value={value.region} onChange={(e) => set("region", e.target.value)} />
        </div>
        <div>
          <label className="text-xs text-gray-600">Min Score</label>
          <input type="number" min={0} max={100} className="block border rounded px-3 py-2 w-28" value={value.minScore} onChange={(e) => set("minScore", e.target.value)} />
        </div>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-2 rounded bg-gray-100" onClick={() => onChange({ industry: "", region: "", minScore: 0 })}>Reset</button>
        <button className="px-3 py-2 rounded bg-indigo-600 text-white" onClick={onExport}>Export Top Leads</button>
      </div>
    </div>
  );
}


