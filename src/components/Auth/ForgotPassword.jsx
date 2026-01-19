import { useState } from "react";
import MwangazaLogo from '../../assets/MwangazaLogo.jpg';
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigateTo = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user_id, setUser_id] = useState(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState(""); // store token in memory

  // -------------------- DEVICE FINGERPRINT --------------------
  function buildDeviceString() {
    const os =
        navigator.userAgentData?.platform || navigator.platform || "unknown";

    const deviceType =
        navigator.userAgentData?.mobile ? "mobile" : "desktop";

    const cores = navigator.hardwareConcurrency || 0;
    const memory = navigator.deviceMemory || 0;

    const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";

    const language = navigator.language || "unknown";

    const coreBucket = cores <= 4 ? "l" : cores <= 8 ? "m" : "h";
    const memoryBucket = memory <= 4 ? "l" : memory <= 8 ? "m" : "h";

    return [
        os,
        deviceType,
        coreBucket,
        memoryBucket,
        timezone,
        language
    ].join("_");
  }

  /* STEP 1: VERIFY USER */
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData();
    formData.append("username_or_email", usernameOrEmail);
    formData.append("phone_number", phoneNumber);
    formData.append("device_fingerprint", buildDeviceString()); // use device string directly

    try {
      const res = await fetch(
        "https://www.tanzcoffee.co.tz/mwangaza_hub/forgot_password.php",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok && data.verified) {
        setResetToken(data.reset_token);
        setStatus("User verified. Please enter a new password.");
        setUser_id(data.user_id);
      } else {
        setStatus(data.error || "Invalid user details.");
      }
    } catch (err) {
      setStatus("Network error. " + err);
    }

    setLoading(false);
  };

  /* STEP 2: RESET PASSWORD */
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }

    setLoading(true);
    setStatus("");

    const formData = new FormData();
    formData.append("reset_token", resetToken);
    formData.append("new_password", newPassword);
    formData.append('user_id', user_id);

    try {
      const res = await fetch(
        "https://www.tanzcoffee.co.tz/mwangaza_hub/reset_password.php",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("Password reset successful. You can now log in.");
        setUsernameOrEmail("");
        setPhoneNumber("");
        setNewPassword("");
        setConfirmPassword("");
        setResetToken("");
      } else {
        setStatus(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setStatus("Network error.");
    }

    setLoading(false);
  };

  return (
    <section>
      {/* Top nav bar */}
      <div style={{
        position:'relative', top:0, left:0, width:'100%', height:'fit-content',
        minHeight:'80px', backgroundColor:'#253957', color:'white', zIndex:1,
        display:'flex', justifyContent:'space-between', padding:'10px 15px',
        alignItems:'center', flexWrap:'wrap', gap:'15px'
      }}>
        <div style={{display:'flex', gap:'10px', height:'fit-content', alignItems:'center'}}>
          <img src={MwangazaLogo} alt="logo" width={'60px'} height={'60px'} style={{borderRadius:'50%'}} />
          <span style={{fontSize:'17px', fontWeight:600, textAlign:'center'}}>
            Mwangaza Knowledge Hub
          </span>
        </div>
        <div style={{display:'flex', gap:'30px', fontSize:'14px', fontWeight:500}}> 
          <span style={{cursor:'pointer'}} onClick={()=>{navigateTo('/')}}>Home</span>
          <span style={{cursor:'pointer'}} onClick={()=>{navigateTo('/auth/sign_in')}}>Sign In</span>
        </div>
      </div>

      <div style={{ width: "320px", margin: "auto", paddingTop: "50px" }}>
        <h2 style={{textAlign:'center', marginBottom:'10px'}}>Forgot Password</h2>

        {/* STEP 1: VERIFY FORM */}
        {!resetToken && (
          <form onSubmit={handleVerify}>
            <input
              type="text"
              placeholder="user@1"
              value={usernameOrEmail}
              required
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius:'5px', border:'1px solid rgba(71, 71, 71, 1)' }}
            />

            <input
              type="tel"
              placeholder="0718997766"
              value={phoneNumber}
              required
              minLength={10}
              maxLength={10}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius:'5px', border:'1px solid rgba(58, 57, 57, 1)' }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "10px", cursor:'pointer' }}
            >
              {loading ? "Verifying..." : "Verify user"}
            </button>
          </form>
        )}

        {/* STEP 2: RESET PASSWORD FORM */}
        {resetToken && (
          <form onSubmit={handleResetPassword} style={{ marginTop: "20px" }}>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "10px" }}
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </form>
        )}

        {status && <p style={{ marginTop: "15px", color: "#333" }}>{status}</p>}
      </div>
    </section>
  );
}
