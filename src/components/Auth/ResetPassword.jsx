import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirm) {
      setStatus("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("token", token);
    formData.append("new_password", password);

    const res = await fetch("http://localhost/mwangaza-backend/reset_password.php", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("Password updated successfully! You can now log in.");
    } else {
      setStatus(data.error || "Invalid or expired reset link.");
    }
  };

  if (!token) {
    return <h3>Invalid reset link.</h3>;
  }

  return (
    <div style={{ width: "300px", margin: "auto", paddingTop: "50px" }}>
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          required
          onChange={(e) => setConfirm(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{ width: "100%", padding: "10px" }}
        >
          Reset Password
        </button>
      </form>

      {status && <p style={{ marginTop: "15px" }}>{status}</p>}
    </div>
  );
}
