import { NextRequest } from "next/server";
import { generateLoreOgImage } from "../../../../helpers/loreOg";

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
        "private-token": process.env.ALLREALM_PRIVATE_TOKEN!
      }
    }
  );

  const data = await response.json();

  const author = data.author?.name;
  const title = data.name[lang] || data.name.en;
  const img = data.banner;

  const subtext = {
    pl: `Wykonane przez: ${author}`,
    en: `Done by: ${author}`
  };

  return await generateLoreOgImage(
    img,
    title,
    author ? subtext[lang] || subtext.en : ""
  );
}
