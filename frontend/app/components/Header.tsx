'use client'

import { useState } from 'react'

interface HeaderProps {
  onApiKeyClick: () => void
}

export default function Header({ onApiKeyClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-mario-red to-mario-orange shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-bounce-mario">🍄</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white text-shadow">
                Mario Chat
              </h1>
              <p className="text-xs md:text-sm text-yellow-100 hidden sm:block">
                Your AI-powered assistant!
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <button
              onClick={onApiKeyClick}
              className="mario-button-secondary text-sm"
            >
              🔑 API Key
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-mario-yellow text-mario-red"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-mario-yellow/30">
            <div className="flex flex-col space-y-2 mt-4">
              <button
                onClick={() => {
                  onApiKeyClick()
                  setIsMenuOpen(false)
                }}
                className="mario-button-secondary text-sm w-full"
              >
                🔑 API Key
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
} 