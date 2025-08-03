import { generateTitle } from '@/lib/langchain/generateTitle';

export async function POST(request) {
  try {
    const { content, existingTitle } = await request.json();

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return Response.json(
        { error: 'Note content is required' },
        { status: 400 }
      );
    }

   
    if (existingTitle && existingTitle.trim().length > 0) {
      return Response.json({ title: existingTitle, success: true });
    }

    const title = await generateTitle(content);
    return Response.json({ title, success: true });

  } catch (error) {
    if (
      error.message?.toLowerCase().includes('quota') ||
      error.message?.includes('429')
    ) {
      return Response.json(
        {
          error:
            'Your OpenAI quota has been exceeded. Please check your API key or upgrade your plan.',
        },
        { status: 429 }
      );
    }

    console.error('Error in title generation API:', error);
    return Response.json(
      { error: 'Failed to generate title. Please try again later.' },
      { status: 500 }
    );
  }
}

