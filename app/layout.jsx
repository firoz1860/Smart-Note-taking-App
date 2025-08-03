import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LenisProvider } from '@/components/LenisProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Smart Note App - AI-Powered Note Taking',
  description: 'Write, refine, and organize your notes with AI assistance',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
