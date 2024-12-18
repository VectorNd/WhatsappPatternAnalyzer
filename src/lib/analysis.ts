import { Message } from '@/lib/types'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true
})

export async function analyzePatterns(messages: Message[]) {
  const content = messages.map(m => m.content).join('\n')
  console.log("content")
  console.log(content)

  const chatResponse = await groq.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [{
      role: "system",
      content: `Analyze the following WhatsApp chat messages and return the analysis in this exact JSON format:
      {
        "mainThemes": [
          {
            "category": "string",
            "messages": [
              {
                "timestamp": "string",
                "content": "string (include full message with any URLs)"
              }
            ]
          }
        ],
        "urlCategories": [
          {
            "type": "string",
            "urls": ["string"]
          }
        ],
        "quotes": [
          {
            "text": "string",
            "author": "string",
            "context": "string"
          }
        ],
        "personalReflections": [
          {
            "text": "string",
            "context": "string"
          }
        ],
        "readingLists": [["string"]],
        "sentiment": {
          "timestamps": ["string"],
          "sentiment": [number],
          "topics": ["string"]
        },
      }

      Ensure that:
      1. Main themes/topics should:
         - Group related messages under specific categories (productivity habits , startup ideas,
         product design, UX/UI design, Focus and motivation, etc.)
         - Include complete message content with any URLs
      2. URLs are grouped by their type (design pattern, tech stack research, thread , focus music, 
      article, design inspiration, etc.)
      3. Quotes include the text, author, and context
      4. Personal reflections capture thoughts and insights with context
      5. Reading lists are grouped in arrays
      6. Sentiment analysis should include timestamps, sentiment scores, and topics`
    }, {
      role: "user",
      content: content
    }]
  });

  console.log("response")
  console.log(chatResponse)

  const result = chatResponse.choices?.[0]?.message.content;

  console.log("result")
  console.log(result)

  if (!result) {
    throw new Error('No response from Mistral')
  }

  const jsonMatch = result.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonContent = jsonMatch ? jsonMatch[1] : result;

  try {
    const res = JSON.parse(jsonContent.trim());
    console.log("res")
    console.log(res)
    return res
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    throw new Error('Invalid JSON response');
  }
}

export async function analyzeEmotionalPatterns(messages: Message[]) {
  const content = messages.map(m => m.content).join('\n')

  const chatResponse = await groq.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [{
      role: "system",
      content: `Analyze the emotional patterns in these WhatsApp messages. For each message, determine:
      1. The emotional mood (must be one of: 'music', 'study', 'motivational', 'enjoying', 'neutral')
      2. An emotional score (0-1)
      3. What triggered this mood
      
      Return the analysis in this exact JSON format:
      {
        "overall": number (0-1),
        "trends": [
          {
            "timestamp": "string (exact message timestamp)",
            "score": number (0-1),
            "mood": "string (one of the specified moods)",
            "trigger": "string (what caused this mood)",
            "annotation": "string (the actual message content)"
          }
        ]
      }`
    }, {
      role: "user",
      content: content
    }]
  });

  const result = chatResponse.choices?.[0]?.message.content;
  
  if (!result) {
    throw new Error('No response from Mistral')
  }

  const jsonMatch = result.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonContent = jsonMatch ? jsonMatch[1] : result;

  try {
    return JSON.parse(jsonContent.trim());
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    throw new Error('Invalid JSON response');
  }
}

export async function analyzeWordFrequency(messages: Message[]) {
  const content = messages.map(m => m.content).join('\n')

  const chatResponse = await groq.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [{
      role: "system",
      content: `Analyze the frequency of meaningful words and phrases in these messages. 
      Ignore common stop words (the, a, an, etc.) and focus on significant terms.
      Return the analysis in this JSON format:
      {
        "words": [
          {
            "text": "string (the word or short phrase)",
            "value": "number (frequency count)",
            "category": "string (topic category)"
          }
        ]
      }
      
      Include only words that appear at least twice.
      Limit to the top 50 most frequent meaningful terms.`
    }, {
      role: "user",
      content: content
    }]
  });

  const result = chatResponse.choices?.[0]?.message.content;
  
  if (!result) {
    throw new Error('No response from Mistral')
  }

  const jsonMatch = result.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonContent = jsonMatch ? jsonMatch[1] : result;

  try {
    const res = JSON.parse(jsonContent.trim());
    console.log("res")
    console.log(res)
    return res
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    throw new Error('Invalid JSON response');
  }
}

// interface UrlCategory {
//   category: string;
//   urls: string[];
// }

// export async function extractUrls(messages: Message[]) {
//   const analysisResult = await analyzePatterns(messages);
//   return analysisResult.url_categories.reduce((acc: Record<string, string[]>, category: UrlCategory) => {
//     acc[category.category] = category.urls;
//     return acc;
//   }, {});
// }

// export function extractQuotes(messages: Message[]) {
//   const quoteRegex = /"([^"]+)"/g
//   const quotes: string[] = []

//   messages.forEach(message => {
//     const matches = message.content.match(quoteRegex)
//     if (matches) quotes.push(...matches)
//   })

//   return quotes
// } 