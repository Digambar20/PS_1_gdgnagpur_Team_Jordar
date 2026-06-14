import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";

function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [docRes, patientRes] = await Promise.all([
        API.get("/doctor/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        API.get("/doctor/patients", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      console.log("DOCTOR API RESPONSE:", docRes.data);
      setDoctor(docRes.data?.doctor || null);
      setPatients(patientRes.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
      <nav
        className="navbar navbar-dark shadow-sm"
        style={{ background: "#6C8CBF" }}
      >
        <div className="container">
          <span className="navbar-brand fw-bold">Patient-Tracker</span>

          <div className="d-flex gap-2">
            <Link to="/" className="btn btn-light btn-sm">
              Home
            </Link>
            <button onClick={handleLogout} className="btn btn-danger btn-sm">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <h4 className="fw-bold">
              👨‍⚕️ Welcome,{" "}
              <span style={{ color: "#6C8CBF" }}>
                Dr. {doctor?.name || doctor?.email || "Doctor"}
              </span>
            </h4>
            <p className="text-muted mb-0">
              Manage patients, medicines, and appointments
            </p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-2" style={{ color: "#BAC94A" }}>
                  🧑‍🤝‍🧑 Patients
                </h5>

                <p className="text-muted">
                  View all registered patients or add a new one.
                </p>

                <Link to="/doctor/patient/new" className="btn btn-success me-2">
                  + Add New Patient
                </Link>

                <Link to="/doctor/patients" className="btn btn-outline-success">
                  View All
                </Link>

                <div className="mt-3">
                  {patients.slice(0, 3).map((p) => (
                    <div
                      key={p._id}
                      className="d-flex justify-content-between border-bottom py-2"
                    >
                      <small>{p.name}</small>
                      <Link
                        to={`/doctor/patients/${p._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-2" style={{ color: "#BAC94A" }}>
                  💊 Medicines
                </h5>

                <p className="text-muted">
                  Add and manage medicines for patients.
                </p>

                <Link
                  to="/doctor/medicines/add"
                  className="btn btn-success me-2"
                >
                  + Add Medicine
                </Link>

                <Link
                  to="/doctor/medicines"
                  className="btn btn-outline-success"
                >
                  View Medicines
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-2" style={{ color: "#E2D36B" }}>
                  📅 Appointments
                </h5>

                <p className="text-muted">
                  Manage upcoming patient appointments.
                </p>

                <Link to="/doctor/appointments" className="btn btn-warning">
                  View Appointments
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-2" style={{ color: "#6C8CBF" }}>
                  🔔 Notifications
                </h5>

                <p className="text-muted">View system logs and alerts.</p>

                <Link to="/doctor/dashboard" className="btn btn-primary">
                  View Logs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
