import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider";

export default function UserPage() {
  const {setUserData} = useContext(AuthContext);
  const [profile, setProfile] = useState({
    full_name: "",
    username_email: "",
    user_pic: null,
  });

  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  async function handleProfileUpdate(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("full_name", profile.full_name);
    formData.append("username_email", profile.username_email);
    if (profile.user_pic) formData.append("user_pic", profile.user_pic);

    const res = await fetch("https://www.tanzcoffee.co.tz/mwangaza-backend/update_profile.php", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    // 1️⃣ Update context (UI updates immediately)
    setUserData(data.user);

    // 2️⃣ Persist it (refresh-safe)
    localStorage.setItem("user", JSON.stringify(data.user));
    alert(data.message || data.error);
  }

  async function handlePasswordUpdate(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('token',localStorage.getItem("token")); 

    if (passwords.new_password !== passwords.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("https://www.tanzcoffee.co.tz/mwangaza-backend/update_password.php", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    alert(data.message || data.error);
  }

  return (
    <div style={{ padding: "30px", maxWidth: "600px" }}>
      {/* PROFILE FORM */}
      <form onSubmit={handleProfileUpdate} style={boxStyle}>
        <h3>Update Profile</h3>

        <input
          placeholder="Full Name"
          style={inputStyle}
          onChange={(e) =>
            setProfile({ ...profile, full_name: e.target.value })
          }
        />

        <input
          placeholder="Username or Email"
          style={inputStyle}
          onChange={(e) =>
            setProfile({ ...profile, username_email: e.target.value })
          }
        />

        <input
          type="file"
          style={inputStyle}
          onChange={(e) =>
            setProfile({ ...profile, user_pic: e.target.files[0] })
          }
        />

        <button style={btnStyle}>Update Profile</button>
      </form>

      {/* PASSWORD FORM */}
      <form onSubmit={handlePasswordUpdate} style={boxStyle}>
        <h3>Change Password</h3>

        <input
          type="password"
          placeholder="Old Password"
          name="old_password" 
          style={inputStyle}
          onChange={(e) =>
            setPasswords({ ...passwords, old_password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          name="new_password" 
          style={inputStyle}
          onChange={(e) =>
            setPasswords({ ...passwords, new_password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          style={inputStyle}
          onChange={(e) =>
            setPasswords({ ...passwords, confirm_password: e.target.value })
          }
        />

        <button style={btnStyle}>Change Password</button>
      </form>
    </div>
  );
}

/* styles */
const boxStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "30px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const btnStyle = {
  padding: "10px 20px",
  background: "#0C2B4E",
  color: "white",
  border: "none",
  cursor: "pointer",
};
