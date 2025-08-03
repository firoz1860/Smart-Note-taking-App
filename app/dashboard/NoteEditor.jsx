'use client';

import { useState, useEffect } from 'react';
import { Editor } from '@/components/Editor';
import { NoteActions } from '@/components/NoteActions';
import { RefinedOutput } from '@/components/RefinedOutput';
import { NotesList } from '@/components/NotesList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NoteEditor({ user }) {
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [currentNote, setCurrentNote] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [refinedNote, setRefinedNote] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [loading, setLoading] = useState({
    refining: false,
    generating: false,
    saving: false,
    loading: false,
    deleting: false
  });

  const fetchNotes = () => {
    if (!user) return;

    setLoading(prev => ({ ...prev, loading: true }));
    try {
      const data = localStorage.getItem('smart-notes-data');
      const allNotes = data ? JSON.parse(data) : {};
      setSavedNotes(allNotes[user.uid] || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchNotes();
    }
  }, [user]);

  const handleSaveNote = async (finalNote, finalTitle) => {
    if (!finalNote.trim()) return;

    setLoading(prev => ({ ...prev, saving: true }));

    try {
      const userId = user.uid;
      const timestamp = new Date().toISOString();
      const noteId = currentNoteId || Date.now().toString();

      const savedNote = {
        id: noteId,
        title: finalTitle || 'Untitled Note',
        content: finalNote,
        createdAt: currentNoteId ? undefined : timestamp,
        updatedAt: timestamp
      };

      const data = localStorage.getItem('smart-notes-data');
      const allNotes = data ? JSON.parse(data) : {};
      const userNotes = allNotes[userId] || [];

      const index = userNotes.findIndex(n => n.id === noteId);
      if (index >= 0) {
        userNotes[index] = { ...userNotes[index], ...savedNote };
      } else {
        userNotes.unshift(savedNote);
      }

      allNotes[userId] = userNotes;
      localStorage.setItem('smart-notes-data', JSON.stringify(allNotes));

      fetchNotes();
      handleNewNote();
      alert('✅ Note saved successfully!');
    } catch (error) {
      console.error('Error saving note:', error);
      alert('❌ Failed to save note. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, saving: false }));
    }
  };

  const handleRefineNote = async () => {
    if (!currentNote.trim()) return;

    setLoading(prev => ({ ...prev, refining: true }));

    try {
      const response = await fetch('/api/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: currentNote.trim() }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error || 'Failed to refine note');
      }

      const data = await response.json();
      setRefinedNote(data.refinedNote);
      alert('✨ Note refined successfully! Check the AI suggestions below.');
    } catch (error) {
      console.error('Error refining note:', error);
      alert('❌ Failed to refine note. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, refining: false }));
    }
  };

  const handleLoadNote = async (noteId) => {
    try {
      const data = localStorage.getItem('smart-notes-data');
      const allNotes = data ? JSON.parse(data) : {};
      const userNotes = allNotes[user.uid] || [];
      const note = userNotes.find(n => n.id === noteId);
      if (note) {
        setCurrentNoteId(note.id);
        setCurrentNote(note.content);
        setNoteTitle(note.title);
        setRefinedNote('');
        setGeneratedTitle('');
      }
    } catch (error) {
      console.error('Error loading note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const confirmed = window.confirm('⚠️ Are you sure you want to delete this note?\n\nThis action cannot be undone.');
    if (!confirmed) return;

    setLoading(prev => ({ ...prev, deleting: true }));
    try {
      const data = localStorage.getItem('smart-notes-data');
      const allNotes = data ? JSON.parse(data) : {};
      const userNotes = allNotes[user.uid] || [];
      allNotes[user.uid] = userNotes.filter(note => note.id !== noteId);
      localStorage.setItem('smart-notes-data', JSON.stringify(allNotes));

      setSavedNotes(prev => prev.filter(note => note.id !== noteId));
      if (currentNoteId === noteId) handleNewNote();

      alert('✅ Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('❌ Failed to delete note. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, deleting: false }));
    }
  };

  const handleNewNote = () => {
    setCurrentNoteId(null);
    setCurrentNote('');
    setNoteTitle('');
    setRefinedNote('');
    setGeneratedTitle('');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 px-4 sm:px-6 md:px-8">
      <div className="xl:col-span-3 space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentNoteId ? 'Edit Note' : 'Create New Note'}
          </h2>
          <Button onClick={handleNewNote} variant="outline" className="flex items-center space-x-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            <span>New Note</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>{currentNoteId ? 'Editing Note' : 'Note Editor'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Editor
              note={currentNote}
              onNoteChange={setCurrentNote}
              title={noteTitle}
              onTitleChange={setNoteTitle}
            />

            <Separator />

            <NoteActions
              currentNoteId={currentNoteId}
              note={currentNote}
              title={noteTitle}
              onRefinedNote={setRefinedNote}
              onGeneratedTitle={setGeneratedTitle}
              onSave={handleSaveNote}
              onDelete={() => handleDeleteNote(currentNoteId)}
              loading={loading}
              setLoading={setLoading}
            />
          </CardContent>
        </Card>

        {(refinedNote || generatedTitle) && (
          <RefinedOutput
            originalNote={currentNote}
            originalTitle={noteTitle}
            refinedNote={refinedNote}
            generatedTitle={generatedTitle}
            onSave={handleSaveNote}
            onUpdateOriginal={(note, title) => {
              setCurrentNote(note);
              setNoteTitle(title);
              setRefinedNote('');
              setGeneratedTitle('');
            }}
            loading={loading.saving}
          />
        )}
      </div>

      <div className="w-full xl:w-auto">
        <NotesList
          notes={savedNotes}
          currentNoteId={currentNoteId}
          onLoadNote={handleLoadNote}
          onDeleteNote={handleDeleteNote}
          loading={loading}
        />
      </div>
    </div>
  );
}

