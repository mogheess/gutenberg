'use client'

import React, { useState, useEffect } from 'react';
import { Navbar2 } from '@/components/Navbar2';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getBookmarks} from '@/lib/supabase';
import { seedInitialBooks } from "@/lib/seedBooks";
import { supabase } from '@/lib/supabase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LibraryTabs } from '@/components/LibraryTabs';


const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const initializeLibrary = async () => {
      try {
        setLoading(true);
        
        await seedInitialBooks();
        
        const { data: booksData, error: booksError } = await supabase
          .from('books')
          .select('*');
          
        if (booksError) throw booksError;
        
        const [bookmarksData, historyData] = await Promise.all([
          getBookmarks(),
        ]);
        
        setBooks(booksData || []);
        setBookmarks(bookmarksData || []);
  
        
      } catch (error) {
        console.error('Failed to initialize library:', error);
        setError('Failed to load your library data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    initializeLibrary();
  }, []);

  const getSortedBooks = () => {
    return [...books].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'popular':
          return b.download_count - a.download_count;
        default:
          return 0;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-50 via-slate-50 to-indigo-50">
      <Navbar2 />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Library</h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Sort by Title</SelectItem>
                <SelectItem value="author">Sort by Author</SelectItem>
                <SelectItem value="popular">Sort by Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <LibraryTabs 
            loading={loading}
            books={getSortedBooks()}
            bookmarks={bookmarks}
            sortBy={sortBy}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;