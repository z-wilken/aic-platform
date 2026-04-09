import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const ARTICLES_DATABASE_ID = process.env.NOTION_ARTICLES_DATABASE_ID;
const POLICY_UPDATES_DATABASE_ID = process.env.NOTION_POLICY_UPDATES_DATABASE_ID;

export async function getArticles() {
  if (!ARTICLES_DATABASE_ID) return [];

  const response = await notion.databases.query({
    database_id: ARTICLES_DATABASE_ID,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page: any) => {
    return {
      id: page.id,
      title: page.properties.Title?.title[0]?.plain_text || "Untitled",
      excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || "",
      category: page.properties.Category?.select?.name || "Uncategorized",
      author: page.properties.Author?.rich_text[0]?.plain_text || "AIC Team",
      date: page.properties.Date?.date?.start || "",
      readTime: page.properties.ReadTime?.rich_text[0]?.plain_text || "5 min read",
      image: page.properties.Image?.url || "https://images.unsplash.com/photo-1764087957302-ef0756ed8e0a?auto=format&fit=crop&q=80&w=1080",
      featured: page.properties.Featured?.checkbox || false,
      slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
    };
  });
}

export async function getPolicyUpdates() {
  if (!POLICY_UPDATES_DATABASE_ID) return [];

  const response = await notion.databases.query({
    database_id: POLICY_UPDATES_DATABASE_ID,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page: any) => {
    return {
      id: page.id,
      date: page.properties.Date?.date?.start || "",
      tag: page.properties.Tag?.select?.name || "Update",
      title: page.properties.Title?.title[0]?.plain_text || "Untitled Update",
      summary: page.properties.Summary?.rich_text[0]?.plain_text || "",
    };
  });
}
