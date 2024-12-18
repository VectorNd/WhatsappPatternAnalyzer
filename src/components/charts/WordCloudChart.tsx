import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import cloud from 'd3-cloud'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

interface WordCloudProps {
  words: {
    text: string
    value: number
    category: string
  }[]
}

export function WordCloudChart({ words }: WordCloudProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !words.length) return

    const width = 600
    const height = 400

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove()

    // Create and style the tooltip
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "word-cloud-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("padding", "10px")
      .style("border", "1px solid #ddd")
      .style("border-radius", "6px")
      .style("font-size", "14px")
      .style("box-shadow", "0 2px 8px rgba(0,0,0,0.15)")
      .style("line-height", "1.6")
      .style("z-index", "1000")
      .style("pointer-events", "none") // Prevents tooltip from interfering with hover

    const layout = cloud()
      .size([width, height])
      .words(words.map(d => ({ 
        ...d, 
        size: Math.min(15 + d.value * 20, 60)
      })))
      .padding(10)
      .rotate(0)
      .fontSize((d: any) => d.size as number)
      .on("end", draw)

    layout.start()

    function draw(words: { text: string; size: number; x: number; y: number; rotate: number; value: number; category: string }[]) {
      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)

      const g = svg.append("g")
        .attr("transform", `translate(${width/2},${height/2})`)

      g.selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", d => `${d.size}px`)
        .style("font-family", "Arial")
        .style("fill", (d, i) => d3.interpolateBlues(i / words.length))
        .style("cursor", "pointer")
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .text(d => d.text)
        .on("mouseover", function(event, d) {
          // Highlight the word
          d3.select(this)
            .style("opacity", 0.7)
            .style("font-weight", "bold")

          // Show and position the tooltip
          tooltip
            .style("visibility", "visible")
            .html(`
              <div style="font-weight: bold; margin-bottom: 4px; color: #1a1a1a">
                ${d.text}
              </div>
              <div style="color: #4a5568">
                Count: ${d.value}
              </div>
              <div style="color: #4a5568">
                Category: ${d.category}
              </div>
            `)
        })
        .on("mousemove", function(event) {
          tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px")
        })
        .on("mouseout", function() {
          // Remove highlighting
          d3.select(this)
            .style("opacity", 1)
            .style("font-weight", "normal")
          
          // Hide tooltip
          tooltip
            .style("visibility", "hidden")
        })
    }

    // Cleanup function
    return () => {
      tooltip.remove()
    }
  }, [words])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Common Words & Phrases</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <svg ref={svgRef} />
      </CardContent>
    </Card>
  )
} 