import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axiosInstance";

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/doctor/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter((a) =>
    a.patient?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading appointments...</h4>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
      }}
    >
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: "#6C8CBF" }}>
              📅 Appointments
            </h2>
            <p className="text-muted mb-0">
              Manage all upcoming patient appointments
            </p>
          </div>

          <Link to="/doctor/dashboard" className="btn btn-success rounded px-3">
            Dashboard
          </Link>
        </div>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h3 className="fw-bold text-primary">{appointments.length}</h3>
                <p className="mb-0 text-muted">Total Appointments</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h3 className="fw-bold text-success">
                  {
                    appointments.filter((a) => new Date(a.date) >= new Date())
                      .length
                  }
                </h3>
                <p className="mb-0 text-muted">Upcoming</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h3 className="fw-bold text-warning">
                  {appointments.filter((a) => a.createdBy === "patient").length}
                </h3>
                <p className="mb-0 text-muted">Requested by Patients</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <input
              type="text"
              className="form-control"
              placeholder="Search patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="row g-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((a) => (
              <div key={a._id} className="col-lg-6">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "16px",
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
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
                        <h5 className="fw-bold mb-0">{a.patient?.name}</h5>
                        <small className="text-muted">{a.patient?.email}</small>
                      </div>
                    </div>

                    <hr />

                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(a.date).toLocaleDateString()}
                    </p>

                    <p>
                      <strong>Time:</strong>{" "}
                      {a.appointmentTime || "Not specified"}
                    </p>

                    <p>
                      <strong>Notes:</strong> {a.notes || "No notes"}
                    </p>

                    <span
                      className={`badge ${
                        a.createdBy === "doctor"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      Created by {a.createdBy}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <h5>No appointments found</h5>
                  <p className="text-muted">
                    There are currently no scheduled appointments.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAppointments;
