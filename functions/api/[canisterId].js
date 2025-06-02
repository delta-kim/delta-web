export async function onRequestGet({ env, params }) {
  const canisterId = params.canisterId || "default_key";
  const value = await env.KV.get(canisterId);
  return new Response(JSON.stringify({ canisterId, value }), {
    headers: { "Content-Type": "application/json" },
  });
}