import { db } from '@/lib/firebase';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { Site, Vendor } from '@/types/payment';

// 현장 목록 실시간 구독
export const subscribeSites = (callback: (sites: Site[]) => void) => {
  const sitesRef = collection(db, 'sites');
  return onSnapshot(query(sitesRef), (snapshot) => {
    const sites = snapshot.docs.map(doc => ({
      code: doc.id,
      ...doc.data()
    } as Site));
    callback(sites);
  });
};

// 거래처 목록 실시간 구독
export const subscribeVendors = (callback: (vendors: Vendor[]) => void) => {
  const vendorsRef = collection(db, 'vendors');
  return onSnapshot(query(vendorsRef), (snapshot) => {
    const vendors = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Vendor));
    callback(vendors);
  });
};