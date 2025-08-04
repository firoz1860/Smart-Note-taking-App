'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, logOut } from '@/utils/auth';
import { NoteEditor } from './NoteEditor';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { PenTool, LogOut, User } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Mobile Layout */}
          <div className="flex flex-col space-y-3 py-3 sm:hidden">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <PenTool className="h-6 w-6 text-blue-600" />
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    Smart Note
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    AI-Powered Writing Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
              <User className="h-4 w-4" />
              <span className="truncate">{user.email}</span>
            </div>
          </div>

          {/* Tablet and Desktop Layout */}
          <div className="hidden sm:flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <PenTool className="h-7 w-7 md:h-8 md:w-8 text-blue-600" />
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  Smart Note
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  AI-Powered Writing Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1 md:space-x-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <NoteEditor user={user} />
      </main>
    </div>
  );
}





