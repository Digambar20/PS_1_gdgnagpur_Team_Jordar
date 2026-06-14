import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";

function PatientDashboard() {
  const [patient, setPatient] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/patient/dashboard");

        setPatient(res.data.patient);
        setMedicines(res.data.medicines);
        setAppointments(res.data.appointments);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  if (!patient) {
    return (
      <div className="text-center mt-5">
        <h4>Loading dashboard...</h4>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#5AA7A7" }}
      >
        <div className="container">
          <span className="navbar-brand fw-bold">Patient-Tracker</span>

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container py-4">
        <div
          className="card border-0 shadow-sm mb-4"
          style={{ borderRadius: "15px" }}
        >
          <div className="card-body">
            <h4 className="fw-bold" style={{ color: "#5AA7A7" }}>
              Welcome, {patient.name}
            </h4>

            <p>Email: {patient.email}</p>
            <p>Phone: {patient.phone}</p>
          </div>
        </div>

        <div
          className="card border-0 shadow-sm mb-4"
          style={{ borderRadius: "15px" }}
        >
          <div className="card-body">
            <h5 className="fw-bold mb-3" style={{ color: "#5AA7A7" }}>
              Current Medicines
            </h5>

            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Dosage</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                {medicines.length > 0 ? (
                  medicines.map((med, i) => (
                    <tr key={i}>
                      <td>{med.name}</td>
                      <td>{med.dosage}</td>
                      <td>{med.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No medicines assigned
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: "15px" }}
        >
          <div className="card-body">
            <h5 className="fw-bold mb-3" style={{ color: "#6C8CBF" }}>
              Upcoming Appointments
            </h5>

            <ul className="list-group">
              {appointments.length > 0 ? (
                appointments.map((app, i) => (
                  <li key={i} className="list-group-item">
                    {new Date(app.date).toDateString()} - {app.appointmentTime}
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center">
                  No appointments found
                </li>
              )}
            </ul>
          </div>
        </div>

        <Link to="/patient/request-appointment">
          <button
            className="btn mt-4 text-white"
            style={{ backgroundColor: "#5AA7A7" }}
          >
            Request Appointment
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PatientDashboard;
