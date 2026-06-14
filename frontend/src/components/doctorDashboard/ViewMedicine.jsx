import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axiosInstance";

function ViewMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMedicines();
  }, []);

  useEffect(() => {
    const result = medicines.filter((med) =>
      med.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFiltered(result);
  }, [search, medicines]);

  const loadMedicines = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/doctor/medicines");

      const data = Array.isArray(res.data) ? res.data : res.data || [];

      setMedicines(data);
      setFiltered(data);
    } catch (err) {
      console.log(err);
      setError("Failed to load medicines");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
      <div style={{ background: "#6C8CBF", color: "white", padding: "20px 0" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fw-bold mb-1">💊 Medicine Library</h3>
            <small style={{ opacity: 0.9 }}>
              Search and explore all available medicines
            </small>
          </div>

          <Link to="/doctor/dashboard" className="btn btn-success rounded px-3">
            Dashboard
          </Link>
        </div>

        <div className="container mt-3">
          <input
            type="text"
            placeholder="🔍 Search medicines (e.g. Paracetamol, Antibiotic...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control shadow-sm"
            style={{
              borderRadius: "12px",
              padding: "12px",
              border: "none",
            }}
          />
        </div>
      </div>

      <div className="container py-4">
        {loading && <p>Loading medicines...</p>}

        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center text-muted mt-5">
            😕 No medicines found
          </div>
        )}

        <div className="row g-4">
          {filtered.map((med) => (
            <div className="col-md-4" key={med._id}>
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "14px",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-6px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0px)")
                }
              >
                <div className="card-body p-4">
                  <h5 style={{ color: "#6C8CBF", fontWeight: "700" }}>
                    💊 {med.name}
                  </h5>

                  <p className="text-muted mt-2 mb-0">
                    {med.description || "No description available"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewMedicines;
