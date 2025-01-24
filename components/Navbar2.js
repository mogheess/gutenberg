'use client';

import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { SearchDialog } from '@/components/SearchDialog';
import Link from 'next/link';

export const Navbar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const { data: existingBook } = await supabase
        .from('books')
        .select('*')
        .eq('id', searchQuery.trim())
        .single();

      if (existingBook) {
        setSearchResult(existingBook);
        return;
      }

      const response = await fetch(`https://gutendex.com/books/${searchQuery.trim()}`);
      if (!response.ok) {
        throw new Error('Book not found');
      }

      const bookData = await response.json();

      const transformedBook = {
        id: bookData.id.toString(),
        title: bookData.title,
        author: bookData.authors[0]?.name || 'Unknown Author',
        cover_url: bookData.formats['image/jpeg'] || null,
        language: bookData.languages[0] || 'en',
        download_count: bookData.download_count || 0,
      };

      setSearchResult(transformedBook);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResult({ error: 'Book not found' });
    } finally {
      setIsSearching(false);
    }
  };

  const handleReadBook = () => {
    if (searchResult && !searchResult.error) {
      router.push(`/dashboard/reading/${searchResult.id}`);
      setSearchResult(null); 
    }
  };

  const handleCloseDialog = () => {
    setSearchResult(null); 
  };

  return (
    <>
      <nav className="bg-white shadow-sm py-3 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-xl md:text-2xl font-semibold cursor-pointer">
                  ProjectGutenberg
                </span>
              </Link>
             
            </div>

            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden lg:flex items-center gap-8">
              <form onSubmit={handleSearch} className="relative w-80">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books by ID..."
                  className="w-full pl-4 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isSearching}
                >
                  <Search size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="w-full pl-4 pr-10"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        </div>
      </nav>

      <SearchDialog
        searchResult={searchResult}
        searchQuery={searchQuery}
        onClose={handleCloseDialog}
        onReadBook={handleReadBook}
      />
    </>
  );
};

export default Navbar2;