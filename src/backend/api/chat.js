export async function sendEmergencyChat({ online, payload, fallbackReply, toast }) {
  if (!online) {
    return { reply: fallbackReply() };
  }

  const llmErrors = [];
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 65000);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return { reply: (data?.message?.content || "").trim() || fallbackReply() };
    }

    const details = await res.text();
    llmErrors.push("/api/chat -> " + res.status + " " + (details || "Request failed"));
  } catch (error) {
    llmErrors.push("/api/chat -> " + ((error?.name === "AbortError") ? "Timed out waiting for Ollama" : "Network error"));
  }

  if (toast) toast("Ollama unavailable, switched to offline emergency guidance.", "warning");
  throw new Error(llmErrors.join(" | ") || "No LLM route available");
}
