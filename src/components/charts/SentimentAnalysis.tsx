import { Line } from 'react-chartjs-2'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

interface SentimentAnalysisProps {
  data: {
    timestamps: string[]
    sentiment: number[]
    topics: string[]
  }
}

export function SentimentAnalysis({ data }: SentimentAnalysisProps) {
  if (!data || !data.timestamps || !data.sentiment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Analysis Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div>No sentiment data available</div>
        </CardContent>
      </Card>
    )
  }

  const chartData = {
    labels: data.timestamps,
    datasets: [{
      label: 'Sentiment Score',
      data: data.sentiment,
      borderColor: 'hsl(var(--chart-1))',
      backgroundColor: 'hsla(var(--chart-1), 0.1)',
      fill: true,
      tension: 0.4
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const topic = data.topics[context.dataIndex]
            const sentiment = context.raw
            let mood = 'Neutral'
            if (sentiment > 0.3) mood = 'Positive'
            if (sentiment < -0.3) mood = 'Negative'
            return `${mood} (${sentiment.toFixed(2)}) - ${topic}`
          }
        }
      }
    },
    scales: {
      y: {
        min: -1,
        max: 1,
        title: {
          display: true,
          text: 'Sentiment Score'
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={chartData} options={options} />
      </CardContent>
    </Card>
  )
} 