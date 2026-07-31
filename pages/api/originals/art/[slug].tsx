import { NextRequest } from "next/server";
import { generateOriginalArt } from "../../../../helpers/originalArt";

export const config = {
  runtime: "experimental-edge"
};

export default async function lorebookOgHandler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const slug = searchParams.get("slug");

  const response = await fetch(
    `https://api.allrealm.io/originals/arts/${slug}`,
    {
      headers: {
        ["Accept-Language"]: "pl",
        "private-token": process.env.ALLREALM_PRIVATE_TOKEN!
      }
    }
  );

  const data = await response.json();

  const authors = data.authors?.length
    ? data.authors.map((author) => author.name)
    : data.author
    ? [data.author.name]
    : [];

  const img = data.src;


console.log(data)

  const size = data.sizes.src;

  const year = () => {
    return Number(data.createdAt.slice(0, 4)).toString();
  };

  return generateOriginalArt(img, year(), authors, size.width, size.height);
}
