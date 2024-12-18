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
        }
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
      5. Reading lists are grouped in arrays`
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