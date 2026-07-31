import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge"
};

export const generateLoreOgImage = async (
  img: string,
  text: string,
  subText?: string,
  topText?: string
) => {
  const font = fetch(
    new URL("../assets/Poppins-SemiBold.ttf", import.meta.url)
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
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "20px 40px",
          backgroundImage: `url(${img})`,
          position: "relative"
        }}
      >
        <img
          src="https://og.angvalion.com/img/og-logo.png"
          style={{
            position: "absolute",
            left: "60px",
            bottom: "40px",
            width: "250 px",
            height: "63px"
          }}
        />
        <div
          style={{
            width: "60%",
            fontSize: "64px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0px 20px"
          }}
        >
          {topText && (
            <p
              style={{
                width: "100%",
                color: "white",
                fontSize: "28px",
                marginBottom: "8px",
                marginTop: 0,
                fontFamily: '"Poppins"'
              }}
            >
              {topText}
            </p>
          )}
          <p
            style={{
              width: "100%",
              color: "#1295c7",
              marginBottom: 0,
              marginTop: 0,
              fontFamily: '"Poppins"'
            }}
          >
            {text}
          </p>
          {subText && (
            <p
              style={{
                width: "100%",
                fontSize: "32px",
                color: "rgba(255,255,255,0.7)",
                marginTop: "0px",
                fontFamily: '"Poppins"'
              }}
            >
              {subText}
            </p>
          )}
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
};
