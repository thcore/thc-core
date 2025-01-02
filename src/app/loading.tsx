import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-label="페이지 로딩 중입니다"
      className="flex justify-center items-center min-h-screen bg-gray-50"
    >
      <LoadingSpinner size="lg" text="페이지를 로드하고 있습니다..." />
    </div>
  );
}
