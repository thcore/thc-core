'use client'

import { useForm } from 'react-hook-form'
import { useFirestoreCollection } from '@/hooks/firestore/useFirestoreCollection'
import type { Site, Vendor, PaymentRequestFormData } from '@/types/payment'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import RefreshButton from '@/components/common/RefreshButton'

export default function PaymentRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PaymentRequestFormData>()

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

  const onSubmit = async (data: PaymentRequestFormData) => {
    try {
      console.log(data)
      // TODO: 비용 청구 로직 구현
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-[var(--layout-spacing-content)]">
      <div className="flex justify-end">
        <RefreshButton
          onClick={handleRefresh}
          isLoading={isFetchingSites || isFetchingVendors}
          lastUpdated={Math.max(sitesUpdatedAt || 0, vendorsUpdatedAt || 0)}
        />
      </div>

      {sites && vendors && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--grid-spacing-md)]">
            <div className="space-y-[var(--component-spacing-sm)]">
              <label htmlFor="siteId" className="block text-sm font-medium text-[var(--colors-text-secondary)]">
                현장
              </label>
              <select
                id="siteId"
                {...register('siteId', { required: '현장을 선택해주세요' })}
                className="block w-full rounded-[var(--radii-base)] border border-[var(--colors-border-default)] bg-[var(--colors-background-primary)] px-[var(--container-spacing-md)] py-[var(--component-spacing-sm)] text-[var(--colors-text-primary)] shadow-sm focus:border-[var(--colors-border-focus)] focus:outline-none focus:ring-1 focus:ring-[var(--colors-border-focus)]"
              >
                <option value="">현장을 선택하세요</option>
                {sites.map((site: Site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
              {errors.siteId && (
                <p className="text-sm text-[var(--colors-danger-500)]">{errors.siteId.message}</p>
              )}
            </div>

            <div className="space-y-[var(--component-spacing-sm)]">
              <label htmlFor="vendorId" className="block text-sm font-medium text-[var(--colors-text-secondary)]">
                거래처
              </label>
              <select
                id="vendorId"
                {...register('vendorId', { required: '거래처를 선택해주세요' })}
                className="block w-full rounded-[var(--radii-base)] border border-[var(--colors-border-default)] bg-[var(--colors-background-primary)] px-[var(--container-spacing-md)] py-[var(--component-spacing-sm)] text-[var(--colors-text-primary)] shadow-sm focus:border-[var(--colors-border-focus)] focus:outline-none focus:ring-1 focus:ring-[var(--colors-border-focus)]"
              >
                <option value="">거래처를 선택하세요</option>
                {vendors.map((vendor: Vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </select>
              {errors.vendorId && (
                <p className="text-sm text-[var(--colors-danger-500)]">{errors.vendorId.message}</p>
              )}
            </div>
          </div>

          <Input
            id="title"
            label="제목"
            error={errors.title?.message}
            placeholder="청구 제목을 입력하세요"
            {...register('title', { required: '제목을 입력해주세요' })}
          />

          <Input
            id="amount"
            type="number"
            label="금액"
            error={errors.amount?.message}
            placeholder="금액을 입력하세요"
            {...register('amount', { 
              required: '금액을 입력해주세요',
              min: { value: 1000, message: '최소 금액은 1,000원입니다' }
            })}
          />

          <div className="space-y-[var(--component-spacing-sm)]">
            <label htmlFor="description" className="block text-sm font-medium text-[var(--colors-text-secondary)]">
              상세 내용
            </label>
            <textarea
              id="description"
              {...register('description', { required: '상세 내용을 입력해주세요' })}
              className="block w-full rounded-[var(--radii-base)] border border-[var(--colors-border-default)] bg-[var(--colors-background-primary)] px-[var(--container-spacing-md)] py-[var(--component-spacing-sm)] text-[var(--colors-text-primary)] shadow-sm focus:border-[var(--colors-border-focus)] focus:outline-none focus:ring-1 focus:ring-[var(--colors-border-focus)]"
              rows={4}
              placeholder="청구 상세 내용을 입력하세요"
            />
            {errors.description && (
              <p className="text-sm text-[var(--colors-danger-500)]">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--grid-spacing-md)]">
            <Input
              id="requestDate"
              type="date"
              label="청구일"
              error={errors.requestDate?.message}
              {...register('requestDate', { required: '청구일을 선택해주세요' })}
            />

            <Input
              id="dueDate"
              type="date"
              label="만기일"
              error={errors.dueDate?.message}
              {...register('dueDate', { required: '만기일을 선택해주세요' })}
            />
          </div>

          <div className="flex justify-end gap-[var(--element-spacing-md)]">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? '처리 중...' : '청구하기'}
            </Button>
          </div>
        </>
      )}
    </form>
  )
}