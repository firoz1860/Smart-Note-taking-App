'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  PenTool,
  Sparkles,
  Brain,
  Shield,
  ArrowRight,
  Zap,
  Users,
  Globe
} from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header
  className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50"
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    maxWidth: '100%',
    gap: '0.5rem',
  }}
>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      flex: '1 1 auto',
      minWidth: 0,
      gap: '0.75rem',
    }}
  >
    <div style={{ position: 'relative' }}>
      <PenTool className="h-8 w-8 text-blue-600" />
      <div
        style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          width: '12px',
          height: '12px',
          borderRadius: '9999px',
          background: 'linear-gradient(to right, #34d399, #10b981)',
          boxShadow: '0 0 4px rgba(0,0,0,0.2)',
          animation: 'pulse 1.5s infinite',
        }}
      ></div>
    </div>
    <div style={{ flexShrink: 1, minWidth: 0 }}>
      <h1
        style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#111827',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        className="dark:text-white"
      >
        Smart Note
      </h1>
      <p
        style={{
          fontSize: '0.75rem',
          color: '#6b7280',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        className="dark:text-gray-400"
      >
        AI-Powered Writing
      </p>
    </div>
  </div>

  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      gap: '0.5rem',
      flex: '1 1 auto',
      minWidth: 0,
    }}
  >
    <div
      style={{
        fontSize: '0.75rem',
        color: '#111827',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        textAlign: 'right',
      }}
      className="dark:text-white"
    >
      firozahmed709p@gmail.com
    </div>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        gap: '0.5rem',
      }}
    >
      <ThemeToggle />
      <Button
        onClick={() => router.push('/auth/login')}
        variant="ghost"
        className="hover:bg-blue-50 dark:hover:bg-blue-950"
      >
        Sign In
      </Button>
      <Button
        onClick={() => router.push('/auth/signup')}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="hidden sm:inline">Get Started</span>
        <span className="sm:hidden">Start</span>
      </Button>
    </div>
  </div>
</header>



      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              <span>Powered by Advanced AI</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            Write Smarter with
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> AI-Powered</span> Notes
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 sm:mb-16 leading-relaxed max-w-3xl mx-auto">
            Transform your ideas into polished notes with intelligent refinement, 
            automatic title generation, and seamless cloud synchronization.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
            <div className="group bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">AI Refinement</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                Enhance your notes with AI-powered editing that improves clarity, structure, and readability.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="bg-emerald-100 dark:bg-emerald-900 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Smart Titles</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                Automatically generate engaging titles based on your note content.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="bg-purple-100 dark:bg-purple-900 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Secure Storage</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                Your notes are stored securely in the cloud and accessible from anywhere.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={() => router.push('/auth/signup')}
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Start Writing Smarter
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/auth/login')}
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Sign In
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-bold text-2xl text-gray-900 dark:text-white block">10K+</span>
                Active Writers
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="h-8 w-8 text-emerald-600 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-bold text-2xl text-gray-900 dark:text-white block">50+</span>
                Countries
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Sparkles className="h-8 w-8 text-purple-600 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-bold text-2xl text-gray-900 dark:text-white block">1M+</span>
                Notes Enhanced
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <PenTool className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-gray-900 dark:text-white">Smart Note</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          &copy; 2025 Smart Note App. Powered by AI and crafted with care.
        </p>
      </footer>
    </div>
  );
}






















