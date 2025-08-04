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
    <Card className="border-2 border-blue-200 dark:border-blue-800 mx-1 sm:mx-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 text-lg sm:text-xl">
          <Sparkles className="h-5 w-5" />
          <span>AI Suggestions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
            <TabsTrigger value="preview">Preview Changes</TabsTrigger>
            <TabsTrigger value="compare">Compare Versions</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4 sm:space-y-6">
            {generatedTitle && (
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs sm:text-sm font-medium flex items-center space-x-2">
                    <Type className="h-4 w-4 text-blue-600" />
                    <span>Generated Title</span>
                  </Label>
                  <div className="flex space-x-1 sm:space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditingTitle(!isEditingTitle)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleAcceptTitle}
                      className="h-8 w-8 p-0"
                    >
                      <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
                {isEditingTitle ? (
                  <Input
                    value={editableTitle}
                    onChange={(e) => setEditableTitle(e.target.value)}
                    className="w-full text-sm sm:text-base"
                  />
                ) : (
                  <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="font-medium text-blue-900 dark:text-blue-100 text-sm sm:text-base">
                      {editableTitle}
                    </p>
                  </div>
                )}
              </div>
            )}

            {refinedNote && (
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs sm:text-sm font-medium flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span>Refined Note</span>
                  </Label>
                  <div className="flex space-x-1 sm:space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditingNote(!isEditingNote)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleAcceptNote}
                      className="h-8 w-8 p-0"
                    >
                      <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
                {isEditingNote ? (
                  <Textarea
                    value={editableNote}
                    onChange={(e) => setEditableNote(e.target.value)}
                    className="min-h-32 sm:min-h-48 resize-none text-sm sm:text-base"
                    rows={6}
                  />
                ) : (
                  <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 max-h-48 sm:max-h-64 overflow-y-auto">
                    <div className="whitespace-pre-wrap text-blue-900 dark:text-blue-100 text-sm sm:text-base">
                      {editableNote}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t">
              <Button
                onClick={handleAcceptAll}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-sm sm:text-base"
              >
                <Check className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Accept & Save All'}
              </Button>
              
              {(isEditingNote || isEditingTitle) && (
                <Button
                  onClick={handleSaveEdits}
                  disabled={loading}
                  variant="outline"
                  className="text-sm sm:text-base"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Edits
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="compare" className="space-y-4 sm:space-y-6">
            {generatedTitle && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                    Original Title
                  </Label>
                  <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-10 sm:min-h-12 flex items-center">
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      {originalTitle || 'No title'}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 block">
                    AI Generated Title
                  </Label>
                  <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 min-h-10 sm:min-h-12 flex items-center">
                    <p className="font-medium text-blue-900 dark:text-blue-100 text-sm sm:text-base">
                      {generatedTitle}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {refinedNote && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                    Original Note
                  </Label>
                  <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg h-32 sm:h-48 overflow-y-auto">
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                      {originalNote}
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 block">
                    AI Refined Note
                  </Label>
                  <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 h-32 sm:h-48 overflow-y-auto">
                    <div className="whitespace-pre-wrap text-blue-900 dark:text-blue-100 text-xs sm:text-sm">
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


