'use client'

import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import PaymentRequestForm from '@/components/payment/PaymentRequestForm'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useAuth } from '@/hooks/useAuth'
import { useState, useEffect } from 'react'
import type { Site, Vendor } from '@/types/payment'

async function getInitialData(): Promise<{ sites: Site[]; vendors: Vendor[] }> {
  const [sitesSnap, vendorsSnap] = await Promise.all([
    getDocs(collection(db, 'sites')),
    getDocs(collection(db, 'vendors'))
  ])

  return {
    sites: sitesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Site[],
    vendors: vendorsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Vendor[]
  }
}

export default function PaymentRequestPage() {
  const { loading } = useAuth()
  const [initialData, setInitialData] = useState<{
    sites: Site[];
    vendors: Vendor[];
  } | null>(null)

  useEffect(() => {
    getInitialData().then(setInitialData)
  }, [])

  if (loading || !initialData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="로딩 중..." />
      </div>
    )
  }
  
  return <PaymentRequestForm initialData={initialData} />
}
