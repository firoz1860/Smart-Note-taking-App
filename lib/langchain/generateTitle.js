import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { LLMChain } from 'langchain/chains';

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gemini-2.0-flash',
  temperature: 0.5,
});

const titlePrompt = PromptTemplate.fromTemplate(`
Based on the following note content, generate a concise, descriptive title that captures the main topic or theme. The title should be engaging and informative.

Note Content:
{noteContent}

Please provide only the title without any additional text or formatting:
`);

export const generateTitleChain = new LLMChain({
  llm: model,
  prompt: titlePrompt,
});

export async function generateTitle(noteContent) {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      // Generate a simple title from the first few words
      const words = noteContent.trim().split(' ').slice(0, 5);
      return words.join(' ') + (noteContent.split(' ').length > 5 ? '...' : '');
    }
    
    const result = await generateTitleChain.call({
      noteContent: noteContent,
       existingTitle: noteTitle,
    });
    return result.text.trim();
  } catch (error) {
    console.error('Error generating title:', error);
    // Fallback title generation
    const words = noteContent.trim().split(' ').slice(0, 5);
    return words.join(' ') + (noteContent.split(' ').length > 5 ? '...' : '');
  }
}


