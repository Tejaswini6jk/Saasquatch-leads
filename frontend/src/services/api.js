const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function fetchLeads(params = {}) {
  const url = new URL(`${API_BASE}/api/leads`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch leads");
  return res.json();
}

export async function scoreLead(lead) {
  const res = await fetch(`${API_BASE}/api/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead)
  });
  if (!res.ok) throw new Error("Failed to score lead");
  return res.json();
}


