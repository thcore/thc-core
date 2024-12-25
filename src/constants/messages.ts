export const MESSAGES = {
    KOREAN: {
      CASH_FLOW: {
        TITLE: '전체 현금 흐름',
        CURRENT_BALANCE: '현재 잔액',
        MONTHLY_REVENUE: '월간 수입',
        MONTHLY_EXPENSES: '월간 지출',
      },
      ALERTS: {
        TITLE: '긴급 조치 필요',
        RESTAURANT_INVENTORY: '레스토랑 식자재 재고 부족',
        BUILDING_MAINTENANCE: '건물 A동 유지보수 예정',
        CONSTRUCTION_MATERIALS: '건설현장 자재 발주 필요',
      },
      BUSINESS_STATUS: {
        CONSTRUCTION: {
          TITLE: '건설업 현황',
          ACTIVE_PROJECTS: '진행 중인 프로젝트',
          PROGRESS: '전체 공정률',
          GOAL_ACHIEVEMENT: '이번 달 목표 달성률',
        },
        RESTAURANT: {
          TITLE: '레스토랑 현황',
          RESERVATIONS: '오늘의 예약',
          OCCUPANCY: '현재 테이블 점유율',
          GOAL_ACHIEVEMENT: '일일 매출 목표 달성률',
        },
        BUILDING: {
          TITLE: '빌딩 관리 현황',
          OCCUPANCY_RATE: '임대율',
          FEE_COLLECTION: '이번 달 관리비 수금률',
          PENDING_ISSUES: '보류 중인 민원',
        },
      },
    },
    ENGLISH: {
      CASH_FLOW: {
        TITLE: 'Total Cash Flow',
        CURRENT_BALANCE: 'Current Balance',
        MONTHLY_REVENUE: 'Monthly Revenue',
        MONTHLY_EXPENSES: 'Monthly Expenses',
      },
      // ... 영문 메시지도 동일한 구조로 작성
    },
  } as const;