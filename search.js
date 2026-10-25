
import { createEmbedding } from "./embedding.js";
import { connectDB, client } from "./mongodb.js";

async function findRelevantChunks(collection, question) {
  // Convert the question into an embedding
  const questionVector = await createEmbedding(question);

  // Search for the 3 most relevant chunks
  const results = await collection.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: questionVector,
        numCandidates: 10,
        limit: 2,
      },
    },
    {
      $project: {
        _id: 0,
        chunkText: 1,
      },
    },
  ]).toArray();

  return results;
}

export { findRelevantChunks };
