# WhatsApp Pattern Analyzer

A web application that analyzes WhatsApp chat exports to discover patterns, themes, emotional trends, and insights from your conversations.

### Project Demo 
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

## Export Chat 

- Open the Chat : Go to the individual or group chat you want to export.
- Tap on Menu (Three Dots) : Located in the top-right corner.
- Select "More" : From the dropdown menu, choose More.
- Choose "Export Chat" : You’ll be asked whether to include media (like images, videos) or not.
- If you select Without Media, only the text will be exported in .txt format.
- Select the Export Method : You can email it to yourself, save it to a cloud service, or send it to another app.
- Save or Share : A .txt file containing the chat history will be generated and shared via the chosen method.
- Attach that .txt file in the drop or upload functionality in the website 

## Privacy

All chat processing is done locally in your browser. No chat data is stored on any server or sent anywhere except to the Groq AI API for pattern analysis.



