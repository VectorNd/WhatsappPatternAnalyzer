import { Pie, Bar } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { prepareCategoryData, prepareUrlTypeData } from '../../lib/chartHelpers'

interface DistributionViewProps {
  data: any
}

export function DistributionView({ data }: DistributionViewProps) {
  const chartColors = {
    primary: [
      '#ef4444', '#10b981', '#3b82f6', '#374151',
      '#f87171', '#34d399', '#60a5fa', '#4b5563',
    ]
  }

  const categoryData = {
    ...prepareCategoryData(data.mainThemes),
    datasets: [{
      ...prepareCategoryData(data.mainThemes).datasets[0],
      backgroundColor: chartColors.primary,
      borderWidth: 1,
      borderColor: '#ffffff',
      hoverOffset: 4
    }]
  }

  const urlData = {
    ...prepareUrlTypeData(data.urlCategories),
    datasets: [{
      ...prepareUrlTypeData(data.urlCategories).datasets[0],
      backgroundColor: chartColors.primary,
      borderWidth: 1,
      borderColor: '#ffffff',
      hoverOffset: 4
    }]
  }

  const commonChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          padding: 16,
          usePointStyle: true,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(51, 51, 51, 0.9)',
        titleFont: {
          size: 13,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 12
        },
        padding: 10,
        displayColors: true
      }
    }
  }

  return (
    <div className="grid gap-6 grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Themes Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <Pie 
            data={categoryData} 
            options={{
              ...commonChartOptions,
              maintainAspectRatio: false
            }} 
          />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>URLs by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <Bar 
            data={urlData}
            options={{
              ...commonChartOptions,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    display: false
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
} 