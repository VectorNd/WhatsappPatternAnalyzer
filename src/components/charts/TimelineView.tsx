import { useState, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

interface TimelineViewProps {
  data: any
}

export function TimelineView({ data }: TimelineViewProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const timelineData = useMemo(() => {
    const themeCounts = data.mainThemes.reduce((acc: Record<string, Record<string, number>>, theme: any) => {
      theme.messages.forEach((msg: any) => {
        const date = new Date(msg.timestamp).toISOString().split('T')[0];
        if (!acc[theme.category]) acc[theme.category] = {};
        acc[theme.category][date] = (acc[theme.category][date] || 0) + 1;
      });
      return acc;
    }, {});

    const themeToShow = selectedTheme || Object.keys(themeCounts)[0];
    
    const datasets = [{
      label: themeToShow,
      data: Object.values(themeCounts[themeToShow] as Record<string, number>),
      borderColor: `hsl(${Math.random() * 360 % 360}, 90%, 60%)`,
      backgroundColor: `rgba(255, 255, 255, 0.2)`,
      fill: true
    }];

    return {
      labels: Object.keys(themeCounts[themeToShow]),
      datasets
    };
  }, [data, selectedTheme]);

  const themes = useMemo(() => 
    data.mainThemes.map((theme: any) => theme.category),
    [data]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Message Count by Theme</CardTitle>
        <div className="flex gap-2 flex-wrap">
          {themes.map((theme: string) => (
            <Button
              key={theme}
              variant={selectedTheme === theme ? 'default' : 'outline'}
              onClick={() => setSelectedTheme(theme)}
              className="font-medium"
            >
              {theme}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-[600px]">
        <Line 
          data={timelineData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { 
                display: true,
                labels: {
                  font: {
                    size: 14,
                    weight: 500
                  }
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 12,
                    weight: 500
                  }
                }
              },
              y: {
                ticks: {
                  font: {
                    size: 12,
                    weight: 500
                  }
                }
              }
            }
          }} 
        />
      </CardContent>
    </Card>
  );
} 