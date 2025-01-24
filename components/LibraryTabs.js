import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, History, Library } from "lucide-react";
import { BookGrid } from "./BookGrid";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";

export const LibraryTabs = ({ loading, books, bookmarks, readingHistory, sortBy }) => {
  return (
    <Tabs defaultValue="library" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="library" className="flex items-center">
          <Library className="mr-2 h-4 w-4" />
          Library
        </TabsTrigger>
        <TabsTrigger value="reading" className="flex items-center">
          <BookOpen className="mr-2 h-4 w-4" />
          Bookmarks
        </TabsTrigger>

      </TabsList>

      <TabsContent value="library">
        {loading && !books.length ? (
          <LoadingState />
        ) : (
          <BookGrid books={books} sortBy={sortBy} />
        )}
      </TabsContent>

      <TabsContent value="reading">
        {bookmarks.length > 0 ? (
          <BookGrid books={bookmarks} sortBy={sortBy} />
        ) : (
          <EmptyState 
            icon={BookOpen}
            title="No books bookmarked"
            description="Books you bookmark will appear here for quick access"
          />
        )}
      </TabsContent>
    </Tabs>
  );
};
