import React, { createContext, useEffect, useState } from "react";
import { IoMdHelpCircleOutline } from "react-icons/io";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on first render
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user"); // optional: store user info too
    if (token && user) {
      setUserData(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, loading }}>
      {children}
      <div style={{position:'fixed', right:'10px', bottom:'10px', borderRadius:'50px', backgroundColor:'rgba(0, 133, 117, 0.8)', color:'white', padding:'10px 12px', fontSize:'13px', cursor:'pointer',zIndex:10, display:'flex', gap:'4px', fontWeight:600, alignItems:'center'}}>
        <IoMdHelpCircleOutline style={{fontSize:'15px'}}/>
        <span>Help</span>
      </div>
    </AuthContext.Provider>
  );
}
