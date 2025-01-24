import { createClient } from '@supabase/supabase-js'
// console.log('Supabase file loaded');

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function storeBook(bookData) {
  const { data, error } = await supabase
    .from('books')
    .upsert({
      id: bookData.id,
      title: bookData.title || 'Unknown Title',
      author: bookData.author || 'Unknown Author',
      content: bookData.content || 'Cant find the content', 
      cover_url: bookData.coverUrl || '',
      language: bookData.language || 'en',
      download_count: bookData.downloadCount || 0
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
export async function getBook(id) {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') throw error; 
  return data;
}

export async function toggleBookmark(bookId) {
  console.log('Toggling bookmark for book ID:', bookId);
  const { data: existing } = await supabase
    .from('bookmarks')
    .select()
    .eq('book_id', bookId)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('book_id', bookId);
    
    if (error) throw error;
    return false;
  } else {
    const { error } = await supabase
      .from('bookmarks')
      .insert({ book_id: bookId });
    
    if (error) throw error;
    return true;
  }
}

export async function getBookmarks() {
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`
      book_id,
      bookmarked_at,
      books (
        id,
        title,
        author,
        cover_url,
        language,
        download_count
      )
    `)
    .order('bookmarked_at', { ascending: false });

  if (error) throw error;
  return data.map(bookmark => ({
    ...bookmark.books,
    bookmarkedAt: bookmark.bookmarked_at
  }));
}


export async function isBookmarked(bookId) {
  const { data, error } = await supabase
    .from('bookmarks')
    .select()
    .eq('book_id', bookId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
}