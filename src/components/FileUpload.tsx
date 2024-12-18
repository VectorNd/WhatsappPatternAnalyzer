'use client'

import { ArrowUpFromLine, MessageSquare, BarChart3, Zap } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card } from './ui/card'
import { usePatternStore } from '../lib/store'
import { parseWhatsAppChat } from '../lib/parser'

export function FileUpload() {
  const { setMessages } = usePatternStore()
  const [isVisible, setIsVisible] = useState(true)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    setIsVisible(false)
    setTimeout(async () => {
      const text = await file.text()
      const parsedMessages = parseWhatsAppChat(text)
      setMessages(parsedMessages.map(msg => ({ content: msg.text })))
    }, 300)
  }, [setMessages])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'] },
    maxFiles: 1
  })

  if (!isVisible) return null

  return (
    <div className="space-y-16">
      {/* Info Section */}
      <div className="grid grid-cols-3 gap-12 text-center px-4">
        <div className="space-y-4 group">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <MessageSquare className="mx-auto h-8 w-8 text-zinc-300 transition-colors duration-300 group-hover:text-purple-400" 
              strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-semibold text-zinc-100">
            Pattern Recognition
          </h3>
          <p className="text-sm leading-relaxed text-zinc-400">
            Discover recurring themes and topics in your conversations
          </p>
        </div>

        <div className="space-y-4 group">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <BarChart3 className="mx-auto h-8 w-8 text-zinc-300 transition-colors duration-300 group-hover:text-purple-400" 
              strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-semibold text-zinc-100">
            Visual Analytics
          </h3>
          <p className="text-sm leading-relaxed text-zinc-400">
            View insights through beautiful, interactive charts
          </p>
        </div>

        <div className="space-y-4 group">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <Zap className="mx-auto h-8 w-8 text-zinc-300 transition-colors duration-300 group-hover:text-purple-400" 
              strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-semibold text-zinc-100">
            Instant Analysis
          </h3>
          <p className="text-sm leading-relaxed text-zinc-400">
            Get immediate insights from your chat history
          </p>
        </div>
      </div>

      {/* Upload Card */}
      <Card
        {...getRootProps()}
        className={`relative group cursor-pointer border border-dashed p-16 text-center transition-all duration-300
          ${isDragActive ? 'border-purple-400 bg-purple-400/5' : 'border-zinc-800 hover:border-zinc-700'}
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
      >
        <input {...getInputProps()} />
        
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-800/0 via-zinc-800/20 to-zinc-800/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className="relative">
          <div className="mb-6 p-4 bg-zinc-800/50 rounded-full inline-block group-hover:scale-110 transition-transform duration-300">
            <ArrowUpFromLine className="h-8 w-8 text-zinc-300 group-hover:text-purple-400 transition-colors duration-300" />
          </div>
          
          <div className="space-y-3">
            <p className="text-base font-medium text-zinc-200">
              Drop your WhatsApp chat export here
            </p>
            <p className="text-sm text-zinc-500">
              or click to select from your computer
            </p>
          </div>
        </div>
      </Card>

      {/* Privacy Note */}
      <p className="text-center text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed">
        Your chat data is processed locally and never leaves your browser.
        <br />
        We respect your privacy and don't store any of your information.
      </p>
    </div>
  )
} 