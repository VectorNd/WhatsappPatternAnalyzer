import { useEffect, useRef } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { Card } from '../ui/card'

interface NetworkGraphProps {
  data: {
    nodes: Array<{
      id: string
      group: string
      value: number
    }>
    links: Array<{
      source: string
      target: string
      value: number
    }>
  }
}

export function NetworkGraph({ data }: NetworkGraphProps) {
  const graphRef = useRef<any>(null)

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force('charge').strength(-200)
    }
  }, [])

  return (
    <Card className="p-4">
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        nodeAutoColorBy="group"
        nodeRelSize={6}
        linkWidth={link => Math.sqrt(link.value)}
        linkColor={() => 'rgba(147, 51, 234, 0.2)'}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.id
          const fontSize = 12/globalScale
          ctx.font = `${fontSize}px Sans-Serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = node.color
          ctx.fillText(label, node.x, node.y)
        }}
      />
    </Card>
  )
} 