'use client'

import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const arrowsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createArrow = () => {
      if (!arrowsRef.current) return
      
      const arrow = document.createElement('div')
      arrow.className = 'arrow'
      
      // Random starting position
      arrow.style.left = `${Math.random() * 100}%`
      arrow.style.top = `${Math.random() * 100}%`
      
      arrowsRef.current.appendChild(arrow)
      
      // Remove arrow after animation
      setTimeout(() => {
        arrow.remove()
      }, 10000)
    }

    // Create new arrows periodically
    const interval = setInterval(createArrow, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="grid-background" />
      <div className="floating-arrows" ref={arrowsRef} />
      <div className="glow" />
    </>
  )
}