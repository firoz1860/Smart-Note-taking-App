




import { localNotesStorage } from '@/lib/storage';

export async function POST(request) {
  try {
    const { userId, title, content } = await request.json();

    if (!userId || !content) {
      return Response.json(
        { error: 'User ID and content are required' },
        { status: 400 }
      );
    }

    const savedNote = localNotesStorage.saveNote(userId, {
      title: title || 'Untitled Note',
      content,
    });

    if (!savedNote || !savedNote.id) {
      throw new Error('Note was not saved correctly.');
    }

    return Response.json({
      id: savedNote.id,
      success: true,
      message: 'Note created successfully',
    });
  } catch (error) {
    console.error('Error creating note:', error);
    return Response.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return Response.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const notes = localNotesStorage.getNotes(userId);

    return Response.json({ notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return Response.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}







