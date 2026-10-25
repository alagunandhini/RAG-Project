function splitIntoChunks(text, chunkSize = 600) {
  const chunks = [];
  const paragraphs = text.split("\n");

  let current = "";

  for (const paragraph of paragraphs) {
    if ((current + paragraph).length > chunkSize) {
      if (current) chunks.push(current);
      current = paragraph;
    } else {
      current += "\n" + paragraph;
    }
  }

  if (current) chunks.push(current);

  return chunks;
}

export { splitIntoChunks };