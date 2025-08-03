'use client';

import { Button } from '@/components/ui/button';
import { Sparkles, Type, Save, Loader2, Trash2 } from 'lucide-react';

export function NoteActions({ 
  currentNoteId,
  note, 
  title,
  onRefinedNote, 
  onGeneratedTitle, 
  onSave,
  onDelete,
  loading, 
  setLoading 
}) {

  const handleRefineNote = async () => {
  if (!note || note.trim().length === 0) return;

  setLoading(prev => ({ ...prev, refining: true }));

  try {
    const response = await fetch('/api/refine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: note.trim() }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to refine note');
    }

    const data = await response.json();
    if (data.refinedNote) {
      onRefinedNote(data.refinedNote);
      alert('✨ Note refined successfully! Check the AI suggestions below.');
    } else {
      throw new Error('No refined note returned');
    }
  } catch (error) {
    console.error('Error refining note:', error);
    alert('❌ Failed to refine note. Please try again.');
  } finally {
    setLoading(prev => ({ ...prev, refining: false }));
  }
};

  

  const handleGenerateTitle = async () => {
  if (!note.trim()) return;

  setLoading(prev => ({ ...prev, generating: true }));

  try {
    const response = await fetch('/api/title', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: note.trim(),
        existingTitle: title?.trim() || ''
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate title');
    }

    const data = await response.json();
    onGeneratedTitle(data.title);
    alert('🎯 Title generated successfully! Check the AI suggestions below.');
  } catch (error) {
    console.error('Error generating title:', error);
    alert('❌ Failed to generate title. Please try again.');
  } finally {
    setLoading(prev => ({ ...prev, generating: false }));
  }
};


  const handleSaveNote = () => {
    onSave(note, title);
  };
  const isDisabled = !note.trim();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      <Button
        onClick={handleSaveNote}
        disabled={isDisabled || loading.saving}
        className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {loading.saving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        <span>{loading.saving ? 'Saving...' : currentNoteId ? 'Update Note' : 'Save Note'}</span>
      </Button>

      <Button
        onClick={handleRefineNote}
        disabled={isDisabled || loading.refining}
        className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {loading.refining ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        <span>{loading.refining ? 'Refining...' : 'Refine with AI'}</span>
      </Button>

      <Button
        onClick={handleGenerateTitle}
        disabled={isDisabled || loading.generating}
        className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {loading.generating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Type className="h-4 w-4" />
        )}
        <span>{loading.generating ? 'Generating...' : 'Generate Title'}</span>
      </Button>

      {currentNoteId && (
        <Button
          onClick={onDelete}
          disabled={loading.deleting}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {loading.deleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          <span>{loading.deleting ? 'Deleting...' : 'Delete Note'}</span>
        </Button>
      )}
    </div>
  );
}

