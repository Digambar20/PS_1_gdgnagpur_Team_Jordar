import { useState, useEffect } from "react";
import API from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function RequestAppointment() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get("/patient/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchDoctors();
  }, []);

  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    appointmentTime: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/patient/appointments", formData);

      alert("Appointment requested successfully");

      navigate("/patient/dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f5f7fa" }}
    >
      <div
        className="card shadow border-0 p-4"
        style={{ width: "100%", maxWidth: "550px", borderRadius: "16px" }}
      >
        <h3 className="fw-bold text-center mb-4" style={{ color: "#5AA7A7" }}>
          Request Appointment
        </h3>

        <form onSubmit={handleSubmit}>
          <select
            className="form-select mb-3"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>

            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                Dr. {doctor.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            className="form-control mb-3"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="appointmentTime"
            className="form-control mb-3"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />

          <textarea
            name="notes"
            rows="3"
            className="form-control mb-3"
            placeholder="Reason / Notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <button
            className="btn text-white w-100"
            style={{ backgroundColor: "#5AA7A7" }}
          >
            Request Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestAppointment;
