export async function onRequestGet({ env, params }) {
  const key = params.path || "default_key";
  const value = await env.KV.get(key);
  return new Response(JSON.stringify({ key, value }), {
    headers: { "Content-Type": "application/json" },
  });
}