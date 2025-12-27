import React, { createContext, useEffect, useState } from 'react'
export const AuthContext = createContext();

export default function AuthProvider({children}) {
const [userData, setUserData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchCookie() {
    const fData = new FormData();

    try {
      const res = await fetch(
        'https://www.tanzcoffee.co.tz/mwangaza-backend/get_user_from_cookie.php',
        {
          method: "POST",
          credentials: 'include',
          body:fData
        }
      );

      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      } else {
        setUserData(null);
      }
    } catch (e) {
      setUserData(null);
      console.log("catched err is :"+e);
    } finally {
      setLoading(false);
    }
  }
  fetchCookie();
}, []);

  return (
    <AuthContext.Provider value={{userData, setUserData, loading}}>
      {children}
    </AuthContext.Provider>
  )
}
