'use client'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'developer'
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const getMessageStyle = () => {
    switch (message.role) {
      case 'user':
        return 'chat-message chat-message-user'
      case 'assistant':
        return 'chat-message chat-message-assistant'
      case 'developer':
        return 'chat-message chat-message-developer'
      default:
        return 'chat-message'
    }
  }

  const getMessageIcon = () => {
    switch (message.role) {
      case 'user':
        return '👤'
      case 'assistant':
        return '🍄'
      case 'developer':
        return '⚙️'
      default:
        return '💬'
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={getMessageStyle()}>
      <div className="flex items-start space-x-2">
        <div className="text-lg flex-shrink-0">
          {getMessageIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm capitalize">
              {message.role}
            </span>
            <span className="text-xs text-gray-500">
              {formatTime(message.timestamp)}
            </span>
          </div>
          <div className="whitespace-pre-wrap text-gray-800">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  )
} 