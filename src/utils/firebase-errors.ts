import { FirebaseError } from 'firebase/app';

export const getFirebaseErrorMessage = (error: FirebaseError): string => {
  console.log('Firebase error code:', error.code); // 디버깅용
  
  switch (error.code) {
    case 'auth/invalid-credential':
      return '이메일 또는 비밀번호가 올바르지 않습니다';
    case 'auth/too-many-requests':
      return '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요';
    case 'auth/network-request-failed':
      return '네트워크 연결을 확인해주세요';
    case 'auth/internal-error':
      return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요';
    default:
      console.error('Unhandled Firebase error:', error); // 디버깅용
      return '로그인에 실패했습니다. 다시 시도해주세요.';
  }
};
