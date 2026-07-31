import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import { generateAuthorSignature } from "../../../../helpers/elements";

export const config = {
  runtime: "experimental-edge"
};

export default async function lorebookOgHandler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const lang = searchParams.get("lang");
  const slug = searchParams.get("slug");

  const response = await fetch(
    `https://api.allrealm.io/originals/arts/${slug}`,
    {
      headers: {
        ["Accept-Language"]: lang,
        "private-token": process.env.ALLREALM_PRIVATE_TOKEN!,
      }
    }
  );

  const titles = {
    pl: "Galeria Angvalion"
  };

  const title = titles[lang];

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

  const { height, width } = data.sizes.src;

  const ratio = height / width;

  const maxHeight = 630 - 165;
  const maxWidth = 1200 - 12;

  const getSize = () => {
    const height = maxWidth * ratio;

    if (height > maxHeight) {
      return {
        width: maxHeight / ratio,
        height: maxHeight
      };
    } else {
      return {
        width: maxWidth,
        height: height
      };
    }
  };

  const size = getSize();

  const authors = data.authors?.length
    ? data.authors.map((author) => author.name)
    : data.author
    ? [data.author.name]
    : [];

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
            width: "100%",
            height: "100%",
            position: "relative"
          }}
        >
          {Array.from({ length: 10 }, () => {
            return (
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "200%",
                  height: "200%",
                  filter: "blur(5px)",
                  transform: "translate(-50%,-50%)"
                }}
              >
                <img
                  style={{
                    objectFit: "cover"
                  }}
                  src={data.smallArt}
                  width="100%"
                  height="100%"
                />
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              opacity: 0.15,
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(https://og.angvalion.com/img/noise.png)`,
              backgroundSize: "50%"
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.75)"
            }}
          >
            <div
              style={{
                display: "flex",
                width: size.width,
                height: size.height
              }}
            >
              <img
                style={{
                  objectFit: "cover",
                  WebkitMaskImage:
                    "-webkit-gradient(linear, left 90%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))"
                }}
                src={data.smallArt}
                width="100%"
                height="100%"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "380px",
                  width: "100%",
                  background:
                    "linear-gradient(180deg, rgba(15, 15, 15, 0.00) 0%, #0F0F0F 100%)"
                }}
              ></div>
            </div>
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
            zIndex: 200
          }}
        ></div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 0,
            top: 0,
            width: "14px",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(167,131,89,1) 0%, rgba(80,58,33,1) 100%)"
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "100px",
            color: "white",
            zIndex: 324125543
          }}
        >
          <p
            style={{
              fontSize: "28px",
              fontWeight: "500",
              margin: 0,
              marginBottom: 8,
              textShadow: "0px 0px 10px #000"
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: "52px",
              color: "#9D7B52",
              margin: 0,
              textShadow: "0px 0px 10px #000"
            }}
          >
            {data.name[lang]}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            position: "absolute",
            bottom: 34,
            right: 52
          }}
        >
          {generateAuthorSignature(authors, true)}
        </div>
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
