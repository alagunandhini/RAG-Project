
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.Gemini_Key,
});

async function generateAnswer(chunks, question) {
  const context = chunks
    .map((chunk) => chunk.chunkText)
    .join("\n\n");

  const prompt = `
Answer using only the context below.
If the answer is unavailable, say:
"I don't have the relevant information about the question."

Context:
${context}

Question: ${question}
`;

console.log("Retrieved context:", context);

  const response = await ai.models.generateContentStream({
    model: "gemini-3.8-flash",
    contents: prompt,
  });

  let answer = "";

  for await (const chunk of response) {
    const text = chunk.text || "";
    process.stdout.write(text);
    answer += text;
  }

  console.log();
  return answer;
}

export { generateAnswer };
