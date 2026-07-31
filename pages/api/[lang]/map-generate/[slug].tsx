import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import { IInteractiveMap } from "../../../../interfaces";

export const config = {
  runtime: "experimental-edge"
};

export default async function createMapFromMap(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const slug = searchParams.get("slug");
  const lang = searchParams.get("lang");

  const response = await fetch(
    `https://api.allrealm.io/interactive-maps/${slug}`,
    {
      headers: {
        ["Accept-Language"]: lang,
        "private-token": process.env.ALLREALM_PRIVATE_TOKEN!
      }
    }
  );

  const map = (await response.json()) as IInteractiveMap;

  const {
    width,
    height,
    enabled,
    x,
    y,
    map: createFromMap,
    brushSize,
    blurStrength,
    brushOpacity,
    shadowBrushes
  } = map.createFrom;

  if (!enabled || !createFromMap) return;

  const url = createFromMap.src.uploadUrl;
  const size = createFromMap.src.size;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative"
        }}
      >
        <img
          style={{
            objectFit: "fill",
            width: `${size.width}px`,
            height: `${size.height}px`,
            minWidth: `${size.width}px`,
            minHeight: `${size.height}px`,
            maxWidth: `${size.width}px`,
            maxHeight: `${size.height}px`,
            position: "absolute",
            top: `-${y}px`,
            left: `-${x}px`
          }}
          src={url}
        />
        {/* <div
          style={{
            display: "flex",
            width: `${size.width}px`,
            height: `${size.height}px`,
            minWidth: `${size.width}px`,
            minHeight: `${size.height}px`,
            maxWidth: `${size.width}px`,
            maxHeight: `${size.height}px`,
            position: "absolute",
            top: `-${y}px`,
            left: `-${x}px`,
            opacity: 0.3
          }}
        >
          {shadowBrushes.map((brush) => {
            return (
              <div
                style={{
                  width: `${brushSize}px`,
                  height: `${brushSize}px`,
                  maxWidth: `${brushSize}px`,
                  maxHeight: `${brushSize}px`,
                  minWidth: `${brushSize}px`,
                  minHeight: `${brushSize}px`,
                  borderRadius: "13241242134123421px",
                  backgroundColor: "black",
                  position: "absolute",
                  transform: `translate(-50%, -50%)`,
                  top: `${brush.y}px`,
                  left: `${brush.x}px`,
                  filter: `blur(${blurStrength}px)`
                }}
              />
            );
          })}
        </div> */}
      </div>
    ),
    {
      width: width,
      height: height
    }
  );
}
