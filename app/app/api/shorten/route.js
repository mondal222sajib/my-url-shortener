
import { Redis } from "@upstash/redis";
import { randomBytes } from "crypto";

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return Response.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return Response.json(
        { error: "Invalid URL" },
        { status: 400 }
      );
    }

    const redis = Redis.fromEnv();
    const code = randomBytes(4).toString("hex");

    await redis.set(`link:${code}`, parsedUrl.toString());

    const shortUrl = `${new URL(request.url).origin}/${code}`;

    return Response.json({ shortUrl });

  } catch (error) {
    console.error("Shorten API Error:", error);

    return Response.json(
      { error: "Failed to shorten URL" },
      { status: 500 }
    );
  }
}
