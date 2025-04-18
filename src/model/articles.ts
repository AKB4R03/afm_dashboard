import { Db, ObjectId } from "mongodb";
import { getDb } from "./users";

const COLLECTION_NAME = "blog";

export async function insertArticle(article: {
  title: string;
  content: string;
  author: string;
  image: string;
}) {
  const db = await getDb();
  const collection = db.collection(COLLECTION_NAME);
  const result = await collection.insertOne({
    ...article,
    createdAt: new Date(),
  });
  return { id: result.insertedId, ...article };
}
