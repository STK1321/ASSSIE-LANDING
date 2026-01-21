import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const payload = Object.fromEntries(data);

  return new Response(JSON.stringify({ ok: true, received: payload }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
