'use client'

import { useState, useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bookmark, BookmarkCheck, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  getBook, 
  storeBook, 
  toggleBookmark, 
  addToHistory, 
  isBookmarked 
} from '@/lib/supabase';

const ReadingPage = ({ params: paramsPromise }) => {
  const router = useRouter();
  const params = use(paramsPromise);
  const [book, setBook] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
 

  useEffect(() => {
    const fetchAndStoreBook = async () => {
      if (!params?.id) {
        console.error("No book ID provided");
        return;
      }
  
      setLoading(true);
      try {
        let bookData = await getBook(params.id);
  
        if (!bookData) {
        
          const response = await fetch(`/api/books/content/${params.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch book");
          }
          const data = await response.json();
        
          bookData = await storeBook({
            id: params.id,
            content: data.content,
            title: data.title,
            author: data.author,
            coverUrl: data.coverUrl,
            language: data.languages?.[0] || 'en',
            download_count: data.downloadCount,
          });
        }
  
        setBook(bookData);
  
        
        const isCurrentlyBookmarked = await isBookmarked(params.id);
        setBookmarked(isCurrentlyBookmarked);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAndStoreBook();
  }, [params?.id]);


  const handleToggleBookmark = async () => {
    if (!book) return;
  
    try {
   
      setBookmarked(prev => !prev);
  
      const isNowBookmarked = await toggleBookmark(params.id);
  
      if (isNowBookmarked !== !bookmarked) {
        setBookmarked(isNowBookmarked);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      
      setBookmarked(prev => !prev);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Book Not Found</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <header className={`sticky top-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b shadow-sm z-10`}>
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold line-clamp-1">{book.title}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">by {book.author}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFontSize(prev => Math.max(12, prev - 1))}
                  disabled={fontSize <= 12}
                >
                  A-
                </Button>
                <span className="w-8 text-center text-sm">{fontSize}</span>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
                  disabled={fontSize >= 24}
                >
                  A+
                </Button>
              </div>

              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleBookmark}
                disabled={loading}
              >
                {bookmarked ? (
                  <BookmarkCheck className="h-4 w-4 text-blue-600 fill-current" />
                ) : (
                  <Bookmark className="h-4 w-4 text-gray-600 fill-transparent stroke-current" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article 
          className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}
          style={{ 
            fontSize: `${fontSize}px`,
            lineHeight: '1.8',
            letterSpacing: '0.01em'
          }}
        >
          {book.content}
        </article>
      </main>
    </div>
  );
};

export default ReadingPage;