import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, isFirebaseMock } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

export type SystemMode = 'GREEN' | 'YELLOW' | 'RED' | 'EMERGENCY';

interface UserProfile {
  uid: string;
  phone: string;
  barangay?: string;
  residents?: number;
  vulnerableMembers?: string[];
  riskLevel?: 'LOW' | 'HIGH';
  wallet?: string;
  resiliencePoints?: number;
  emergencyStatus?: 'SAFE' | 'HELP';
}

interface SystemContextType {
  mode: SystemMode;
  setMode: (mode: SystemMode) => void;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  loginMock: (phone: string) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<SystemMode>('GREEN');
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock state for when Firebase is not configured
  const [mockUser, setMockUser] = useState<any>(null);
  const [mockProfile, setMockProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (isFirebaseMock) {
      // Use mock logic
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        const userDocRef = doc(db, 'users', u.uid);
        const unsubProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            const initialProfile: UserProfile = {
              uid: u.uid,
              phone: u.phoneNumber || '',
              resiliencePoints: 0,
            };
            setDoc(userDocRef, initialProfile);
            setProfile(initialProfile);
          }
          setLoading(false);
        });
        return () => unsubProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginMock = (phone: string) => {
    const u = { uid: 'mock-user-123', phoneNumber: phone } as any;
    setMockUser(u);
    const p: UserProfile = {
      uid: u.uid,
      phone: phone,
      resiliencePoints: 0,
    };
    setMockProfile(p);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (isFirebaseMock) {
      setMockProfile(prev => prev ? { ...prev, ...data } : null);
      return;
    }
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, data);
  };

  return (
    <SystemContext.Provider 
      value={{ 
        mode, 
        setMode, 
        user: isFirebaseMock ? mockUser : user, 
        profile: isFirebaseMock ? mockProfile : profile, 
        loading, 
        updateProfile,
        loginMock
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
