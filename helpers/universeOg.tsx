import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge"
};

export const generateUniverseImage = async (
  img: string,
  text: string,
  description?: string,
  isIcon = false
) => {
  const font = fetch(
    new URL("../assets/Alegreya-Medium.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontRegular = fetch(
    new URL("../assets/Alegreya-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontData = await font;
  const fontRegularData = await fontRegular;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundImage:
            "url(https://og.angvalion.com/img/universe/blank.png)",
          backgroundPosition: "center",
          paddingLeft: "72px",
          paddingRight: "104px",
          justifyItems: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "604px"
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "Medium",
              color: "#9D7B52",
              textTransform: "uppercase",
              lineHeight: "1em",
              fontWeight: 500,
              fontSize: text.length > 15 ? "54px" : "72px"
            }}
          >
            {text}
          </p>
          {description && (
            <p
              style={{
                fontFamily: "Regular",
                margin: 0,
                marginTop: "20px",
                fontSize: "22px",
                color: "white"
              }}
            >
              {description}
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            right: "70px",
            width: "280px",
            height: "280px",

            boxSizing: "border-box",
            background: "rgba(0,0,0,0.6)",
            transform: "translateY(-50%)"
          }}
        >
          <img
            style={{
              objectFit: isIcon ? "contain" : "cover"
            }}
            src={img}
            width={isIcon ? "220px" : "280px"}
            height={isIcon ? "220px" : "280px"}
          />
          <img
            src="https://og.angvalion.com/img/universe/border.png"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Medium",
          data: fontData,
          style: "normal"
        },
        {
          name: "Regular",
          data: fontRegularData,
          style: "normal"
        }
      ]
    }
  );
};
