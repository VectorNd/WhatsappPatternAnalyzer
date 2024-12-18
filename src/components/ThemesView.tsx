import { Card } from './ui/card'

interface ThemesViewProps {
  analysis: {
    mainThemes?: {
      category: string 
      messages: {
        timestamp: string
        content: string
      }[]
    }[]
  } | null
}


export function ThemesView({ analysis }: ThemesViewProps) {
  console.log("analysis")
  console.log(analysis)

  if (!analysis?.mainThemes?.length) {
    return <Card className="p-4">No common themes found in the conversation.</Card>
  }

  return (
    <div className="grid gap-4">
    {analysis.mainThemes.map((theme, index) => (
        <Card key={index} className="p-4">
          <h3 className="text-lg font-semibold mb-2">{theme.category}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Mentioned {theme.messages.length} times
          </p>
          <div className="space-y-2">
            {theme.messages.slice(0, 3).map((message, i) => (
              <div key={i} className="text-sm">
                <span className="text-muted-foreground">{message.timestamp}</span>
                <p>"{message.content}"</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
} 