'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Editor({ note, onNoteChange, title, onTitleChange }) {
  const [wordCount, setWordCount] = useState(0);

  const handleNoteChange = (e) => {
    const content = e.target.value;
    onNoteChange(content);
    setWordCount(content.trim() ? content.trim().split(/\s+/).length : 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
          Note Title (Optional)
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter a title for your note..."
          className="w-full text-lg font-medium"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="content" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Note Content
          </Label>
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            {wordCount} words
          </span>
        </div>
        <Textarea
          id="content"
          value={note}
          onChange={handleNoteChange}
          placeholder="Start writing your note here... Let your thoughts flow, and we'll help you refine them with AI."
          className="min-h-80 resize-none text-base leading-relaxed"
          rows={16}
        />
      </div>
      
      {note && (
        <div className="text-sm text-gray-600 dark:text-gray-400 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-xl border border-blue-100 dark:border-blue-900">
          <p className="font-semibold mb-2 text-blue-800 dark:text-blue-200">💡 Writing Tips:</p>
          <ul className="space-y-1 text-xs">
            <li>• Don't worry about perfect grammar - focus on getting your ideas down</li>
            <li>• Use AI refinement to polish your writing and improve clarity</li>
            <li>• Generate smart titles to help organize and find your notes later</li>
          </ul>
        </div>
      )}
    </div>
  );
}


