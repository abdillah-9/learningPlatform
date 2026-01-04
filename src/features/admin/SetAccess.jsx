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
    <div style={{ padding: "15px" }}>
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
        <h3>Recent Purchases</h3>
        <ul>
          {recentPurchases.map((p) => (
            <li key={p.id}>
              Student ID: {p.student_id}, Course ID: {p.course_id}, Module ID: {p.module_id || "N/A"}, Purchased At: {p.purchased_at}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* styles */
const boxStyle = { border: "1px solid #ccc", padding: "20px", borderRadius: "10px", maxWidth: "400px", marginBottom: "30px" };
const inputStyle = { width: "100%", padding: "10px", marginBottom: "10px" };
const btnStyle = { padding: "10px 20px", background: "#0C2B4E", color: "white", border: "none", cursor: "pointer" };
