import { Card } from './ui/card'

interface UrlsViewProps {
  analysis: {
    urlCategories: {
      type: string
      urls: string[]
    }[]
  } | null
}

export function UrlsView({ analysis }: UrlsViewProps) {
  if (!analysis) {
    return <Card className="p-4">No analysis available.</Card>
  }

  const urlCategories = analysis.urlCategories

  if (!urlCategories?.length) {
    return <Card className="p-4">No URLs found in the conversation.</Card>
  }

  return (
    <div className="grid gap-6">
      {urlCategories.map((category) => (
        <Card key={category.type} className="overflow-hidden">
          <div className="bg-muted p-4 border-b">
            <h3 className="text-lg font-semibold capitalize">{category.type}</h3>
          </div>
          <div className="p-4 space-y-3">
            {category.urls.map((url, index) => (
              <div key={`${category.type}-${index}`} className="group">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="text-blue-500 group-hover:underline break-all">
                    {url}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {getFaviconUrl(url) && (
                      <img 
                        src={getFaviconUrl(url)} 
                        alt="" 
                        className="w-4 h-4 inline mr-2"
                      />
                    )}
                    {getDomainFromUrl(url)}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
  } catch {
    return ''
  }
}

function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}