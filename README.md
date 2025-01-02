# THC Core

비즈니스 관리를 위한 통합 플랫폼

## 기술 스택
- Next.js 14
- TypeScript
- Tailwind CSS
- Recharts
- Firebase

## 개발 환경 설정

### 1. 저장소 클론 및 의존성 설치
```bash
# 저장소 클론
git clone https://github.com/thcore/thc-core.git

# 프로젝트 폴더로 이동
cd thc-core

# 의존성 설치
npm install
```

### 2. 환경 변수 설정
1. `.env.example` 파일을 `.env.local`로 복사
2. `.env.local` 파일에 Firebase 설정값 입력

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 테스트 실행
```bash
# 전체 테스트 실행
npm test

# 테스트 감시 모드
npm run test:watch

# 커버리지 리포트 생성
npm run test:coverage
```

## 프로젝트 구조
```
src/
├── app/              # Next.js 페이지 및 라우팅
│   ├── page.tsx       # 기본 페이지
│   ├── layout.tsx     # 전역 레이아웃
│   ├── provider.tsx   # 전역 상태/데이터 관리 (선택)
│   ├── loading.tsx    # 로딩 상태 처리 (선택)
│   ├── error.tsx      # 에러 처리 (선택)
│   ├── head.tsx       # SEO/메타태그 (선택)
│   └── dashboard/     # 하위 라우트 폴더
│       ├── page.tsx   # 하위 페이지
│       ├── layout.tsx # 하위 라우트 레이아웃 (선택)
│       └── provider.tsx # 데이터/상태 관리 (선택)
├── components/       # 재사용 가능한 컴포넌트
│   ├── common/        # 공통 컴포넌트 (Button, Modal 등)
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── Accordion.tsx
│   ├── auth/          # 인증 관련 컴포넌트
│   │   ├── LoginForm.tsx
│   │   └── RouteGuard.tsx
│   └── dashboard/     # 대시보드 전용 컴포넌트
│       ├── BarChart.tsx
│       ├── LineChart.tsx
│       └── TodoBoard.tsx
├── hooks/            # 커스텀 훅
│   ├── useAuth.ts     # 인증 관련 훅
│   ├── useUserRole.ts # 사용자 역할 관리 훅
│   └── firestore/     # Firestore 관련 훅
│       ├── useFirestoreCollection.ts
│       ├── useFirestoreUser.ts
│       └── useUpdateDoc.ts
├── lib/              # 외부 라이브러리 및 설정
│   ├── firebase.ts    # Firebase 초기화
│   ├── react-query.ts # React Query 설정
│   └── themes.ts      # 테마 설정
├── styles/           # 전역 스타일 및 테마
│   ├── globals.css    # 전역 CSS
│   ├── components.css # 컴포넌트별 스타일
│   └── tokens.ts      # 디자인 토큰
├── utils/            # 유틸리티 함수
│   ├── cn.ts          # 클래스 네임 병합
│   ├── date.ts        # 날짜 처리 함수
│   └── firebase-errors.ts # Firebase 에러 처리
├── types/            # 타입 정의
│   ├── firestore/     # Firestore 관련 타입
│   │   ├── user.ts
│   │   └── payment.ts
│   ├── env.d.ts       # 환경 변수 타입 정의
│   └── api.ts         # API 요청/응답 타입
└── __tests__/        # 테스트 코드
    ├── components/    # 컴포넌트 테스트
    │   ├── auth/
    │   │   └── LoginForm.test.tsx
    │   └── dashboard/
    │       └── BarChart.test.tsx
    └── hooks/         # 훅 테스트
        └── useAuth.test.ts
```

## 배포
- Firebase Hosting을 통해 자동 배포
- main 브랜치에 merge 시 자동으로 배포됨
- PR 생성 시 미리보기 환경 자동 배포

---

```
echo "=== Folder Structure ===" > project_structure.txt
find . -type f ! -path "./node_modules/*" ! -path "./.git/*" ! -path "./.next/*" \
    | sed "s|$PWD||" >> project_structure.txt

echo -e "\n=== File Contents ===" >> project_structure.txt
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" \) \
    ! -path "./node_modules/*" ! -path "./.git/*" ! -path "./.next/*" \
    | while read -r file; do
        echo -e "\n=== $file ===" >> project_structure.txt
        cat "$file" >> project_structure.txt
    done
```
