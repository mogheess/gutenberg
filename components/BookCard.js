import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export const BookCard = ({ book, onSelect }) => {
// console.log(book)
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={book.cover_url}
          alt={`Cover of ${book.title}`}
          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">by {book.author}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{book.description}</p>
        
        <div className="flex justify-between items-center">
          <Button 
            onClick={onSelect}
            className="w-full flex items-center justify-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Read Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};