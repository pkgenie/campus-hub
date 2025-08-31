'use client'

import { useState, useRef, useEffect } from 'react'
import { Message } from '@/components/chat/message'
import { TutorForm } from '@/components/chat/tutor-form'

interface ChatConfig {
  role: 'ML Expert' | 'AI Expert' | 'DSA Expert'
  apiKey: string
}

export default function TutorBuddyPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState<ChatConfig | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !config) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          role: config.role,
          apiKey: config.apiKey,
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (!config) {
    return (
      <main className="mx-auto max-w-7xl p-6 md:p-10">
        <section className="max-w-xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Your Personal{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                Tutor Buddy
              </span>
            </h1>
            <p className="text-gray-600">
              Get expert guidance from ML, AI, and DSA specialists powered by advanced AI.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <TutorForm onSubmit={setConfig} />
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl p-6 md:p-10">
      <div className="rounded-2xl border bg-white shadow-sm h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <h1 className="font-semibold">{config.role}</h1>
          <button
            onClick={() => setConfig(null)}
            className="ml-auto text-sm text-gray-500 hover:text-gray-700"
          >
            Change Tutor
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, i) => (
            <Message key={i} role={message.role} content={message.content} />
          ))}
          {isLoading && (
            <div className="flex gap-2 items-center text-gray-500">
              <div className="animate-pulse">...</div>
              Thinking
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
              className="flex-1 px-4 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
