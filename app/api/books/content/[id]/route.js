
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  const params = await context.params;
  const { id } = params;
  
  try {
    const metadataResponse = await fetch(`https://gutendex.com/books/${id}`);
    
    if (!metadataResponse.ok) {
      throw new Error(`Failed to fetch book metadata: ${metadataResponse.statusText}`);
    }
    
    const metadata = await metadataResponse.json();
    
    const title = metadata.title || 'Unknown Title';
    const author = metadata.authors && metadata.authors.length > 0 
      ? metadata.authors[0].name 
      : 'Unknown Author';
    const coverUrl = 
      metadata.formats['image/jpeg'] || 
      metadata.formats['image/png'] || 
      'https://via.placeholder.com/150?text=Book+Cover';
    const contentUrl = metadata.formats['text/plain; charset=us-ascii'] || 
                       `https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`;
    
    const contentResponse = await fetch(contentUrl);
    
    if (!contentResponse.ok) {
      throw new Error(`Failed to fetch book content: ${contentResponse.statusText}`);
    }
    
    const content = await contentResponse.text();
    
    const startMarker = "*** START OF THE PROJECT GUTENBERG EBOOK";
    const endMarker = "*** END OF THE PROJECT GUTENBERG EBOOK";
    
    let extractedContent = content;
    
    if (content.includes(startMarker)) {
      const startIndex = content.indexOf(startMarker);
      const endIndex = content.indexOf(endMarker);
      
      extractedContent = content.slice(
        content.indexOf("\n", startIndex) + 1,
        endIndex > -1 ? endIndex : undefined
      ).trim();
    }
    
    return NextResponse.json({ 
      id,
      title, 
      author,
      content: extractedContent,
      coverUrl,
      languages: metadata.languages,
      subjects: metadata.subjects,
      downloadCount: metadata.download_count
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json(
      { error: 'Failed to fetch book', details: error.message },
      { status: 500 }
    );
  }
}