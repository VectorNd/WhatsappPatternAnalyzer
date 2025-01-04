# WhatsApp Pattern Analyzer

A web application that analyzes WhatsApp chat exports to discover patterns, themes, emotional trends, and insights from your conversations.

###Project Demo 
https://www.loom.com/share/38ec30e7232e45d38ef259a4c71e6045?sid=f155b429-57aa-4b6a-990c-d8b3607d41df

## Features

- 📊 Pattern Recognition: Discover recurring themes and topics in conversations
- 📈 Visual Analytics: Interactive charts and visualizations
- 🎯 Instant Analysis: Real-time processing of chat data
- 🔍 Advanced Analysis:
  - Emotional flow tracking
  - Word frequency analysis
  - Sentiment analysis
  - Theme categorization
  - URL categorization
  - Quote extraction
  - Reading list compilation

## Tech Stack

- Next.js 15.1
- React 18
- TypeScript
- Tailwind CSS
- Chart.js
- D3.js
- Groq AI API
- Zustand (State Management)
- Radix UI Components
- Shadcn/ui

## Prerequisites

- Node.js 18+ 
- npm or yarn
- A Groq API key (optional)

## Setup

1. Clone the repository
```bash 
git clone https://github.com/VectorNd/WhatsappPatternAnalyzer.git
cd WhatsappPatternAnalyzer
```
2. Install dependencies: 
``` bash 
npm install 
```
3. [Optional] - Set up your Groq API key in the `.env` file
4. Run the development server: 
``` bash 
npm run dev 
```
5. Open [http://localhost:3000](http://localhost:3000) in your browser


## Privacy

All chat processing is done locally in your browser. No chat data is stored on any server or sent anywhere except to the Groq AI API for pattern analysis.



