import { ImageResponse } from "@vercel/og";
import { generateAuthorSignature } from "./elements";

export const generateOriginalArt = async (
  img: string,
  year: string,
  authors: string[],
  width: number,
  height: number,
  small = false
) => {
  const font = fetch(
    new URL("../assets/Alegreya-Medium.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontRegular = fetch(
    new URL("../assets/Alegreya-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontItalic = fetch(
    new URL("../assets/Alegreya-Italic.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const fontData = await font;
  const fontRegularData = await fontRegular;
  const fontItalicData = await fontItalic;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",

          position: "relative"
        }}
      >
        <img
          src={img}
          style={{
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        />
        <div
          style={{
            padding: small ? "16px" : "20px",
            minHeight: "150px",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)",
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: small ? "flex-end" : "space-between"
          }}
        >
          {!small && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingRight: 24
              }}
            >
              {generateAuthorSignature(authors)}
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <img
              src="https://og.angvalion.com/img/originals/logo.png"
              width={small ? "100px" : "176px"}
              height={small ? "24px" : "43px"}
            />
            {!small && (
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  color: "#f6f6f6",
                  fontSize: "14px"
                }}
              >
                ©{year} Angvalion. All rights reserved.
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
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
};
