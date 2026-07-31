import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge"
};

export default async function lorebookOgHandler(req: NextRequest) {
  const name = "Amarant: Araulen";
  const image = "https://i.imgur.com/pIPLpmP.png";
  const category = "Tła Kampanii";

  const font = fetch(
    new URL("../../../../../assets/Poppins-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          width: "100%",
          height: "100%",
          position: "relative"
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "red"
          }}
        >
          <img
            src={image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            color: "white",
            background: "black"
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              position: "absolute",
              top: "0px",
              transform: "translateY(-80%)"
            }}
          >
            <img
              src="https://og.angvalion.com/img/product-top-border.png"
              style={{
                width: "100%",
                height: "166px"
              }}
            />
          </div>
          <p
            style={{
              padding: "10px 20px",
              fontSize: "48px"
            }}
          >
            {name}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "absolute",
            color: "white",
            textTransform: "uppercase",
            paddingTop: "6px",
            paddingBottom: "0px",
            top: 0,
            fontSize: "24px",
            left: 0,
            width: "100%",
            zIndex: 10000,
            background: "#786383"
          }}
        >
          <p
            style={{
              display: "flex",
              marginBottom: 0,
              marginTop: 0
            }}
          >
            {category}
          </p>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 600,
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
