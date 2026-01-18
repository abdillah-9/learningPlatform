import { useState } from "react";

export default function ForgotPassword() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState(""); // store token in memory

  /* STEP 1: VERIFY USER */
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData();
    formData.append("username_or_email", usernameOrEmail);
    formData.append("phone_number", phoneNumber);

    try {
      const res = await fetch(
        "https://your-backend-domain.com/forgot_password.php",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok && data.verified) {
        setResetToken(data.reset_token); // store token in memory
        setStatus("User verified. Please enter a new password.");
      } else {
        setStatus(data.error || "Invalid user details.");
      }
    } catch (err) {
      setStatus("Network error.");
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

    try {
      const res = await fetch(
        "https://your-backend-domain.com/reset_password.php",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("Password reset successful. You can now log in.");
        // Clear all fields
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
    <div style={{ width: "320px", margin: "auto", paddingTop: "50px" }}>
      <h2>Forgot Password</h2>

      {/* STEP 1: VERIFY FORM */}
      {!resetToken && (
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="user@1"
            value={usernameOrEmail}
            required
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="tel"
            placeholder="0718997766"
            value={phoneNumber}
            required
            minLength={10}
            maxLength={10}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "10px" }}
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
  );
}
