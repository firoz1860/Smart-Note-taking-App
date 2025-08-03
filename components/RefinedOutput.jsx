

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Edit, Save, Sparkles, Type } from 'lucide-react';

export function RefinedOutput({
  originalNote,
  originalTitle,
  refinedNote,
  generatedTitle,
  onSave,
  onUpdateOriginal,
  loading
}) {
  const [editableNote, setEditableNote] = useState(refinedNote);
  const [editableTitle, setEditableTitle] = useState(generatedTitle);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleAcceptAll = () => {
    const finalNote = refinedNote || originalNote;
    const finalTitle = generatedTitle || originalTitle;
    onSave(finalNote, finalTitle);
  };

  const handleAcceptNote = () => {
    onUpdateOriginal(editableNote, originalTitle);
  };

  const handleAcceptTitle = () => {
    onUpdateOriginal(originalNote, editableTitle);
  };

  const handleSaveEdits = () => {
    onSave(editableNote, editableTitle);
  };

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
          <Sparkles className="h-5 w-5" />
          <span>AI Suggestions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="preview">Preview Changes</TabsTrigger>
            <TabsTrigger value="compare">Compare Versions</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-6">
            {generatedTitle && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium flex items-center space-x-2">
                    <Type className="h-4 w-4 text-blue-600" />
                    <span>Generated Title</span>
                  </Label>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditingTitle(!isEditingTitle)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleAcceptTitle}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {isEditingTitle ? (
                  <Input
                    value={editableTitle}
                    onChange={(e) => setEditableTitle(e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="font-medium text-blue-900 dark:text-blue-100">
                      {editableTitle}
                    </p>
                  </div>
                )}
              </div>
            )}

            {refinedNote && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span>Refined Note</span>
                  </Label>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditingNote(!isEditingNote)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleAcceptNote}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {isEditingNote ? (
                  <Textarea
                    value={editableNote}
                    onChange={(e) => setEditableNote(e.target.value)}
                    className="min-h-48 resize-none"
                    rows={8}
                  />
                ) : (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 max-h-64 overflow-y-auto">
                    <div className="whitespace-pre-wrap text-blue-900 dark:text-blue-100">
                      {editableNote}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex space-x-3 pt-4 border-t">
              <Button
                onClick={handleAcceptAll}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Accept & Save All'}
              </Button>
              
              {(isEditingNote || isEditingTitle) && (
                <Button
                  onClick={handleSaveEdits}
                  disabled={loading}
                  variant="outline"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Edits
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="compare" className="space-y-6">
            {generatedTitle && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                    Original Title
                  </Label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-12 flex items-center">
                    <p className="text-gray-700 dark:text-gray-300">
                      {originalTitle || 'No title'}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 block">
                    AI Generated Title
                  </Label>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 min-h-12 flex items-center">
                    <p className="font-medium text-blue-900 dark:text-blue-100">
                      {generatedTitle}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {refinedNote && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                    Original Note
                  </Label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg h-48 overflow-y-auto">
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 text-sm">
                      {originalNote}
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 block">
                    AI Refined Note
                  </Label>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 h-48 overflow-y-auto">
                    <div className="whitespace-pre-wrap text-blue-900 dark:text-blue-100 text-sm">
                      {refinedNote}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}