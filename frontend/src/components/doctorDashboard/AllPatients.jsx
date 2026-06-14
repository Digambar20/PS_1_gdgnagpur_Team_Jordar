import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axiosInstance";

function AllPatients() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/doctor/patients");
        setPatients(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredUsers = patients.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
      <div style={{ background: "#6C8CBF", color: "white", padding: "20px 0" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fw-bold mb-0">🧑‍🤝‍🧑 All Patients</h3>
            <small style={{ opacity: 0.9 }}>
              Search and manage registered patients
            </small>
          </div>

          <Link to="/doctor/dashboard" className="btn btn-success rounded px-3">
            Dashboard
          </Link>
        </div>

        <div className="container mt-3">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="🔍 Search patient by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              borderRadius: "12px",
              padding: "12px",
              border: "none",
            }}
          />
        </div>
      </div>

      <div className="container py-4">
        {loading && <h5 className="text-center mt-5">Loading patients...</h5>}

        <div className="row g-4">
          {!loading && filteredUsers.length > 0
            ? filteredUsers.map((user) => (
                <div key={user._id} className="col-lg-4 col-md-6">
                  <Link
                    to={`/doctor/patients/${user._id}`}
                    className="text-decoration-none"
                  >
                    <div
                      className="card border-0 h-100 shadow-sm"
                      style={{
                        borderRadius: "14px",
                        transition: "0.3s",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "translateY(-5px)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "translateY(0px)")
                      }
                    >
                      <div className="card-body d-flex align-items-center p-3">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                          alt="Patient"
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            marginRight: "15px",
                          }}
                        />

                        <div>
                          <h5
                            className="mb-1 fw-bold"
                            style={{ color: "#6C8CBF" }}
                          >
                            {user.name}
                          </h5>
                          <small className="text-muted">{user.email}</small>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : !loading && (
                <div className="col-12 text-center">
                  <p className="text-muted">No patients found.</p>
                </div>
              )}
        </div>
      </div>
    </div>
  );
}

export default AllPatients;
