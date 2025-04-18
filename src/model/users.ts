import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "@/db/db";
import { hashPw } from "@/lib";

type UserInfoModel = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const DATABASE_NAME = "afm_db";
const COLLECTION_NAME = "users";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const insertUser = async (user: UserInfoModel) => {
  const modifUser: UserInfoModel = {
    ...user,
  };

  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).insertOne(modifUser);

  return result;
};

export const getUserByName = async (name: string) => {
  const db = await getDb();
  const user = await db.collection(COLLECTION_NAME).findOne({ name: name });

  return user;
};

export const getUserWeightById = async (userId: string) => {
  const db = await getDb();
  const user = await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(userId) });

  // Memeriksa apakah user ditemukan
  if (user) {
    return user.weight; // Mengembalikan nilai weight dalam bentuk number
  } else {
    return null; // Mengembalikan null jika user tidak ditemukan
  }
};

export const getUserById = async (userId: string) => {
  const db = await getDb();
  const user = await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(userId) });

  return user;
};

export const getUserWeightByUserId = async (
  userId: string
): Promise<number | null> => {
  const db = await getDb();
  const user = await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(userId) });

  // Memeriksa apakah user ditemukan
  if (user) {
    return user.weight; // Mengembalikan nilai weight dalam bentuk number
  } else {
    return null; // Mengembalikan null jika user tidak ditemukan
  }
};
