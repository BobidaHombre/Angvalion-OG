import { NextRequest } from "next/server";
import { generateLoreOgImage } from "../../../../helpers/loreOg";

export const config = {
  runtime: "experimental-edge"
};

export default async function lorebookOgHandler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const lang = searchParams.get("lang");
  const categorySlug = searchParams.get("categorySlug");
  const subcategorySlug = searchParams.get("subcategorySlug");

  const topText = {
    pl: "Temat:",
    en: "Topic:"
  };

  const response = await fetch(
    `https://api.allrealm.io/categories/${categorySlug}/${subcategorySlug}`,
    {
      headers: {
        "private-token": process.env.ALLREALM_PRIVATE_TOKEN!
      }
    }
  );

  const data = await response.json();

  const title = `${data.parent.name}: ${data.name}`;
  const img = data.og;

  return await generateLoreOgImage(img, title, "", topText[lang] || topText.en);
}
