
import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MongoDB);

async function connectDB() {
  await client.connect();

  console.log("MongoDB connected!");

  const db = client.db("RAG-DB");
  const collection = db.collection("documents");

  return collection;
}

export { connectDB, client };
