'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookAnalysis } from '@/components/BookAnalysis';

export const SearchDialog = ({ searchResult, searchQuery, onClose, onReadBook }) => {
  return (
    <Dialog open={!!searchResult} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {searchResult?.error ? 'Book Not Found' : 'Book Details'}
          </DialogTitle>
        </DialogHeader>

        {searchResult?.error ? (
          <div className="text-center py-4">
            <p>No book found with ID: {searchQuery}</p>
          </div>
        ) : (
          searchResult && (
            <div className="flex flex-col gap-4">
              {searchResult.cover_url && (
                <img
                  src={searchResult.cover_url}
                  alt={searchResult.title}
                  className="w-32 h-auto mx-auto"
                />
              )}
              <div>
                <h3 className="font-semibold">{searchResult.title}</h3>
                <p className="text-sm text-gray-600">by {searchResult.author}</p>
                <p className="text-sm text-gray-500">
                  Downloads: {searchResult.download_count}
                </p>
              </div>
              <Button
                onClick={onReadBook}
                className="bg-black text-white hover:bg-gray-700 transition-colors"
              >
                Read Book
              </Button>

              <BookAnalysis bookContent={searchResult.content} />
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};