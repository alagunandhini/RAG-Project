
import readline from "readline";
import { connectDB, client } from "./mongodb.js";
import { findRelevantChunks } from "./search.js";
import { generateAnswer } from "./answer.js";

// Read questions from the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  try {
    // Connect to MongoDB
    const collection = await connectDB();

    console.log("\nWelcome to the RAG Chatbot!");
    console.log("Type 'exit' to quit.\n");

    // Ask questions repeatedly
    function askQuestion() {
      rl.question("Ask a question: ", async (question) => {
        if (question.trim().toLowerCase() === "exit") {
          rl.close();
          await client.close();
          return;
        }

      try {
 
 // Find relevant chunks from MongoDB
console.log("Searching MongoDB...");
const chunks = await findRelevantChunks(collection, question);
console.log("Chunks found:", chunks.length);

// Generate an answer only if chunks exist
if (chunks.length === 0) {
  console.log("No relevant information found. Check your vector index.");
} else {
  const answer = await generateAnswer(chunks, question);
  console.log("Answer:", answer);
}


} catch (error) {
  console.log("Error:", error.message);
}

        askQuestion();
      });
    }

    askQuestion();
  } catch (error) {
    console.error("Error:", error.message);
    rl.close();
    await client.close();
  }
}

main();
