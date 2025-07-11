'use client'

import { useState } from 'react'

interface ApiKeyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (apiKey: string) => void
}

export default function ApiKeyModal({ isOpen, onClose, onSubmit }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!apiKey.trim()) {
      setError('Please enter your API key')
      return
    }
    if (!apiKey.startsWith('sk-')) {
      setError('API key should start with "sk-"')
      return
    }
    onSubmit(apiKey.trim())
    setApiKey('')
    setError('')
  }

  const handleClose = () => {
    setApiKey('')
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="mario-card max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold mario-text-gradient">
            🔑 Enter API Key
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="mario-input"
              autoComplete="off"
            />
            {error && (
              <p className="text-mario-red text-sm mt-2">
                {error}
              </p>
            )}
          </div>
          
          <div className="text-sm text-gray-600 bg-mario-yellow/20 p-3 rounded-lg">
            <p className="font-medium mb-1">🔒 Privacy Notice:</p>
            <p>Your API key is stored locally in your browser and is never sent to our servers.</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="mario-button-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mario-button flex-1"
            >
              Let's-a Go! 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 