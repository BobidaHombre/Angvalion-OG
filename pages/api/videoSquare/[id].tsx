import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge"
};

export default async function createVideoSquare(req: NextRequest) {
  const { searchParams, pathname } = req.nextUrl;

  const youtubeApiKey = process.env.PUBLIC_YOUTUBE_API_KEY;

  const idFromQuery = searchParams.get("id");
  const idFromPath = pathname.split("/").pop() || undefined;
  const id = idFromQuery || idFromPath;

  if (!id) {
    return new Response("Missing YouTube video id", { status: 400 });
  }

  const imageUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  // Parse ISO8601 duration (PT#H#M#S) to seconds
  const parseIsoDurationToSeconds = (isoDuration: string): number => {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const seconds = match[3] ? parseInt(match[3], 10) : 0;
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Determine if it's a Short (<= 60s). Default to false to avoid undefined.
  let isShort: boolean = false;
  if (youtubeApiKey) {
    try {
      const ytUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${encodeURIComponent(
        id
      )}&key=${encodeURIComponent(youtubeApiKey)}`;
      const ytRes = await fetch(ytUrl);
      if (ytRes.ok) {
        const ytJson = (await ytRes.json()) as {
          items?: Array<{ contentDetails?: { duration?: string } }>;
        };

        const durationIso = ytJson.items?.[0]?.contentDetails?.duration;
        if (durationIso) {
          const durationSeconds = parseIsoDurationToSeconds(durationIso);
          isShort = durationSeconds <= 120;
        }
      } else {
        console.warn("YouTube API response not OK", ytRes.status);
      }
    } catch (error) {
      console.error("YouTube API fetch failed", error);
    }
  } else {
    console.warn("PUBLIC_YOUTUBE_API_KEY is not defined");
  }

  if (isShort) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            position: "relative",
            background: "red",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img
            src={imageUrl}
            width="100px"
            height="100px"
            style={{
              width: "100px",
              height: "100px",
              maxHeight: "100px",
              objectFit: "cover"
            }}
          />
        </div>
      ),
      {
        width: 100,
        height: 100
      }
    );
  }

  const bgMultiplier = 1.35;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          background: "black",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: `${(380 - 380 * bgMultiplier) / 2}px`,
            left: `${(380 - 380 * bgMultiplier) / 2}px`,
            opacity: 0.1
          }}
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <img
              key={index}
              src={imageUrl}
              width={`${380 * bgMultiplier}px`}
              height={`${380 * bgMultiplier}px`}
              style={{
                width: `${380 * bgMultiplier}px`,
                height: `${380 * bgMultiplier}px`,
                maxHeight: `${380 * bgMultiplier}px`,
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                filter: "blur(4px)"
              }}
            />
          ))}
        </div>
        <img
          src={imageUrl}
          width="100px"
          height="56px"
          style={{
            width: "380px",
            height: "213px",
            maxHeight: "213px",
            objectFit: "cover"
          }}
        />
      </div>
    ),
    {
      width: 380,
      height: 380
    }
  );
}
