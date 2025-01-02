'use client'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

interface RefreshButtonProps {
  onClick: () => Promise<void>
  isLoading: boolean
  lastUpdated?: number
}

const RefreshButton = ({ onClick, isLoading, lastUpdated }: RefreshButtonProps) => {
  const [timeAgo, setTimeAgo] = useState<string>('')

  useEffect(() => {
    const updateTimeAgo = () => {
      if (!lastUpdated) return

      const seconds = Math.floor((new Date().getTime() - lastUpdated) / 1000)
      
      if (seconds < 60) {
        setTimeAgo(`${seconds}초 전`)
        return
      }
      
      const minutes = Math.floor(seconds / 60)
      if (minutes < 60) {
        setTimeAgo(`${minutes}분 전`)
        return
      }
      
      const hours = Math.floor(minutes / 60)
      if (hours < 24) {
        setTimeAgo(`${hours}시간 전`)
        return
      }
      
      setTimeAgo(new Date(lastUpdated).toLocaleDateString())
    }

    updateTimeAgo()
    const timer = setInterval(updateTimeAgo, 1000) // 1초마다 업데이트

    return () => clearInterval(timer)
  }, [lastUpdated])

  return (
    <div className="flex items-center gap-4">
      {timeAgo && (
        <span className="text-sm text-gray-500">
          마지막 업데이트: {timeAgo}
        </span>
      )}
      
      <button
        onClick={onClick}
        disabled={isLoading}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
        title="데이터 새로고침"
      >
        <ArrowPathIcon 
          className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} 
        />
        <span>새로고침</span>
      </button>
    </div>
  )
}

export default RefreshButton