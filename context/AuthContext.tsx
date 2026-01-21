'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db } from "@/lib/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    userName: string;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, userName: "" });

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

    useEffect(() => {
      if (!user) {
        return;
      }
      const getUserName = async () => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserName(userSnap.data().userName);
        }
      }
      getUserName(); 
    }, [user])

  return <AuthContext value={{user, loading, userName}}>{children}</AuthContext>
}

export function useAuth() {
    return useContext(AuthContext);
}
