import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge"
};

export default async function lorebookOgHandler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const title = searchParams.get("title");
  const campaignName = searchParams.get("campaignName");

  const font = fetch(
    new URL("../../assets/Poppins-SemiBold.ttf", import.meta.url)
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
          backgroundImage: `url(https://og.angvalion.com/img/campaign-invitation.png)`
        }}
      >
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
              width: "100%",
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
                color: "white",
                marginBottom: 0,
                marginTop: 0,
                fontSize: "32px",
                fontFamily: '"Poppins"'
              }}
            >
              {title}:
            </p>
            <p
              style={{
                fontSize: "60px",
                color: "#a494ac",
                marginBottom: 0,
                marginTop: "16px",
                fontFamily: '"Poppins"'
              }}
            >
              {campaignName}
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
