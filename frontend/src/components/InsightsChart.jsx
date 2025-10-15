import React, { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function InsightsChart({ items }) {
  const distribution = useMemo(() => {
    const buckets = [
      { label: "0-19", min: 0, max: 19 },
      { label: "20-39", min: 20, max: 39 },
      { label: "40-59", min: 40, max: 59 },
      { label: "60-79", min: 60, max: 79 },
      { label: "80-100", min: 80, max: 100 }
    ];
    const counts = Object.fromEntries(buckets.map((b) => [b.label, 0]));
    for (const it of items) {
      const s = Number(it.score || 0);
      const bucket = buckets.find((b) => s >= b.min && s <= b.max);
      if (bucket) counts[bucket.label] += 1;
    }
    return buckets.map((b) => ({ range: b.label, count: counts[b.label] }));
  }, [items]);

  return (
    <div style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={distribution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Leads" fill="#4f46e5" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


