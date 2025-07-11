'use client'

export default function LoadingIndicator() {
  return (
    <div className="chat-message chat-message-assistant">
      <div className="flex items-start space-x-2">
        <div className="text-lg flex-shrink-0">
          🍄
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm">
              Assistant
            </span>
            <span className="text-xs text-gray-500">
              thinking...
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-gray-600">Mario is thinking</span>
            <div className="loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 