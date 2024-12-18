import { Card } from './ui/card'
interface ReflectionsViewProps {
  analysis: {
    personalReflections?: {
      text: string
      context: string
    }[]
  } | null
}

export function ReflectionsView({ analysis }: ReflectionsViewProps) {
  if (!analysis?.personalReflections?.length) {
    return <Card className="p-4">No reflections generated yet.</Card>
  }

  return (
    <div className="grid gap-4">
      {analysis.personalReflections.map((reflection, index) => (
        <Card key={index} className="p-4">
          <p className="mb-2">{reflection.text}</p>
          <p className="text-sm text-muted-foreground">{reflection.context}</p>
        </Card>
      ))}
    </div>
  )
} 