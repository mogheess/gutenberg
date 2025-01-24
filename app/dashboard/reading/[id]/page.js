'use client'

import { useState, useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bookmark, BookmarkCheck, Sun, Moon, BookOpenText  } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { BookAnalysis } from '@/components/BookAnalysis';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { SheetTitle, SheetDescription } from '@/components/ui/sheet';

import { 
  getBook, 
  storeBook, 
  toggleBookmark, 
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
  
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="secondary" 
            className="rounded-full w-12 h-12 md:w-14 md:h-14 shadow-xl flex items-center justify-center"
          >
            <BookOpenText className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </SheetTrigger>

        <SheetContent 
          side="right" 
          className="w-full max-w-xl p-6 bg-background overflow-y-auto"
        >
          <VisuallyHidden>
            <SheetTitle>Book Analysis</SheetTitle>
            <SheetDescription>Detailed analysis of the book content</SheetDescription>
          </VisuallyHidden>
          <div className="h-full pb-16">
            <BookAnalysis bookContent={book.content} />
          </div>
        </SheetContent>
      </Sheet>
    </div>

    {/* Main Content */}
    <header className={`sticky top-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b shadow-sm z-10`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" onClick={() => router.back()} className="px-2 md:px-3">
              <ArrowLeft className="mr-1 md:mr-2 h-4 w-4" />
              <span className="hidden md:inline">Back</span>
            </Button>
            <div className="flex flex-col max-w-[200px] md:max-w-none">
              <h1 className="text-base md:text-lg font-semibold line-clamp-1">{book.title}</h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-1">by {book.author}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1 md:gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setFontSize(prev => Math.max(12, prev - 1))}
                disabled={fontSize <= 12}
                className="px-2 md:px-3"
              >
                A-
              </Button>
              <span className="w-6 md:w-8 text-center text-xs md:text-sm">{fontSize}</span>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
                disabled={fontSize >= 24}
                className="px-2 md:px-3"
              >
                A+
              </Button>
            </div>

            <Button variant="ghost" size="sm" onClick={toggleTheme} className="px-2 md:px-3">
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleBookmark}
              disabled={loading}
              className="px-2 md:px-3"
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

    <main className="max-w-3xl mx-auto px-4 md:px-6 py-8">
      <article 
        className={`prose dark:prose-invert max-w-none 
          bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-lg shadow-sm
          border border-gray-200 dark:border-gray-700`}
        style={{ 
          fontSize: `${fontSize}px`,
          lineHeight: '1.6',
          letterSpacing: '0.015em',
          wordBreak: 'break-word'
        }}
      >
        {book.content}
      </article>
    </main>
  </div>
  );
};

export default ReadingPage;