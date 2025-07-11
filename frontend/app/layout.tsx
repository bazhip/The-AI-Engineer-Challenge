import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mario Chat | AI Assistant',
  description: 'A Mario-themed AI chat interface powered by OpenAI',
  keywords: ['mario', 'chat', 'ai', 'assistant', 'openai'],
  authors: [{ name: 'Mario Chat Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 