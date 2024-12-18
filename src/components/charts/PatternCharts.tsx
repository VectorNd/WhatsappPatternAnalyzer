import { useState, useMemo } from 'react'
import { Line, Pie, Bar, Bubble } from 'react-chartjs-2'
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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
// import { NetworkGraph } from './NetworkGraph'
import { SentimentAnalysis } from './SentimentAnalysis'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Button } from '../ui/button' 
import { Calendar, Filter, TrendingUp } from 'lucide-react'
import { prepareTimelineData, prepareCategoryData, prepareUrlTypeData, filterAnalysisData, prepareNetworkData } from '../../lib/chartHelpers'
import { timelineOptions, pieOptions, barOptions } from '../../lib/chartConfig'
import Chart from 'chart.js/auto';

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
  const [selectedTheme, setSelectedTheme] = useState<string>('all')
  const [viewType, setViewType] = useState<'timeline' | 'distribution' | 'network' | 'sentiment'>('timeline')

  const filteredData = useMemo(() => filterAnalysisData(analysis, selectedTheme), 
    [analysis, selectedTheme])

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex items-center justify-between gap-4">
          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by theme" />
            </SelectTrigger>
            <SelectContent>
              {getThemeOptions(analysis).map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button
              variant={viewType === 'timeline' ? 'default' : 'outline'}
              onClick={() => setViewType('timeline')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Timeline
            </Button>
            <Button
              variant={viewType === 'distribution' ? 'default' : 'outline'}
              onClick={() => setViewType('distribution')}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Distribution
            </Button>
            <Button
              variant={viewType === 'sentiment' ? 'default' : 'outline'}
              onClick={() => setViewType('sentiment')}
            >
              <Filter className="w-4 h-4 mr-2" />
              Sentiment
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        {viewType === 'timeline' && (
          <TimelineView data={filteredData} />
        )}
        {viewType === 'distribution' && (
          <DistributionView data={filteredData} />
        )}
        {viewType === 'sentiment' && (
          <SentimentView data={filteredData} />
        )}
      </div>
    </div>
  )
}

function TimelineView({ data }: { data: any }) {
  const [selectedTimePoint, setSelectedTimePoint] = useState<string | null>(null);

  const timelineData = useMemo(() => {
    // Group messages by timestamp and count them
    const messagesByTime = data.messages?.reduce((acc: any, message: any) => {
      const timestamp = new Date(message.timestamp).toISOString().split('T')[0];
      acc[timestamp] = (acc[timestamp] || 0) + 1;
      return acc;
    }, {}) || {};

    return {
      labels: Object.keys(messagesByTime),
      datasets: [{
        label: 'Number of Messages',
        data: Object.values(messagesByTime),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
  }, [data]);

  const options = {
    ...timelineOptions,
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedTimePoint(timelineData.labels[index]);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Activity Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={timelineData} options={options} />
        {selectedTimePoint && (
          <ScrollArea className="mt-4 h-48">
            <div className="space-y-2">
              {data.messages?.filter((msg: any) => 
                new Date(msg.timestamp).toISOString().split('T')[0] === selectedTimePoint
              ).map((msg: any, i: number) => (
                <div key={i} className="p-2 border rounded">
                  <div className="text-sm text-gray-500">{new Date(msg.timestamp).toLocaleString()}</div>
                  <div>{msg.content}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

function DistributionView({ data }: { data: any }) {
  const categoryData = prepareCategoryData(data.mainThemes)
  const urlData = prepareUrlTypeData(data.urlCategories)
  return (
    <div className="grid gap-6 grid-cols-2">
      <Card>
        <CardContent>
          <Pie data={categoryData} options={pieOptions} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Bar data={urlData} options={barOptions} />
        </CardContent>
      </Card>
    </div>
  )
}

// function NetworkView({ data }: { data: any }) {
//   const networkData = prepareNetworkData(data.mainThemes)
//   return <NetworkGraph data={networkData} />
// }

function SentimentView({ data }: { data: any }) {
  return <SentimentAnalysis data={data.sentiment} />
}

function getThemeOptions(analysis: any) {
  if (!analysis?.mainThemes) return []
  return [
    { value: 'all', label: 'All Themes' },
    ...analysis.mainThemes.map((theme: any) => ({
      value: theme.category,
      label: theme.category
    }))
  ]
} 