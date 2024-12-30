'use client'

import PaymentRequestForm from '@/components/payment/PaymentRequestForm';

export default function PaymentRequestPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">결재 요청</h1>
        <p className="mt-2 text-sm text-gray-600">
          새로운 결재를 요청하려면 아래 양식을 작성해주세요.
        </p>
      </div>
      
      <PaymentRequestForm />
    </div>
  );
}
