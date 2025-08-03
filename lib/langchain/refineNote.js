import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.0-flash",
  temperature: 0.7,
});

const refinePrompt = PromptTemplate.fromTemplate(`
You are an expert writing assistant. Please refine and improve the following note while maintaining the original meaning and intent. Make it more clear, well-structured, and engaging.

Original Note:
{rawNote}

Please provide an improved version that:
- Maintains the original meaning and key points
- Improves clarity and readability
- Fixes grammar and spelling errors
- Enhances structure and flow
- Adds appropriate formatting where helpful

Refined Note:
`);

export const refineNoteChain = new LLMChain({
  llm: model,
  prompt: refinePrompt,
});

export async function refineNote(rawNote) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return `**Enhanced Version:**\n\n${rawNote}\n\n*Note: Missing Gemini API key.*`;
    }

    const result = await refineNoteChain.call({
      rawNote,
    });
    return result.text.trim();
  } catch (error) {
    console.error("Error refining note:", error);
    return `**Enhanced Version:**\n\n${rawNote}\n\n*Note: Gemini refinement failed.*`;
  }
}

