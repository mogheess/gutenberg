import { supabase } from './supabase';

const INITIAL_BOOKS = [
  {
    id: '1342',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover_url: 'https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg',
    language: 'en',
    download_count: 52979
  },
  {
    id: '11',
    title: "Alice's Adventures in Wonderland",
    author: 'Lewis Carroll',
    cover_url: 'https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg',
    language: 'en',
    download_count: 48931
  },
  {
    id: '84',
    title: 'Frankenstein',
    author: 'Mary Wollstonecraft Shelley',
    cover_url: 'https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg',
    language: 'en',
    download_count: 47912
  },
  {
    id: '2701',
    title: 'Moby Dick',
    author: 'Herman Melville',
    cover_url: 'https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg',
    language: 'en',
    download_count: 41756
  }
];

export async function seedInitialBooks() {
  const { data: existingBooks, error: checkError } = await supabase
    .from('books')
    .select('id');

  if (checkError) {
    console.error('Error checking existing books:', checkError);
    return;
  }

  if (existingBooks.length === 0) {
    const { error: insertError } = await supabase
      .from('books')
      .insert(INITIAL_BOOKS);

    if (insertError) {
      console.error('Error seeding books:', insertError);
      return;
    }

    console.log('Successfully seeded initial books');
  }
}