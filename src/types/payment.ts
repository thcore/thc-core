// 현장 정보
export interface Site {
    id: string;         // id 추가
    code: string;        // 현장코드
    name: string;        // 현장명
    status: 'ACTIVE' | 'COMPLETED';
    startDate: Date;     // 착공일
    endDate?: Date;      // 준공일
  }
  
  // 거래처 정보
  export interface Vendor {
    id: string;
    businessNumber: string;  // 사업자번호
    name: string;           // 거래처명
    status: 'ACTIVE' | 'INACTIVE';
  }
  
  // 결재 요청
  export interface PaymentRequest {
    id: string;
    requestNumber: string;     // 7자리 관리번호
    siteCode: string;         // 현장코드
    siteName: string;         // 현장명
    vendorId: string;        // 거래처 ID
    vendorName: string;      // 거래처명
    businessNumber: string;   // 사업자번호
    amount: number;          // 청구금액
    requestDate: Date;       // 청구일
    costType: 'COGS' | 'SGA'; // 비용구분
    costCategory: string;    // 세부 비용 항목
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID';
    createdBy: string;      // 요청자 ID
    createdAt: Date;        // 생성일시
    updatedAt: Date;        // 수정일시
  }
  
  // 기존 타입 정의에 추가
  export type CostCategory = {
    code: string;
    name: string;
    type: 'COGS' | 'SGA';
  };
  
  export const COST_CATEGORIES: CostCategory[] = [
    // 매출원가 (COGS) 항목
    { code: 'MATERIAL', name: '자재비', type: 'COGS' },
    { code: 'LABOR', name: '노무비', type: 'COGS' },
    { code: 'OUTSOURCE', name: '외주비', type: 'COGS' },
    
    // 판관비 (SGA) 항목
    { code: 'SALARY', name: '급여', type: 'SGA' },
    { code: 'RENT', name: '임차료', type: 'SGA' },
    { code: 'UTILITY', name: '공과금', type: 'SGA' },
    { code: 'SUPPLIES', name: '소모품비', type: 'SGA' },
  ];