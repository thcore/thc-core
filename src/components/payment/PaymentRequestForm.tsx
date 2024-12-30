'use client'

import { useState } from 'react'
import { useFirestoreCollection } from '@/hooks/firestore/useFirestoreCollection'
import { Site, Vendor } from '@/types/payment'
import RefreshButton from '@/components/common/RefreshButton'

export default function PaymentRequestForm() {
  const [selectedSite, setSelectedSite] = useState('')
  const [selectedVendor, setSelectedVendor] = useState('')

  const { 
    data: sites, 
    refetch: refetchSites,
    isFetching: isFetchingSites,
    dataUpdatedAt: sitesUpdatedAt
  } = useFirestoreCollection<Site>('sites')
  
  const { 
    data: vendors, 
    refetch: refetchVendors,
    isFetching: isFetchingVendors,
    dataUpdatedAt: vendorsUpdatedAt
  } = useFirestoreCollection<Vendor>('vendors')

  const handleRefresh = async () => {
    await Promise.all([
      refetchSites(),
      refetchVendors()
    ])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">결제 요청</h2>
        
        <RefreshButton
          onClick={handleRefresh}
          isLoading={isFetchingSites || isFetchingVendors}
          lastUpdated={Math.max(sitesUpdatedAt || 0, vendorsUpdatedAt || 0)}
        />
      </div>

      {sites && vendors && (
        <form className="space-y-4">
          <div>
            <label htmlFor="site" className="block text-sm font-medium mb-1">
              현장
            </label>
            <select
              id="site"
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              className="w-full p-2 border rounded-md bg-white"
            >
              <option value="">현장을 선택하세요</option>
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="vendor" className="block text-sm font-medium mb-1">
              거래처
            </label>
            <select
              id="vendor"
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="w-full p-2 border rounded-md bg-white"
            >
              <option value="">거래처를 선택하세요</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      )}
    </div>
  )
}