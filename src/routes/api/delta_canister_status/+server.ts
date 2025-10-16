import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, fetch }) => {
  const canisterId = url.searchParams.get("id");
  if (!canisterId) {
    return new Response("Missing id", { status: 400 });
  }
  try {
    const upstream = await fetch(
      `https://delta.kim/api/canister_status?id=${encodeURIComponent(
        canisterId
      )}`
    );
    if (!upstream.ok) {
      return new Response(`Upstream error ${upstream.status}`, { status: 502 });
    }
    const data = await upstream.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
