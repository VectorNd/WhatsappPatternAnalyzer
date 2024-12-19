import { useState} from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  Filler,
} from 'chart.js'
import { Card} from './ui/card'
import { Button } from './ui/button' 
import { Filter, TrendingUp } from 'lucide-react'
import Chart from 'chart.js/auto';
import { SentimentAnalysis } from './charts/SentimentAnalysis'
import { DistributionView } from './charts/DistributionView'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

// Register the Filler plugin
Chart.register(Filler);

interface PatternChartsProps {
  analysis: any
}

export function PatternCharts({ analysis }: PatternChartsProps) {
  const [viewType, setViewType] = useState<'distribution' | 'sentiment'>('distribution')

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex items-center justify-center">
          <div className="inline-flex rounded-lg border p-1">
            <Button
              variant={viewType === 'distribution' ? 'default' : 'ghost'}
              onClick={() => setViewType('distribution')}
              className="rounded-sm px-3"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Distribution
            </Button>
            <Button
              variant={viewType === 'sentiment' ? 'default' : 'ghost'}
              onClick={() => setViewType('sentiment')}
              className="rounded-sm px-3"
            >
              <Filter className="w-4 h-4 mr-2" />
              Sentiment
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        {viewType === 'distribution' && <DistributionView data={analysis} />}
        {viewType === 'sentiment' && <SentimentView data={analysis} />}
      </div>
    </div>
  )
}

function SentimentView({ data }: { data: any }) {
  return <SentimentAnalysis data={data.sentiment} />
}
 