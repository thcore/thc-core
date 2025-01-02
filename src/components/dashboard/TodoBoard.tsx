'use client'
import { useState } from 'react'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Card from '@/components/common/Card'

interface Todo {
  id: string
  title: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
}

const STATUSES = [
  { id: 'TODO', label: '할 일' },
  { id: 'IN_PROGRESS', label: '진행 중' },
  { id: 'DONE', label: '완료' },
] as const

export default function TodoBoard() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodoTitle.trim()) return

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: newTodoTitle.trim(),
      status: 'TODO'
    }

    setTodos(prev => [...prev, newTodo])
    setNewTodoTitle('')
    setIsAdding(false)
  }

  const handleStatusChange = (todoId: string, newStatus: Todo['status']) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId ? { ...todo, status: newStatus } : todo
      )
    )
  }

  const handleDelete = (todoId: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== todoId))
  }

  return (
    <div className="space-y-4">
      {/* 할 일 추가 버튼 */}
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          새로운 할 일 추가
        </button>
      ) : (
        <form onSubmit={handleAddTodo} className="flex gap-2">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="할 일을 입력하세요"
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            추가
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            취소
          </button>
        </form>
      )}

      {/* 칸반 보드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATUSES.map(status => (
          <Card key={status.id} className="p-4">
            <h3 className="font-medium mb-4">{status.label}</h3>
            <div className="space-y-2">
              {todos
                .filter(todo => todo.status === status.id)
                .map(todo => (
                  <div
                    key={todo.id}
                    className="group flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                  >
                    <span>{todo.title}</span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* 상태 변경 버튼들 */}
                      {status.id !== 'TODO' && (
                        <button
                          onClick={() => handleStatusChange(todo.id, 'TODO')}
                          className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800"
                        >
                          할 일로
                        </button>
                      )}
                      {status.id !== 'IN_PROGRESS' && (
                        <button
                          onClick={() => handleStatusChange(todo.id, 'IN_PROGRESS')}
                          className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800"
                        >
                          진행 중으로
                        </button>
                      )}
                      {status.id !== 'DONE' && (
                        <button
                          onClick={() => handleStatusChange(todo.id, 'DONE')}
                          className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800"
                        >
                          완료로
                        </button>
                      )}
                      {/* 삭제 버튼 */}
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}