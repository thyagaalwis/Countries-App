import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // subscribe to Firebase auth state, then flip loading → false
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const logout           = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, authLoading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
