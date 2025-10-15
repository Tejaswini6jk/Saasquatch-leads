import React, { useMemo, useState } from "react";
import ScoreBadge from "./ScoreBadge.jsx";

export default function LeadTable({ items }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("score");
  const [sortDir, setSortDir] = useState("desc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? items.filter((x) => [x.company_name, x.industry, x.region].some((v) => String(v || "").toLowerCase().includes(q)))
      : items;
    const sorted = [...list].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av === bv) return 0;
      if (sortDir === "asc") return av > bv ? 1 : -1;
      return av < bv ? 1 : -1;
    });
    return sorted;
  }, [items, query, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <input className="border rounded px-3 py-2 w-full" placeholder="Search company, industry, region" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-2 pr-4 cursor-pointer" onClick={() => toggleSort("company_name")}>Company</th>
              <th className="py-2 pr-4 cursor-pointer" onClick={() => toggleSort("industry")}>Industry</th>
              <th className="py-2 pr-4 cursor-pointer" onClick={() => toggleSort("region")}>Region</th>
              <th className="py-2 pr-4 cursor-pointer" onClick={() => toggleSort("revenue_estimate")}>Revenue</th>
              <th className="py-2 cursor-pointer" onClick={() => toggleSort("score")}>Score</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2 pr-4 whitespace-nowrap">{l.company_name}</td>
                <td className="py-2 pr-4">{l.industry}</td>
                <td className="py-2 pr-4">{l.region}</td>
                <td className="py-2 pr-4">{Number(l.revenue_estimate).toLocaleString()}</td>
                <td className="py-2"><ScoreBadge score={l.score} /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">No leads</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


