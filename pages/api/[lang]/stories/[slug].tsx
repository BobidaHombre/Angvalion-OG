import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge"
};

export default async function lorebookOgHandler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const lang = searchParams.get("lang");
  const slug = searchParams.get("slug");

  const response = await fetch(
    `https://api.allrealm.io/stories/next/${slug}`,
    {
      headers: {
        ["Accept-Language"]: lang,
        "private-token": process.env.ALLREALM_PRIVATE_TOKEN!
      }
    }
  );

  const font = fetch(
    new URL("../../../../assets/Alegreya-Medium.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontRegular = fetch(
    new URL("../../../../assets/Alegreya-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontItalic = fetch(
    new URL("../../../../assets/Alegreya-Italic.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const fontData = await font;
  const fontRegularData = await fontRegular;
  const fontItalicData = await fontItalic;

  const data = await response.json();

  const story = data;

  const subtitle = {
    pl: "opowieści ze świata"
  };

  const banner = story.pngBanner || "https://og.angvalion.com/img/story.png";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "black",
          backgroundPosition: "center",
          justifyItems: "center",
          alignItems: "center",
          fontFamily: "Alegreya"
        }}
      >
        <div
          style={{
            display: "flex",
            width: "14px",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(167,131,89,1) 0%, rgba(80,58,33,1) 100%)"
          }}
        ></div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            background: "black"
          }}
        >
          <img
            src={banner}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "150%",
              height: "200%",
              background:
                "radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)"
            }}
          ></div>
          <div
            style={{
              display: "flex",
              width: "700px",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                fontWeight: 500,
                textTransform: "uppercase",
                color: "white",
                textAlign: "center"
              }}
            >
              {subtitle[lang]}
            </h3>
            <div
              style={{
                height: "1px",
                width: "100%",
                maxWidth: "400px",
                marginLeft: "auto",
                marginRight: "auto",
                background: "#A78359",
                marginTop: "8px",
                marginBottom: "20px"
              }}
            ></div>

            <h1
              style={{
                textShadow: "0px 0px 10px #000",
                fontSize: "40px",
                color: "rgba(167,131,89,1)"
              }}
            >
              {story.title[lang]}
            </h1>
            {story.quote && story.quote[lang] && (
              <p
                style={{
                  marginTop: "20px",
                  textShadow: "0px 0px 10px #000",
                  fontSize: "24px",
                  fontWeight: "400 !important",
                  fontStyle: "italic",
                  color: "white"
                }}
              >
                <i>"{story.quote[lang]}"</i>
              </p>
            )}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 14,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)",
            height: "200px",
            width: "100%",
            zIndex: 2
          }}
        ></div>
        <img
          src="https://og.angvalion.com/img/logo.png"
          width="147px"
          height="48px"
          style={{
            position: "absolute",
            bottom: "32px",
            left: "52px",
            zIndex: 2
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Alegreya",
          weight: 500,
          data: fontData,
          style: "normal"
        },
        {
          name: "Alegreya",
          weight: 400,
          data: fontRegularData,
          style: "normal"
        },
        {
          name: "Alegreya",
          data: fontItalicData,
          weight: 400,
          style: "italic"
        }
      ]
    }
  );
}
