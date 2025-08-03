// lib/storage.js

const isClient = typeof window !== 'undefined';

class LocalNotesStorage {
  constructor() {
    this.storageKey = 'smart-notes-data';
    this.userKey = 'smart-notes-user';
    this.memoryStore = {}; // fallback for server-side use
  }

  // Get current user
  getCurrentUser() {
    if (!isClient) return null;
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  // Set current user
  setCurrentUser(user) {
    if (!isClient) return;
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Remove current user
  removeCurrentUser() {
    if (!isClient) return;
    localStorage.removeItem(this.userKey);
  }

  // Get all notes
  getNotes(userId) {
    if (!userId) return [];

    if (isClient) {
      const data = localStorage.getItem(this.storageKey);
      const allNotes = data ? JSON.parse(data) : {};
      return allNotes[userId] || [];
    } else {
      return this.memoryStore[userId] || [];
    }
  }

  // Save or update a note
  saveNote(userId, note) {
    if (!userId || !note?.content) return null;

    const noteId = note.id || Date.now().toString();
    const timestamp = new Date().toISOString();
    const noteData = {
      id: noteId,
      title: note.title || 'Untitled Note',
      content: note.content,
      createdAt: note.createdAt || timestamp,
      updatedAt: timestamp,
      userId
    };

    if (isClient) {
      const data = localStorage.getItem(this.storageKey);
      const allNotes = data ? JSON.parse(data) : {};
      if (!allNotes[userId]) allNotes[userId] = [];

      const existingIndex = allNotes[userId].findIndex(n => n.id === noteId);
      if (existingIndex >= 0) {
        allNotes[userId][existingIndex] = noteData;
      } else {
        allNotes[userId].unshift(noteData);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(allNotes));
    } else {
      if (!this.memoryStore[userId]) this.memoryStore[userId] = [];
      const existingIndex = this.memoryStore[userId].findIndex(n => n.id === noteId);
      if (existingIndex >= 0) {
        this.memoryStore[userId][existingIndex] = noteData;
      } else {
        this.memoryStore[userId].unshift(noteData);
      }
    }

    return noteData;
  }

  // Delete a note
  deleteNote(userId, noteId) {
    if (!userId || !noteId) return false;

    if (isClient) {
      const data = localStorage.getItem(this.storageKey);
      const allNotes = data ? JSON.parse(data) : {};
      if (!allNotes[userId]) return false;

      allNotes[userId] = allNotes[userId].filter(note => note.id !== noteId);
      localStorage.setItem(this.storageKey, JSON.stringify(allNotes));
      return true;
    } else {
      if (!this.memoryStore[userId]) return false;
      this.memoryStore[userId] = this.memoryStore[userId].filter(note => note.id !== noteId);
      return true;
    }
  }

  // Get a single note
  getNote(userId, noteId) {
    const notes = this.getNotes(userId);
    return notes.find(note => note.id === noteId) || null;
  }
}

export const localNotesStorage = new LocalNotesStorage();


