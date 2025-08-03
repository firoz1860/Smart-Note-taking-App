
import { refineNote } from '@/lib/langchain/refineNote';

export async function POST(request) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return Response.json(
        { error: 'Note content is required' },
        { status: 400 }
      );
    }

    const refinedNote = await refineNote(content);

    return Response.json({
      refinedNote,
      success: true
    });
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

    console.error('Error in refine API:', error);
    return Response.json(
      { error: 'Failed to refine note. Please try again later.' },
      { status: 500 }
    );
  }
}

