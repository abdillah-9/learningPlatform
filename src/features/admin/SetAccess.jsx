import React, { useState, useEffect } from "react";

export default function SetAccess() {
  const [purchase, setPurchase] = useState({ student_id: "", course_id: "", module_id: "" });
  const [recentPurchases, setRecentPurchases] = useState([]);

  async function handlePurchaseSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("student_id", purchase.student_id);
    formData.append("course_id", purchase.course_id);
    if (purchase.module_id) formData.append("module_id", purchase.module_id);

    try {
      const res = await fetch(
        "https://www.tanzcoffee.co.tz/mwangaza-backend/insert_purchase.php",
        { method: "POST", credentials: "include", body: formData }
      );
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Purchase inserted successfully");
        setPurchase({ student_id: "", course_id: "", module_id: "" });
        fetchRecentPurchases(); // refresh list after insert
      } else {
        alert(data.error || "Failed to insert purchase");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  }

  async function fetchRecentPurchases() {
    try {
      const res = await fetch(
        "https://www.tanzcoffee.co.tz/mwangaza-backend/fetch_recent_purchases.php",
        { credentials: "include" }
      );
      const data = await res.json();
      setRecentPurchases(data.purchases || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchRecentPurchases();
  }, []);

  return (
    <div style={{ padding: "15px", height:'100vh' }}>
      <form onSubmit={handlePurchaseSubmit} style={boxStyle}>
        <h3>Insert Purchase Record</h3>
        <input
          type="number"
          placeholder="Student ID"
          value={purchase.student_id}
          required
          style={inputStyle}
          onChange={(e) => setPurchase({ ...purchase, student_id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Course ID"
          value={purchase.course_id}
          required
          style={inputStyle}
          onChange={(e) => setPurchase({ ...purchase, course_id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Module ID (optional)"
          value={purchase.module_id}
          style={inputStyle}
          onChange={(e) => setPurchase({ ...purchase, module_id: e.target.value })}
        />
        <button style={btnStyle}>Add Purchase</button>
      </form>

        <div style={{ marginTop: "30px" }}>
        <h3 style={{ marginBottom: "15px" }}>Recent Purchases</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {recentPurchases.map((p) => (
            <div
                key={p.id}
                style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                minWidth: "200px",
                flex: "1 1 200px",
                background: "#f9f9f9",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
            >
                <p><strong>Student ID:</strong> {p.student_id}</p>
                <p><strong>Course ID:</strong> {p.course_id}</p>
                <p><strong>Module ID:</strong> {p.module_id || "N/A"}</p>
                <p style={{ fontSize: "12px", color: "#555" }}>
                <strong>Purchased At:</strong> {new Date(p.purchased_at).toLocaleString()}
                </p>
            </div>
            ))}
        </div>
        </div>

    </div>
  );
}

/* styles */
const boxStyle = { border: "1px solid #ccc", padding: "20px", borderRadius: "10px", maxWidth: "400px", marginBottom: "30px" };
const inputStyle = { width: "100%", padding: "10px", marginBottom: "10px" };
const btnStyle = { padding: "10px 20px", background: "#0C2B4E", color: "white", border: "none", cursor: "pointer" };
