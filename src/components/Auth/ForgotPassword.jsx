import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData();
    formData.append("email", email);

    try {
      const res = await fetch("http://localhost/learnAPI/forgot_password.php", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("We emailed you a password reset link.");
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("Network error.");
    }

    setLoading(false);
  };

  return (
    <div style={{ width: "300px", margin: "auto", paddingTop: "50px" }}>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px" }}
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>

      {status && <p style={{ marginTop: "15px" }}>{status}</p>}
    </div>
  );
}
