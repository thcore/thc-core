'use client'
import Card from '@/components/common/Card';
import ThemeSelector from '@/components/layout/ThemeSelector';
import { MESSAGES } from '@/constants/messages';
import { CONFIG } from '@/constants/config';

export default function Home() {
  const { KOREAN } = MESSAGES;
  
  return (
    <main className="min-h-screen p-8">
      <ThemeSelector />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className={`md:col-span-2 h-[${CONFIG.CARD.DEFAULT_HEIGHT.SMALL}px]`}>
          <h2 className="text-xl font-bold mb-4">{KOREAN.CASH_FLOW.TITLE}</h2>
          <p className="mb-2">{KOREAN.CASH_FLOW.CURRENT_BALANCE}: ₩123,456,789</p>
          <div className="space-y-2">
            <p>{KOREAN.CASH_FLOW.MONTHLY_REVENUE}: ₩50,000,000</p>
            <p>{KOREAN.CASH_FLOW.MONTHLY_EXPENSES}: ₩30,000,000</p>
          </div>
        </Card>
        <Card className="h-[300px]">
          <h2 className="text-xl font-bold mb-4">긴급 조치 필요</h2>
          <ul className="space-y-3">
            <li>
              <p className="text-red-500">레스토랑 식자재 재고 부족</p>
              <p className="text-sm text-red-400">Restaurant Inventory Low</p>
            </li>
            <li>
              <p className="text-yellow-500">건물 A동 유지보수 예정</p>
              <p className="text-sm text-yellow-400">Building A Maintenance Due</p>
            </li>
            <li>
              <p className="text-blue-500">건설현장 자재 발주 필요</p>
              <p className="text-sm text-blue-400">Construction Materials Order Required</p>
            </li>
          </ul>
        </Card>
      </div>

      {/* 하단: 사업별 현황 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="h-[400px]">
          <h2 className="text-xl font-bold mb-4">건설업 현황</h2>
          <div className="space-y-3">
            <p>진행 중인 프로젝트: 3개</p>
            <p>Active Projects: 3</p>
            <p>전체 공정률: 67%</p>
            <p>Overall Progress: 67%</p>
            <p>이번 달 목표 달성률: 85%</p>
            <p>Monthly Goal Achievement: 85%</p>
          </div>
        </Card>
        <Card className="h-[400px]">
          <h2 className="text-xl font-bold mb-4">레스토랑 현황</h2>
          <div className="space-y-3">
            <p>오늘의 예약: 28건</p>
            <p>Today's Reservations: 28</p>
            <p>현재 테이블 점유율: 75%</p>
            <p>Current Table Occupancy: 75%</p>
            <p>일일 매출 목표 달성률: 92%</p>
            <p>Daily Sales Goal: 92%</p>
          </div>
        </Card>
        <Card className="h-[400px]">
          <h2 className="text-xl font-bold mb-4">빌딩 관리 현황</h2>
          <div className="space-y-3">
            <p>임대율: 95%</p>
            <p>Occupancy Rate: 95%</p>
            <p>이번 달 관리비 수금률: 88%</p>
            <p>Monthly Fee Collection: 88%</p>
            <p>보류 중인 민원: 2건</p>
            <p>Pending Issues: 2</p>
          </div>
        </Card>
      </div>
    </main>
  );
}