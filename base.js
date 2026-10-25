import fs from "fs"
import { PDFParse } from "pdf-parse"
import { splitIntoChunks } from "./chunks.js";
import { storeChunks } from "./store.js";

// read file
const data=fs.readFileSync("./sample_company_details_rag.pdf");

//extract the text
const parser=new PDFParse({data});
const result= await parser.getText();

  console.log(result.text);

  // Split the extracted text
const chunks = splitIntoChunks(result.text);

// Display the chunks
console.log("Total chunks:", chunks.length);

// Store chunks in MongoDB
await storeChunks(chunks);
