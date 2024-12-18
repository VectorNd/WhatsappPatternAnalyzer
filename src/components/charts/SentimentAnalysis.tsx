import { Line } from 'react-chartjs-2'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

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
      <Card className="shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sentiment Analysis Over Time</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px] text-muted-foreground">
          <div>No sentiment data available</div>
        </CardContent>
      </Card>
    )
  }

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment > 0.3) return <TrendingUp className="inline w-4 h-4 text-green-500" />
    if (sentiment < -0.3) return <TrendingDown className="inline w-4 h-4 text-red-500" />
    return <Minus className="inline w-4 h-4 text-yellow-500" />
  }

  const chartData = {
    labels: data.timestamps,
    datasets: [{
      label: 'Sentiment Score',
      data: data.sentiment,
      borderColor: data.sentiment.map(s => 
        s > 0.3 ? 'rgb(34, 197, 94)' : // green-500
        s < -0.3 ? 'rgb(239, 68, 68)' : // red-500
        'rgb(234, 179, 8)' // yellow-500
      ),
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        const value = data.sentiment[context.dataIndex];
        if (value > 0) {
          gradient.addColorStop(0, 'rgba(34, 197, 94, 0.1)');
          gradient.addColorStop(1, 'rgba(34, 197, 94, 0.02)');
        } else {
          gradient.addColorStop(0, 'rgba(239, 68, 68, 0.1)');
          gradient.addColorStop(1, 'rgba(239, 68, 68, 0.02)');
        }
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointBackgroundColor: data.sentiment.map(s => 
        s > 0.3 ? 'rgb(34, 197, 94)' : 
        s < -0.3 ? 'rgb(239, 68, 68)' : 
        'rgb(234, 179, 8)'
      ),
      segment: {
        borderColor: (ctx: any) => {
          const value = data.sentiment[ctx.p1DataIndex];
          return value > 0.3 ? 'rgb(34, 197, 94)' : 
                 value < -0.3 ? 'rgb(239, 68, 68)' : 
                 'rgb(234, 179, 8)';
        }
      }
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
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
        },
        backgroundColor: 'hsl(var(--card))',
        titleColor: 'hsl(var(--foreground))',
        bodyColor: 'hsl(var(--foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        padding: 12,
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
    <Card className="shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          Sentiment Analysis Over Time
          <div className="flex gap-2 ml-auto">
            <span className="flex items-center text-sm gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" /> Positive
            </span>
            <span className="flex items-center text-sm gap-1">
              <Minus className="w-4 h-4 text-yellow-500" /> Neutral
            </span>
            <span className="flex items-center text-sm gap-1">
              <TrendingDown className="w-4 h-4 text-red-500" /> Negative
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <Line data={chartData} options={options} />
      </CardContent>
    </Card>
  )
} 