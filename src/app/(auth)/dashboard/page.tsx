'use client'

import { 
  BanknotesIcon, 
  ClockIcon, 
  DocumentIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline'
import Card from '@/components/common/Card'
import ContentHeader from '@/components/common/ContentHeader'

export default function DashboardPage() {
  const stats = [
    {
      name: '이번 달 청구 금액',
      value: '₩2,450,000',
      change: '+12.5%',
      changeType: 'positive',
      icon: BanknotesIcon,
    },
    {
      name: '처리 대기 중',
      value: '4건',
      change: '-10%',
      changeType: 'negative',
      icon: ClockIcon,
    },
    {
      name: '이번 달 청구 건수',
      value: '24건',
      change: '+3건',
      changeType: 'positive',
      icon: DocumentIcon,
    },
    {
      name: '팀 구성원',
      value: '12명',
      change: '+2명',
      changeType: 'positive',
      icon: UserGroupIcon,
    },
  ]

  return (
    <div className="space-y-[var(--layout-spacing-section)]">
      <ContentHeader
        title="대시보드"
        description="전체 현황을 한눈에 확인하세요."
      />

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 gap-[var(--grid-spacing-lg)] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} variant="elevated" padding="md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-[var(--colors-action-primary)]" aria-hidden="true" />
              </div>
              <div className="ml-[var(--element-spacing-lg)]">
                <p className="text-sm font-medium text-[var(--colors-text-secondary)]">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-[var(--colors-text-primary)]">{stat.value}</p>
                  <p
                    className={`ml-[var(--element-spacing-md)] flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-[var(--colors-success-500)]' : 'text-[var(--colors-danger-500)]'
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 최근 활동 */}
      <section className="space-y-[var(--component-spacing-md)]">
        <div>
          <h2 className="text-xl font-semibold text-[var(--colors-text-primary)]">최근 활동</h2>
        </div>
        <Card variant="elevated" padding="md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--colors-border-default)]">
              <thead>
                <tr>
                  <th className="px-[var(--container-spacing-md)] py-[var(--component-spacing-sm)] text-left text-sm font-medium text-[var(--colors-text-secondary)]">날짜</th>
                  <th className="px-[var(--container-spacing-md)] py-[var(--component-spacing-sm)] text-left text-sm font-medium text-[var(--colors-text-secondary)]">활동</th>
                  <th className="px-[var(--container-spacing-md)] py-[var(--component-spacing-sm)] text-left text-sm font-medium text-[var(--colors-text-secondary)]">상태</th>
                  <th className="px-[var(--container-spacing-md)] py-[var(--component-spacing-sm)] text-left text-sm font-medium text-[var(--colors-text-secondary)]">금액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--colors-border-default)]">
                {/* 활동 데이터 매핑 */}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  )
}