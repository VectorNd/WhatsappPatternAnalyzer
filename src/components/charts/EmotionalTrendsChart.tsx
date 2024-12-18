import { Line } from 'react-chartjs-2'
import { Music, Brain, Rocket, PartyPopper, Coffee } from 'lucide-react'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../ui/tooltip'

const moodIcons = {
  music: Music,
  study: Brain,
  motivational: Rocket,
  enjoying: PartyPopper,
  neutral: Coffee,
}

const moodColors = {
  music: '#8b5cf6',
  study: '#3b82f6',
  motivational: '#f59e0b',
  enjoying: '#10b981',
  neutral: '#6b7280',
}

interface EmotionalTrend {
  timestamp: string
  score: number
  mood: keyof typeof moodIcons
  trigger: string
  annotation: string
}

interface EmotionalTrendsChartProps {
  trends: EmotionalTrend[]
}

export function EmotionalTrendsChart({ trends }: EmotionalTrendsChartProps) {
  const data = {
    labels: trends.map(t => {
      const date = new Date(t.timestamp)
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }),
    datasets: [{
      label: 'Emotional Flow',
      data: trends.map(t => t.score),
      borderColor: trends.map(t => moodColors[t.mood]),
      backgroundColor: trends.map(t => `${moodColors[t.mood]}33`),
      fill: true,
      tension: 0.4,
      pointBackgroundColor: trends.map(t => moodColors[t.mood]),
      pointRadius: 6,
      pointHoverRadius: 8,
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const trend = trends[context.dataIndex]
            return [
              `Mood: ${trend.mood}`,
              `Message: ${trend.annotation}`,
              `Trigger: ${trend.trigger}`
            ]
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        max: 1,
      }
    }
  }

  return (
    <div className="relative">
      <Line data={data} options={options} />
      
      {/* Mood Icons Legend */}
      <div className="absolute top-4 right-4 flex gap-2">
        <TooltipProvider>
          {Object.entries(moodIcons).map(([mood, Icon]) => (
            <Tooltip key={mood}>
              <TooltipTrigger>
                <div 
                  className="p-2 rounded-full" 
                  style={{ backgroundColor: `${moodColors[mood as keyof typeof moodIcons]}33` }}
                >
                  <Icon 
                    className="w-4 h-4"
                    style={{ color: moodColors[mood as keyof typeof moodIcons] }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {mood}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      {/* Message Timeline */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {trends.map((trend, i) => {
          const Icon = moodIcons[trend.mood]
          return (
            <div key={i} className="flex items-center gap-2 text-sm">
              <Icon className="w-4 h-4" style={{ color: moodColors[trend.mood] }} />
              <span className="font-medium">{new Date(trend.timestamp).toLocaleTimeString()}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
} 