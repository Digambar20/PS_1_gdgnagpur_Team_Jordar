import { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { doctorImages } from "./DrImages";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctor/public/doctors");
      setDoctors(res.data || []);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (doctorId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/patient/request-appointment`);
  };

  return (
    <section className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: "#3d5a80" }}>
          Meet Our Doctors
        </h2>

        <p className="mx-auto text-muted" style={{ maxWidth: "650px" }}>
          Browse available doctors and connect for timely consultation and
          follow-ups.
        </p>
      </div>

      {loading && (
        <h5 className="text-center text-muted">Loading doctors...</h5>
      )}

      {!loading && doctors.length === 0 && (
        <h5 className="text-center text-danger">No doctors available</h5>
      )}

      <div className="row g-4">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="col-12 col-md-6 col-lg-4">
            <div
              className="card border-0 h-100"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 24px rgba(35,62,102,.14)",
                transition: "0.3s",
              }}
            >
              <img
                src={
                  doctorImages[doctor.email] ||
                  "https://images.unsplash.com/photo-1537368910025-700350fe46c7"
                }
                alt={doctor.name}
                style={{ height: "230px", objectFit: "cover" }}
              />

              <div className="card-body">
                <span
                  className="badge mb-3"
                  style={{
                    backgroundColor: "#edf4ff",
                    color: "#2c4d7d",
                  }}
                >
                  General Physician
                </span>

                <h5 className="fw-bold" style={{ color: "#3d5a80" }}>
                  👨‍⚕️ Dr. {doctor.name}
                </h5>

                <p className="text-muted mb-1">📧 {doctor.email}</p>

                <p className="text-muted mb-3">📞 {doctor.phone}</p>

                <button
                  onClick={() => handleBook(doctor._id)}
                  className="btn btn-outline-primary rounded-pill w-100"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Doctors;
