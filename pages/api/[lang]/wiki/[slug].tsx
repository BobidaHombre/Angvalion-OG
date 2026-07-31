import { NextRequest } from "next/server";
import { generateUniverseImage } from "../../../../helpers/universeOg";

export const config = {
  runtime: "experimental-edge"
};

export default async function lorebookOgHandler(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const lang = searchParams.get("lang");
  const slug = searchParams.get("slug");

  const response = await fetch(`https://api.allrealm.io/wiki/${slug}`, {
    headers: {
      ["Accept-Language"]: lang,
      "private-token": process.env.ALLREALM_PRIVATE_TOKEN!
    }
  });

  const data = await response.json();

  const page = data;

  const importantIcon = page.categories.find(
    (category) => category.iconIsImportant && category.icon
  )?.icon;

  const image =
    (page.ogPrefer === "tableImage"
      ? page.smallTableImage ||
        page.originalTableImage?.wikiTableImage ||
        page.tableImage ||
        page.originalTableImage?.src
      : "") ||
    importantIcon ||
    page.icon ||
    page.categories[0]?.icon ||
    page.categories.find((category) => category.isMain)?.icon ||
    page.categories.find((category) => category.icon)?.icon ||
    "";

  const title = data.title[lang];
  const description = data.shortDescription[lang];
  const ogPrefer = data.ogPrefer;

  return await generateUniverseImage(
    image,
    title,
    description,
    ogPrefer !== "tableImage"
  );
}
