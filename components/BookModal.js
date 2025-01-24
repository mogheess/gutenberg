import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck, Book, Download, Globe } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export const BookModal = ({ book, onClose }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!book) return null;
  
  const toggleBookmark = async () => {
    try {
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const tags = book.description.split(',').map(tag => tag.trim());

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <Card className="w-full max-w-6xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{book.title}</CardTitle>
            <CardDescription className="text-lg">By {book.author}</CardDescription>
          </div>
          <Button
            variant="ghost"
            onClick={toggleBookmark}
            className="ml-auto hover:bg-slate-100"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-blue-600" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Book Details</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Book className="w-4 h-4 text-gray-500" />
                      <dt className="text-sm font-medium">Format:</dt>
                      <dd className="text-sm">Text</dd>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <dt className="text-sm font-medium">Language:</dt>
                      <dd className="text-sm capitalize">{book.language || 'English'}</dd>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Download className="w-4 h-4 text-gray-500" />
                      <dt className="text-sm font-medium">Downloads:</dt>
                      <dd className="text-sm">{book.downloadCount?.toLocaleString() || 'N/A'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Link href={`/dashboard/reading/${book.id}`} passHref>
            <Button>
              Read Now
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};