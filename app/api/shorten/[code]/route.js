
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  try {
    const { code } = await params;
    const redis = Redis.fromEnv();

    const url = await redis.get(`link:${code}`);

    if (!url) {
      return new Response("Short link not found", {
        status: 404
      });
    }

    return Response.redirect(url, 302);

  } catch (error) {
    console.error("Redirect Error:", error);

    return new Response("Server error", {
      status: 500
    });
  }
}
