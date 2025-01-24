import { useRouter } from 'next/navigation';
import { BookCard } from '@/components/BookCard';

export const BookGrid = ({ books, sortBy }) => {
  const router = useRouter();
  
  const sortBooks = (books) => {
    return [...books].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'popular':
          return b.downloadCount - a.downloadCount;
        default:
          return 0;
      }
    });
  };

  const handleReadBook = (book) => {
    router.push(`/dashboard/reading/${book.id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {sortBooks(books).map(book => (
        <BookCard 
          key={book.id} 
          book={book} 
          onSelect={() => handleReadBook(book)}
        />
      ))}
    </div>
  );
};
