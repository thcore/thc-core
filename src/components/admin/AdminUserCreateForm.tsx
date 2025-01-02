'use client'

import { useState } from 'react'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

interface AdminUserCreateFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AdminUserCreateForm({ isOpen, onClose, onSuccess }: AdminUserCreateFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [position, setPosition] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement user creation logic
    onSuccess()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="사용자 추가"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="부서"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <Input
          label="직책"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button type="submit">
            추가
          </Button>
        </div>
      </form>
    </Modal>
  )
}
