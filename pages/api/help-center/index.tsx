import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge"
};

export default async function lorebookOgHandler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const name = searchParams.get("name");
  const icon = searchParams.get("icon");
  const header = searchParams.get("header");

  const font = fetch(
    new URL("../../../assets/Poppins-SemiBold.ttf", import.meta.url)
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
          backgroundImage: `url(https://og.angvalion.com/img/help-center.png)`
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translate(0,-42%)",
            display: "flex",
            width: 250,
            height: 250,
            right: "165px"
          }}
        >
          <img
            src={`https://og.angvalion.com/icons/angv-${icon}.svg`}
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              filter:
                "invert(35%) sepia(64%) saturate(1432%) hue-rotate(250deg) brightness(107%) contrast(105%)"
            }}
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
                fontSize: "48px",
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
