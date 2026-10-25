
import { connectDB, client } from "./mongodb.js";
import { createEmbedding } from "./embedding.js";

async function storeChunks(chunks) {
  // Connect to MongoDB and get the collection
  const collection = await connectDB();

    // Clear existing documents
  await collection.deleteMany({});
  console.log("Old documents cleared!");
  
  // Process each chunk one by one
  for (let i = 0; i < chunks.length; i++) {

    // Convert the chunk text into an embedding
    const embedding = await createEmbedding(chunks[i]);

    // Save the text and embedding in MongoDB
    await collection.insertOne({
      chunkText: chunks[i],
      embedding: embedding,
      chunkIndex: i,
    });

    console.log(`Stored chunk ${i + 1}`);
  }

  // Close the MongoDB connection
  await client.close();
}

// Make this function available to other files
export { storeChunks };
