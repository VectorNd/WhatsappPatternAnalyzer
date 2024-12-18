import { Card } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { Book } from 'lucide-react'

interface ReadingListViewProps {
  analysis: {
    readingLists: string[][]
  } | null
}

export function ReadingListView({ analysis }: ReadingListViewProps) {
  if (!analysis?.readingLists?.length) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        No reading lists found in the conversation.
      </Card>
    )
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="grid gap-6">
        {analysis.readingLists.map((list, listIndex) => (
          <Card key={listIndex} className="overflow-hidden">
            <div className="bg-muted p-4 border-b">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Book className="w-5 h-5" />
                Reading List {listIndex + 1}
              </h3>
            </div>
            <div className="p-4">
              <div className="grid gap-3">
                {list.map((book, bookIndex) => (
                  <div
                    key={bookIndex}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {bookIndex + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{book}</p>
                      <div className="flex gap-2 mt-2">
                        <a
                          href={`https://www.goodreads.com/search?q=${encodeURIComponent(book)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          View on Goodreads
                        </a>
                        <span className="text-xs text-muted-foreground">•</span>
                        <a
                          href={`https://www.amazon.com/s?k=${encodeURIComponent(book)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          Find on Amazon
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
