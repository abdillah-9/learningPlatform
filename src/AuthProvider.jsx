import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://www.tanzcoffee.co.tz/mwangaza-backend/get_user_from_token.php",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          localStorage.removeItem("token"); // invalid token
          setUserData(null);
        } else {
          const data = await res.json();
          setUserData(data);
        }
      } catch (err) {
        console.error("Auth fetch failed:", err);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
