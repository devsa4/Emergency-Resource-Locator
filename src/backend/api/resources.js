export async function fetchNearbyResources({ lat, lng, radius = 30000 }) {
  const res = await fetch("/api/resources", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lng, radius }),
  });

  if (!res.ok) throw new Error("Live resource fetch failed");
  return res.json();
}
