'use client'

import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import Header from './components/Header'
import ApiKeyModal from './components/ApiKeyModal'

export default function Home() {
  const [apiKey, setApiKey] = useState<string>('')
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key)
    setShowApiKeyModal(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onApiKeyClick={() => setShowApiKeyModal(true)} />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {apiKey ? (
          <ChatInterface apiKey={apiKey} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="mario-card max-w-md">
              <h2 className="text-3xl font-bold mario-text-gradient mb-4">
                🍄 Welcome to Mario Chat! 🍄
              </h2>
              <p className="text-gray-700 mb-6">
                Let's-a go! To start chatting, you'll need to provide your OpenAI API key.
              </p>
              <button
                onClick={() => setShowApiKeyModal(true)}
                className="mario-button w-full"
              >
                🔑 Enter API Key
              </button>
            </div>
          </div>
        )}
      </main>
      
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSubmit={handleApiKeySubmit}
      />
    </div>
  )
} 