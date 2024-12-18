import { useEffect, useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { EmotionalTrendsChart } from './charts/EmotionalTrendsChart'
import { WordCloudChart } from './charts/WordCloudChart'
import { analyzeEmotionalPatterns, analyzeWordFrequency } from '../lib/analysis'
import { usePatternStore } from '../lib/store'

export function AdvancedPatterns() {
  const { messages } = usePatternStore()
  const [emotionalTrends, setEmotionalTrends] = useState<any>(null)
  const [wordFrequency, setWordFrequency] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (messages.length > 0) {
      setLoading(true)
      Promise.all([
        analyzeEmotionalPatterns(messages),
        analyzeWordFrequency(messages)
      ])
        .then(([emotionalData, wordData]) => {
          setEmotionalTrends(emotionalData)
          setWordFrequency(wordData)
        })
        .finally(() => setLoading(false))
    }
  }, [messages])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analyzing Advanced Patterns...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (!emotionalTrends || !wordFrequency) return null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Emotional Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <EmotionalTrendsChart trends={emotionalTrends.trends} />
        </CardContent>
      </Card>

      <WordCloudChart words={wordFrequency.words} />
    </div>
  )
}