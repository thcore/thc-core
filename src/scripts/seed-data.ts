import * as dotenv from 'dotenv'
import path from 'path'

// .env.local 파일 로드
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { db } from '@/lib/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'

// 현장 데이터
const sites = [
  {
    code: 'HQ',
    name: '본사',
    status: 'ACTIVE',
    startDate: new Date('2020-01-01'),
  },
  {
    code: 'SITE001',
    name: '서울 프로젝트',
    status: 'ACTIVE',
    startDate: new Date('2024-01-01'),
  },
  {
    code: 'SITE002',
    name: '부산 프로젝트',
    status: 'ACTIVE',
    startDate: new Date('2024-02-01'),
  },
]

// 거래처 데이터
const vendors = [
  {
    id: 'VENDOR001',
    businessNumber: '123-45-67890',
    name: '(주)가나건설',
    status: 'ACTIVE',
  },
  {
    id: 'VENDOR002',
    businessNumber: '234-56-78901',
    name: '대한건설(주)',
    status: 'ACTIVE',
  },
  {
    id: 'VENDOR003',
    businessNumber: '345-67-89012',
    name: '한국자재(주)',
    status: 'ACTIVE',
  },
]

// 데이터 추가 함수
async function seedData() {
  try {
    // 현장 데이터 추가
    for (const site of sites) {
      await setDoc(doc(db, 'sites', site.code), site)
    }
    console.log('현장 데이터 추가 완료')

    // 거래처 데이터 추가
    for (const vendor of vendors) {
      await setDoc(doc(db, 'vendors', vendor.id), vendor)
    }
    console.log('거래처 데이터 추가 완료')

  } catch (error) {
    console.error('데이터 추가 중 오류 발생:', error)
  } finally {
    // 프로세스 종료
    process.exit(0)
  }
}

// 스크립트 실행
seedData()