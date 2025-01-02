'use client'
import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, updateDoc, serverTimestamp, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Firestore users 컬렉션 업데이트
      const userRef = doc(db, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // 사용자 문서가 없으면 생성
        await setDoc(userRef, {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          role: 'user',  // 기본 역할
          status: 'active',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          createdBy: userCredential.user.uid,
          updatedBy: userCredential.user.uid
        });
      } else {
        // 문서가 있으면 업데이트만
        await updateDoc(userRef, {
          lastLoginAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          updatedBy: userCredential.user.uid
        });
      }

      router.push('/dashboard');
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    logout
  };
}