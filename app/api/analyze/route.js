// app/api/analyze/route.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { text, analysisType } = await request.json();

  try {
    let prompt;
    switch (analysisType) {
      case 'characters':
        prompt = `Identify the key characters in the following book text and provide a brief description of each (limit to 5 characters):\n\n${text}`;
        break;
      case 'summary':
        prompt = `Generate a concise 3-5 sentence summary of the following book text:\n\n${text}`;
        break;
      case 'sentiment':
        prompt = `Analyze the sentiment of the following book text and determine if it is positive, negative, or neutral:\n\n${text}`;
        break;
      case 'themes':
        prompt = `Identify 2-3 major themes in the following book text:\n\n${text}`;
        break;
      default:
        return new Response(JSON.stringify({ error: 'Invalid analysis type' }), {
          status: 400,
        });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that analyzes book text.',
        },
        { role: 'user', content: prompt },
      ],
    });

    return new Response(
      JSON.stringify({ result: completion.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error('OpenAI API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to analyze text' }), {
      status: 500,
    });
  }
}