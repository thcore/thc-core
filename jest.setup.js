import '@testing-library/jest-dom'

// Mock FirebaseError
class FirebaseError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
    this.name = 'FirebaseError'
  }
}

// Firebase mocking
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
  FirebaseError,
}))

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}))

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}))

// Make FirebaseError available globally for tests
global.FirebaseError = FirebaseError 