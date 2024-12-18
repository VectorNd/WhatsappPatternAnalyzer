import { create } from 'zustand'
import { Message } from '@/lib/types'

interface PatternStore {
  messages: Message[]
  setMessages: (messages: Message[]) => void
}

export const usePatternStore = create<PatternStore>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages })
})) 