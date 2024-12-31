import { Timestamp } from 'firebase/firestore'

// Firestore에서 사용할 정확한 타입 정의
export interface FirestoreUser {
  // Auth (인증)
  uid: string                    // PK, document ID와 동일
  email: string                  // 이메일 (Firebase Auth와 동일)
  role: 'super_admin' | 'admin' | 'user'         // 권한
  status: 'active' | 'inactive' | 'pending'  // 계정 상태
  lastLoginAt: Timestamp         // 마지막 로그인 (Firestore Timestamp)

  // Profile (프로필)
  name: string                   // 이름
  phone: string | null          // 연락처 (optional)
  profileImage: string | null   // 프로필 이미지 URL (optional)

  // Organization (조직)
  department: string            // 부서
  position: string             // 직책
  corporationId: string    // 주 소속 법인 ID
  corporations: string[]   // 접근 가능한 법인 ID 목록

  // System (시스템)
  createdAt: Timestamp        // 생성일 (Firestore Timestamp)
  updatedAt: Timestamp        // 수정일 (Firestore Timestamp)
  createdBy: string          // 생성자 UID
  updatedBy: string          // 수정자 UID

  // 아바타 설정 추가
  avatarConfig?: {
    name: string
    variant: 'beam' | 'marble' | 'pixel' | 'sunset' | 'ring'
    colors: string[]
  }
}

// 생성 시 필요한 필수 필드 타입
export type CreateFirestoreUser = Omit<FirestoreUser, 
  'lastLoginAt' | 
  'createdAt' | 
  'updatedAt' | 
  'createdBy' | 
  'updatedBy'
> & {
  phone?: string
  profileImage?: string
  avatarConfig?: {
    name: string
    variant: 'beam' | 'marble' | 'pixel' | 'sunset' | 'ring'
    colors: string[]
  }
}