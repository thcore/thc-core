'use client'

import { useState } from 'react'
import Avatar from 'boring-avatars'
import { useUpdateDoc } from '@/hooks/firestore/useUpdateDoc'

// variant 타입 정의
type AvatarVariant = 'beam' | 'marble' | 'pixel' | 'sunset' | 'ring'

// 색상 팔레트 타입 정의
type ColorPalette = {
  [key: string]: string[]
}

const COLOR_PALETTES: ColorPalette = {
  classic: ["#01BAEF", "#0CBABA", "#380036", "#1B1B1B", "#FFFFFF"],
  arcade: ["#FF2E63", "#08D9D6", "#252A34", "#EAEAEA", "#FF2E63"],
  jungle: ["#95F9E3", "#49BEB7", "#085F63", "#FF5959", "#FACF5A"],
  galaxy: ["#7400B8", "#5E60CE", "#4EA8DE", "#56CFE1", "#72EFDD"],
  sunset: ["#FF7B00", "#FF8800", "#FF9500", "#FFA200", "#FFAA00"],
  neon: ["#FF0000", "#FF00FF", "#00FFFF", "#00FF00", "#FFFF00"],
  candy: ["#FF449F", "#FF7BA9", "#FFA1B8", "#FFB5C2", "#FFD6DE"],
  ocean: ["#05445E", "#189AB4", "#75E6DA", "#D4F1F4", "#05445E"]
}

interface AvatarSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (config: {
    name: string
    variant: 'beam' | 'marble' | 'pixel' | 'sunset' | 'ring'
    colors: string[]
  }) => void
  userId: string
}

type AvatarConfig = {
  name: string;
  variant: 'beam' | 'marble' | 'pixel' | 'sunset' | 'ring';
  colors: string[];
}

export default function AvatarSelector({ isOpen, onClose, onSelect, userId }: AvatarSelectorProps) {
  const { updateDocument, isLoading } = useUpdateDoc<{ avatarConfig: AvatarConfig }>('users')
  const [config, setConfig] = useState<AvatarConfig>({
    name: Date.now().toString(),
    variant: 'beam',
    colors: ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']
  })

  const handleSelect = async () => {
    try {
      await updateDocument(userId, { avatarConfig: config })
      onSelect(config)
      onClose()
    } catch (error) {
      console.error('Failed to update avatar:', error)
    }
  }

  const generateNewName = () => {
    setConfig(prev => ({
      ...prev,
      name: Date.now().toString()
    }))
  }

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
  }

  const generateRandomColors = () => {
    return Array.from({ length: 5 }, () => generateRandomColor())
  }

  const generateNewColors = () => {
    setConfig(prev => ({
      ...prev,
      colors: generateRandomColors()
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <h2 className="text-xl font-semibold mb-6">아바타 스타일 선택</h2>

        <div className="flex gap-8">
          {/* 큰 미리보기 */}
          <div className="flex flex-col items-center gap-4">
            <Avatar {...config} size={120} />
            <div className="flex gap-2 whitespace-nowrap">
              <button
                onClick={generateNewName}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded text-sm"
              >
                패턴 섞기
              </button>
              <button
                onClick={generateNewColors}
                className="px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded text-sm"
              >
                색상 섞기
              </button>
            </div>
          </div>

          <div className="flex-grow space-y-6">
            {/* 스타일 선택 */}
            <div>
              <h3 className="text-sm font-medium mb-3">스타일</h3>
              <div className="grid grid-cols-5 gap-4">
                {['beam', 'marble', 'pixel', 'sunset', 'ring'].map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setConfig(prev => ({ ...prev, variant: variant as AvatarVariant }))}
                    className={`p-4 rounded flex flex-col items-center gap-2 ${
                      config.variant === variant ? 'bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <Avatar
                      name={config.name}
                      variant={variant as AvatarVariant}
                      colors={config.colors}
                      size={40}
                    />
                    <span className="text-sm capitalize">{variant}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 색상 팔레트 */}
            <div>
              <h3 className="text-sm font-medium mb-3">컬러 팔레트</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(COLOR_PALETTES).map(([name, colors]) => (
                  <button
                    key={name}
                    onClick={() => setConfig(prev => ({ ...prev, colors }))}
                    className={`p-3 rounded flex items-center justify-between ${
                      config.colors === colors ? 'bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-sm">
                      {name === 'classic' && '클래식'}
                      {name === 'arcade' && '아케이드'}
                      {name === 'jungle' && '정글'}
                      {name === 'galaxy' && '갤럭시'}
                      {name === 'sunset' && '선셋'}
                      {name === 'neon' && '네온'}
                      {name === 'candy' && '캔디'}
                      {name === 'ocean' && '오션'}
                    </span>
                    <div className="flex gap-1">
                      {colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={handleSelect}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? '저장 중...' : '선택'}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  )
}