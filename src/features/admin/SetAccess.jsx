import React, { useState } from "react";

export default function SetAccess() {
  const [purchase, setPurchase] = useState({
    student_id: "",
    course_id: "",
    module_id: "",
  });

  async function handlePurchaseSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("student_id", purchase.student_id);
    formData.append("course_id", purchase.course_id);
    if (purchase.module_id) formData.append("module_id", purchase.module_id);

    try {
      const res = await fetch(
        "https://www.tanzcoffee.co.tz/mwangaza-backend/insert_purchase.php",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Purchase inserted successfully");
        setPurchase({ student_id: "", course_id: "", module_id: "" });
      } else {
        alert(data.error || "Failed to insert purchase");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  }

  return (
    <form onSubmit={handlePurchaseSubmit} style={boxStyle}>
      <h3>Insert Purchase Record</h3>

      <input
        type="number"
        placeholder="Student ID"
        value={purchase.student_id}
        required
        style={inputStyle}
        onChange={(e) =>
          setPurchase({ ...purchase, student_id: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Course ID"
        value={purchase.course_id}
        required
        style={inputStyle}
        onChange={(e) =>
          setPurchase({ ...purchase, course_id: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Module ID (optional)"
        value={purchase.module_id}
        style={inputStyle}
        onChange={(e) =>
          setPurchase({ ...purchase, module_id: e.target.value })
        }
      />

      <button style={btnStyle}>Add Purchase</button>
    </form>
  );
}

/* styles */
const boxStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "400px",
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
