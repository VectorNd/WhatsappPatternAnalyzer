'use client'

import { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { usePatternStore } from '../lib/store'
import { analyzePatterns} from '../lib/analysis'
import { ThemesView } from './ThemesView'
import { UrlsView } from './UrlsView'
import { QuotesView } from './QuotesView'
import { ReflectionsView } from './ReflectionsView'
import { ReadingListView } from './ReadingList'
import { PatternCharts } from './charts/PatternCharts'

interface Analysis {
  mainThemes: {
    category: string;
    messages: { timestamp: string; content: string; }[];
  }[];
  urlCategories: {
    type: string;
    urls: string[];
  }[];
  quotes: { text: string; author: string; context: string;}[];
  personalReflections: { text: string; context: string; }[];
  readingLists: string[][];
}

export function PatternDisplay() {
  const { messages } = usePatternStore()
  const [analysis, setAnalysis] = useState<Analysis>({
    mainThemes: [],
    urlCategories: [],
    quotes: [],
    personalReflections: [],
    readingLists: []
  })
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    if (messages.length > 0) {
      setLoading(true)
      setTimeout(() => setIsVisible(true), 100)
      
      analyzePatterns(messages)
        .then(setAnalysis)
        .finally(() => setLoading(false))
    }
  }, [messages])

  if (!messages.length) return null

  return (
    <div className={`transition-all duration-500 transform
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <Tabs defaultValue="themes" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="urls">URLs</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="reflections">Reflections</TabsTrigger>
          <TabsTrigger value="reading">Reading List</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          {loading ? (
            <Card className="p-8 text-center">Analyzing patterns...</Card>
          ) : (
            <>
              <TabsContent value="themes">
                <ThemesView analysis={analysis} />
              </TabsContent>
              <TabsContent value="urls">
                <UrlsView analysis={analysis} />
              </TabsContent>
              <TabsContent value="quotes">
                <QuotesView analysis={analysis} />
              </TabsContent>
              <TabsContent value="reflections">
                <ReflectionsView analysis={analysis} />
              </TabsContent>
              <TabsContent value="reading">
                <ReadingListView analysis={analysis} />
              </TabsContent>
              <TabsContent value="charts">
                <PatternCharts analysis={analysis} />
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
    </div>
  )
} 