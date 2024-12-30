export const auth = {
    // 필요한 메서드들만 모킹
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn()
  };
  
  export const app = {
    // 필요한 경우 추가
  };