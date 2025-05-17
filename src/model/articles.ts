import { Db, ObjectId } from "mongodb";
import { getDb } from "./users";

const COLLECTION_NAME = "article";

export type Article = {
  _id?: ObjectId;
  imageUrl: string;
  thumbnail: string;
  title: string;
  author: string;
  description: string;
  slug: string;
  category: string;
  videoUrl?: string;
  date: string;
  createdAt?: Date;
};

export async function insertArticle(
  article: Omit<Article, "_id" | "createdAt">
) {
  const db = await getDb();
  const collection = db.collection<Article>(COLLECTION_NAME);
  const result = await collection.insertOne({
    ...article,
    createdAt: new Date(),
  });
  return { id: result.insertedId, ...article };
}

export async function getAllArticles(): Promise<Article[]> {
  const db = await getDb();
  const articles = await db
    .collection<Article>(COLLECTION_NAME)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return articles;
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  const article = await db
    .collection<Article>(COLLECTION_NAME)
    .findOne({ slug });
  return article;
}
