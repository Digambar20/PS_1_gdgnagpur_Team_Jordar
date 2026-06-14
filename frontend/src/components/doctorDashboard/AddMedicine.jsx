import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axiosInstance";

function AddMedicine() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/doctor/medicines", {
        name,
        description,
      });

      alert("Medicine added successfully");

      setName("");
      setDescription("");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding medicine");
    }
  };

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
      <div style={{ background: "#6C8CBF", color: "white", padding: "20px 0" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fw-bold mb-0">➕ Add Medicine</h3>
            <small style={{ opacity: 0.9 }}>
              Create and manage medicine records
            </small>
          </div>

          <Link to="/doctor/dashboard" className="btn btn-success rounded px-3">
            Dashboard
          </Link>
        </div>
      </div>

      <div className="container py-5 d-flex justify-content-center">
        <div
          className="card border-0 shadow-sm"
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "16px",
          }}
        >
          <div className="card-body p-4">
            <h4
              className="fw-bold mb-4 text-center"
              style={{ color: "#6C8CBF" }}
            >
              🏥 Medicine Details
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Medicine Name</label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  placeholder="e.g. Paracetamol"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control shadow-sm"
                  placeholder="Enter medicine description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 fw-bold"
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                💾 Save Medicine
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMedicine;
