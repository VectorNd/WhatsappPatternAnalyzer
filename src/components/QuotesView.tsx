import { Card } from './ui/card'

interface QuotesViewProps {
  analysis: {
    quotes: {
      text: string
      author: string
      context: string
    }[]
  }
}

export function QuotesView({ analysis }: QuotesViewProps) {
  const quotes = analysis.quotes


  if (!quotes.length) {
    return <Card className="p-4">No quotes found in the conversation.</Card>
  }

  return (
    <div className="grid gap-4">
      {quotes.map((quote, index) => (
        <Card key={index} className="p-4">
          <p className="italic">"{quote.text}"</p>
          <p className="text-sm text-muted-foreground">{quote.author}</p>
          <p className="text-sm text-muted-foreground">{quote.context}</p>
        </Card>
      ))}
    </div>
  )
} 