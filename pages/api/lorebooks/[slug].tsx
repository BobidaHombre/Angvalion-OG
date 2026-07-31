import { NextRequest } from "next/server";
import { generateLoreOgImage } from "../../../helpers/loreOg";

export const config = {
  runtime: "experimental-edge"
};

export default async function lorebookOgHandler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const lang = searchParams.get("lang");
  const slug = searchParams.get("slug");

  const response = await fetch(`https://api.allrealm.io/lorebooks/${slug}`, {
    headers: {
      "private-token": process.env.ALLREALM_PRIVATE_TOKEN!
    }
  });

  const topText = {
    pl: "Lorebook:",
    en: "Lorebook:"
  };

  const data = await response.json();

  const title = data.title;
  const img = data.og;

  return await generateLoreOgImage(img, title, "", topText[lang] || topText.en);
}
