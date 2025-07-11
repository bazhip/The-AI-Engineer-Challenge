'use client'

import { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import LoadingIndicator from './LoadingIndicator'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'developer'
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  apiKey: string
}

export default function ChatInterface({ apiKey }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [userMessage, setUserMessage] = useState('')
  const [developerMessage, setDeveloperMessage] = useState('You are Mario from the Super Mario video game series! Respond with enthusiasm, use Mario\'s characteristic phrases like "Mamma mia!", "Let\'s-a go!", "Wahoo!", and "It\'s-a me, Mario!". Be helpful and friendly while maintaining Mario\'s cheerful personality. End your responses with Mario-style exclamations when appropriate!')
  const [isLoading, setIsLoading] = useState(false)
  const [model, setModel] = useState('gpt-4o-mini')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userMessage.trim() || isLoading) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])
    setUserMessage('')
    setIsLoading(true)

    try {
      // Use environment variable if available, otherwise default to localhost
      const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
        ? 'http://localhost:8000' 
        : ''
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          developer_message: developerMessage || 'You are a helpful AI assistant.',
          user_message: userMessage,
          model: model,
          api_key: apiKey
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No reader available')
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone
        
        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          setMessages(prev => 
            prev.map(msg => 
              msg.id === assistantMessage.id 
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          )
        }
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again! 😅',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="mario-card h-[70vh] flex flex-col">
      {/* Chat Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-mario-yellow/30">
        <div className="flex items-center space-x-2 mb-3 sm:mb-0">
          <span className="text-2xl">💬</span>
          <h2 className="text-xl font-bold mario-text-gradient">Chat Interface</h2>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mario-input text-sm py-2 px-3"
          >
            <option value="gpt-4o-mini">GPT-4o Mini</option>
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
          <button
            onClick={clearChat}
            className="mario-button-secondary text-sm py-2 px-3"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-6xl mb-4">🍄</div>
            <p className="text-lg">It's-a me, Mario Chat!</p>
            <p className="text-sm">Ask me anything!</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-mario-yellow/30">
        {/* Developer Message (Optional) */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Developer Message (Optional)
          </label>
          <input
            type="text"
            value={developerMessage}
            onChange={(e) => setDeveloperMessage(e.target.value)}
            placeholder="System instructions..."
            className="mario-input text-sm py-2"
          />
        </div>

        {/* User Message */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Message
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message here..."
                className="mario-input flex-1"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !userMessage.trim()}
                className="mario-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🚀
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 