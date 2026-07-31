import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge"
};

export default async function lorebookOgHandler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const name = searchParams.get("title");
  const banner = searchParams.get("banner");
  const header = searchParams.get("header");

  const font = fetch(
    new URL("../../../../assets/Poppins-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "20px 40px",
          backgroundImage: `url(https://og.angvalion.com/img/blank.png)`
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translate(0,-42%)",
            display: "flex",
            width: 430,
            height: 490,
            right: "100px"
          }}
        >
          <img
            style={{
              objectFit: "cover",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 80% at 48% 78%, black 40%, transparent 50%)",
              maskImage:
                "radial-gradient(ellipse 90% 80% at 48% 78%, black 40%, transparent 50%)"
            }}
            src={`https://angvalion.com/img/docs/banners/${banner}.png`}
          />
        </div>
        <div
          style={{
            width: "70%",
            textAlign: "left",
            color: "white",
            display: "flex",
            textTransform: "uppercase",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingLeft: "36px",
            paddingRight: "130px"
          }}
        >
          <div
            style={{
              textAlign: "left",
              color: "white",
              display: "flex",
              textTransform: "uppercase",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <p
              style={{
                color: "#a494ac",
                marginBottom: 0,
                marginTop: 0,
                fontSize: "36px",
                fontFamily: '"Poppins"'
              }}
            >
              {header}
            </p>
            <p
              style={{
                fontSize: "54px",
                color: "white",
                marginBottom: 0,
                marginTop: "16px",
                fontFamily: '"Poppins"'
              }}
            >
              {name}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Poppins",
          data: fontData,
          style: "normal"
        }
      ]
    }
  );
}
