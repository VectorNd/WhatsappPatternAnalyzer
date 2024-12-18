import { FileUpload } from '../components/FileUpload'
import { PatternDisplay } from '../components/PatternDisplay'
import { AnimatedBackground } from '../components/AnimatedBackground'

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-8">
      <AnimatedBackground />
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h1 className="text-2xl font-light tracking-wider text-white/80 mb-1">
            WHATSAPP PATTERN ANALYZER
          </h1>
          <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
        </div>
        <div className="space-y-8 rounded-lg bg-zinc-900/50 p-8 backdrop-blur-sm ring-1 ring-white/10">
          <FileUpload />
          <PatternDisplay />
        </div>
      </div>
    </main>
  )
}
