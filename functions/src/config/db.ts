import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.URI || "";
const client: MongoClient = new MongoClient(uri);

export const getClient = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("TaskAssist");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
