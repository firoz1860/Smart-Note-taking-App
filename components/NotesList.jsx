'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Trash2, Edit } from 'lucide-react';

export function NotesList({ notes, currentNoteId, onLoadNote, onDeleteNote, loading }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Card className="h-full max-h-[90vh]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Notes</span>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {notes.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] sm:h-[600px] md:h-[700px] px-4 py-2">
          {loading.loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Loading notes...</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium mb-2">No notes yet</p>
              <p className="text-sm">Create your first note to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`group relative p-4 border rounded-xl transition-all duration-200 cursor-pointer hover:shadow-md ${
                    currentNoteId === note.id
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 shadow-lg scale-[1.02]'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900/20 hover:shadow-md hover:scale-[1.01]'
                  }`}
                  onClick={() => onLoadNote(note.id)}
                >
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1 flex-1">
                      {note.title}
                    </h4>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLoadNote(note.id);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteNote(note.id);
                        }}
                        disabled={loading.deleting}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-3 leading-relaxed">
                    {truncateContent(note.content)}
                  </p>

                  <div className="flex flex-wrap justify-between items-center text-xs text-gray-500 dark:text-gray-400 gap-y-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(note.updatedAt || note.createdAt)}</span>
                    </div>
                    <span>{note.content.split(' ').length} words</span>
                  </div>

                  {currentNoteId === note.id && (
                    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r shadow-lg"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}


