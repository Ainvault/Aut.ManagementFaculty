import { query } from "@/lib/db";
import type { Article } from "@/lib/types";
import { rowToArticle, type ArticleRow } from "@/lib/db/mappers";

export async function getArticles(): Promise<Article[]> {
  const res = await query<ArticleRow>(
    "SELECT * FROM articles WHERE published = true ORDER BY published_at DESC",
  );
  return res.rows.map(rowToArticle);
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const res = await query<ArticleRow>(
    "SELECT * FROM articles WHERE published = true AND featured = true ORDER BY published_at DESC LIMIT 1",
  );
  return res.rows[0] ? rowToArticle(res.rows[0]) : null;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const res = await query<ArticleRow>(
    "SELECT * FROM articles WHERE published = true AND id = $1 LIMIT 1",
    [id],
  );
  return res.rows[0] ? rowToArticle(res.rows[0]) : null;
}