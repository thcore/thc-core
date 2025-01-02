'use client'

import PaymentRequestForm from '@/components/payment/PaymentRequestForm'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import ContentHeader from '@/components/common/ContentHeader'
import { useAuth } from '@/hooks/useAuth'

export default function PaymentRequestPage() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="로딩 중..." />
      </div>
    )
  }
  
  return (
    <div className="space-y-[var(--layout-spacing-section)]">
      <ContentHeader
        title="비용 청구"
        description="비용 청구 내역을 작성하세요."
      />

      <section className="space-y-[var(--component-spacing-md)]">
        <div>
          <h2 className="text-xl font-semibold text-[var(--colors-text-primary)]">청구 정보</h2>
        </div>
        <div>
          <PaymentRequestForm />
        </div>
      </section>
    </div>
  )
}
