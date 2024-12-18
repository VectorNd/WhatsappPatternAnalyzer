import { format, parseISO, isWithinInterval } from 'date-fns'

export function prepareTimelineData(themes: any[]) {
  const timeData: Record<string, number> = {}
  
  themes.forEach(theme => {
    theme.messages.forEach((msg: any) => {
      const parsedDate = parseISO(msg.timestamp)
      if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
        const date = format(parsedDate, 'MMM dd')
        timeData[date] = (timeData[date] || 0) + 1
      }
    })
  })

  return {
    labels: Object.keys(timeData),
    datasets: [{
      label: 'Activity',
      data: Object.values(timeData),
      borderColor: 'rgb(147, 51, 234)',
      backgroundColor: 'rgba(147, 51, 234, 0.5)',
      tension: 0.3
    }]
  }
}

export function prepareCategoryData(themes: any[]) {
  const categories = themes.map(t => t.category)
  const counts = themes.map(t => t.messages.length)

  return {
    labels: categories,
    datasets: [{
      data: counts,
      backgroundColor: [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))',
        'hsl(var(--chart-4))',
        'hsl(var(--chart-5))'
      ]
    }]
  }
}

export function prepareUrlTypeData(urlCategories: any[]) {
  return {
    labels: urlCategories.map(c => c.type),
    datasets: [{
      label: 'URLs per category',
      data: urlCategories.map(c => c.urls.length),
      backgroundColor: 'hsl(var(--chart-2))'
    }]
  }
}

export function filterAnalysisData(analysis: any, theme: string) {
  if (!analysis) return null

  let filteredData = { ...analysis }

  // // Apply date range filter
  // if (theme !== 'all') {
  //   filteredData.mainThemes = filteredData.mainThemes.map((theme: any) => ({
  //     ...theme,
  //     messages: theme.messages.filter((msg: any) => {
  //       return msg.category === theme
  //     })
  //   }))
  // }

  // Apply theme filter
  if (theme !== 'all') {
    filteredData.mainThemes = filteredData.mainThemes.filter((t: any) => t.category === theme)
  }

  return filteredData
}

export function prepareNetworkData(themes: any[]) {
  const nodes: any[] = []
  const links: any[] = []
  const themeMap = new Map()

  // Create nodes for themes
  themes.forEach(theme => {
    nodes.push({
      id: theme.category,
      group: 'theme',
      value: theme.messages.length
    })
    themeMap.set(theme.category, theme.messages)
  })

  // Create links between related themes
  themes.forEach(theme1 => {
    themes.forEach(theme2 => {
      if (theme1.category !== theme2.category) {
        const relationship = calculateThemeRelationship(
          themeMap.get(theme1.category),
          themeMap.get(theme2.category)
        )
        if (relationship > 0) {
          links.push({
            source: theme1.category,
            target: theme2.category,
            value: relationship
          })
        }
      }
    })
  })

  return { nodes, links }
}

function calculateThemeRelationship(messages1: any[], messages2: any[]) {
  // Implement your relationship logic here
  // This could be based on:
  // - Common keywords
  // - Temporal proximity
  // - Shared URLs
  // - Similar sentiment
  // Returns a value between 0 and 1
  return 0.5 // Placeholder
} 