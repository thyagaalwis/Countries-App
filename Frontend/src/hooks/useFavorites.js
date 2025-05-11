// src/hooks/useFavorites.js
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db }                  from "../firebase";
import { useAuth }             from "../contexts/AuthContext";

export function useFavorites() {
  const { user } = useAuth();

  // 1️⃣ Init from localStorage so reload immediately shows your saved list
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 2️⃣ Once user is logged in, pull their Firestore doc and overwrite if present
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "favorites", user.uid);
    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        const remote = snap.data().countries || [];
        setFavorites(remote);
        // also update localStorage with the “true” source of record
        localStorage.setItem("favorites", JSON.stringify(remote));
      }
    });
  }, [user]);

  // 3️⃣ Whenever favorites change, write back to both localStorage and Firestore
  useEffect(() => {
    // persist locally so a reload shows the same favorites instantly
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // also push to Firestore (if logged in)
    if (user) {
      const ref = doc(db, "favorites", user.uid);
      setDoc(ref, { countries: favorites });
    }
  }, [favorites, user]);

  return [favorites, setFavorites];
}
