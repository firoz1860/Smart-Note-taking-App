import { localNotesStorage } from '@/lib/storage';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return Response.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const note = localNotesStorage.getNote(userId, id);

    if (!note) {
      return Response.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    return Response.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    return Response.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { title, content, userId } = await request.json();

    if (!content || !userId) {
      return Response.json(
        { error: 'Content and User ID are required' },
        { status: 400 }
      );
    }

    const updatedNote = localNotesStorage.saveNote(userId, {
      id,
      title: title || 'Untitled Note',
      content
    });

    return Response.json({
      success: true,
      message: 'Note updated successfully'
    });
  } catch (error) {
    console.error('Error updating note:', error);
    return Response.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return Response.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    const deleted = localNotesStorage.deleteNote(userId, id);

    if (!deleted) {
      return Response.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }
    }
    return Response.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    return Response.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}













// import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

// export async function GET(request, { params }) {
//   try {
//     const { id } = params;
//     const docRef = doc(db, 'notes', id);
//     const docSnap = await getDoc(docRef);

//     if (!docSnap.exists()) {
//       return Response.json(
//         { error: 'Note not found' },
//         { status: 404 }
//       );
//     }

//     const data = docSnap.data();
//     return Response.json({
//       id: docSnap.id,
//       ...data,
//       createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
//       updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null
//     });
//   } catch (error) {
//     console.error('Error fetching note:', error);
//     return Response.json(
//       { error: 'Failed to fetch note' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request, { params }) {
//   try {
//     const { id } = params;
//     const { title, content } = await request.json();

//     if (!content) {
//       return Response.json(
//         { error: 'Content is required' },
//         { status: 400 }
//       );
//     }

//     const docRef = doc(db, 'notes', id);
//     await updateDoc(docRef, {
//       title: title || 'Untitled Note',
//       content,
//       updatedAt: new Date()
//     });

//     return Response.json({
//       success: true,
//       message: 'Note updated successfully'
//     });
//   } catch (error) {
//     console.error('Error updating note:', error);
//     return Response.json(
//       { error: 'Failed to update note' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     const { id } = params;
//     const docRef = doc(db, 'notes', id);
//     await deleteDoc(docRef);

//     return Response.json({
//       success: true,
//       message: 'Note deleted successfully'
//     });
//   } catch (error) {
//     console.error('Error deleting note:', error);
//     return Response.json(
//       { error: 'Failed to delete note' },
//       { status: 500 }
//     );
//   }
// }