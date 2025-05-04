// src/hooks/useFavorites.js
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // load on login:
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    const ref = doc(db, "favorites", user.uid);
    getDoc(ref).then(snap => {
      if (snap.exists()) {
        setFavorites(snap.data().countries || []);
      }
    });
  }, [user]);

  // save on change:
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "favorites", user.uid);
    setDoc(ref, { countries: favorites });
  }, [favorites, user]);

  return [favorites, setFavorites];
}
