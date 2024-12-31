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
├── app/          # 페이지 및 라우팅
├── components/   # 재사용 가능한 컴포넌트
├── hooks/        # 커스텀 훅
├── styles/       # 전역 스타일
├── types/        # 타입 정의
└── utils/        # 유틸리티 함수
```

## 배포
- Firebase Hosting을 통해 자동 배포
- main 브랜치에 merge 시 자동으로 배포됨
- PR 생성 시 미리보기 환경 자동 배포