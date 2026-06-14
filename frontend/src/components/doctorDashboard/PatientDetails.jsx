import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api/axiosInstance";

function PatientDetails() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [medicineList, setMedicineList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [medicineData, setMedicineData] = useState({
    name: "",
    dosage: "",
    times: [],
    startDate: "",
    endDate: "",
  });

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentNotes, setAppointmentNotes] = useState("");

  const fetchPatient = async () => {
    try {
      const res = await API.get(`/doctor/patients/${id}`);

      setPatient(res.data.patient);
      setMedicines(res.data.medicines);
      setAppointments(res.data.appointments);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicineList = async () => {
    try {
      const res = await API.get("/doctor/medicines");
      setMedicineList(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchPatient();
    fetchMedicineList();
  }, [id]);

  const handleAddMedicine = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/doctor/patients/${id}/medicines`, medicineData);

      alert("Medicine prescribed successfully ✅");

      setMedicineData({
        name: "",
        dosage: "",
        times: [],
        startDate: "",
        endDate: "",
      });

      fetchPatient();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to prescribe medicine");
    }
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/doctor/patients/${id}/appointments`, {
        date: appointmentDate,
        notes: appointmentNotes,
      });

      alert("Appointment scheduled ✅");

      setAppointmentDate("");
      setAppointmentNotes("");

      fetchPatient();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to schedule appointment");
    }
  };

  if (loading) {
    return <h4 className="text-center mt-5">Loading patient...</h4>;
  }

  const today = new Date();

  const currentMedicines = medicines.filter(
    (m) => new Date(m.endDate) >= today,
  );

  const pastMedicines = medicines.filter((m) => new Date(m.endDate) < today);

  const upcomingAppointments = appointments.filter(
    (a) => new Date(a.date) >= today,
  );

  const pastAppointments = appointments.filter((a) => new Date(a.date) < today);

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/doctor/patients" className="btn btn-secondary">
            ← Back
          </Link>

          <Link to="/doctor/dashboard" className="btn btn-success">
            🏠 Dashboard
          </Link>
        </div>

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h3 className="fw-bold" style={{ color: "#5AA7A7" }}>
              {patient.name}
            </h3>
            <p className="mb-1">Email: {patient.email}</p>
            <p className="mb-1">Phone: {patient.phone}</p>
            <p className="mb-0">Age: {patient.age}</p>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="p-3 bg-white shadow-sm rounded h-100">
              <h5 className="text-success fw-bold">💊 Current Medicines</h5>

              {currentMedicines.length ? (
                currentMedicines.map((med) => (
                  <div key={med._id} className="border-bottom py-2">
                    <strong>{med.name}</strong>
                    <div className="small text-muted">{med.dosage}</div>
                  </div>
                ))
              ) : (
                <p className="text-muted mb-0">No active medicines</p>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 bg-white shadow-sm rounded h-100">
              <h5 className="text-primary fw-bold">📅 Upcoming Appointments</h5>

              {upcomingAppointments.length ? (
                upcomingAppointments.map((app) => (
                  <div key={app._id} className="border-bottom py-2">
                    <div className="small">
                      {new Date(app.date).toLocaleString()}
                    </div>
                    <div className="text-muted small">{app.notes}</div>
                  </div>
                ))
              ) : (
                <p className="text-muted mb-0">No upcoming appointments</p>
              )}
            </div>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">💊 Prescribe Medicine</h5>

                <form onSubmit={handleAddMedicine} className="row g-3">
                  <div className="col-12">
                    <input
                      list="medicineSuggestions"
                      className="form-control"
                      placeholder="Search Medicine"
                      value={medicineData.name}
                      onChange={(e) =>
                        setMedicineData({
                          ...medicineData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                    <datalist id="medicineSuggestions">
                      {medicineList.map((med) => (
                        <option key={med._id} value={med.name} />
                      ))}
                    </datalist>
                  </div>

                  <div className="col-12">
                    <input
                      className="form-control"
                      placeholder="Dosage"
                      value={medicineData.dosage}
                      onChange={(e) =>
                        setMedicineData({
                          ...medicineData,
                          dosage: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-6">
                    <input
                      type="date"
                      className="form-control"
                      value={medicineData.startDate}
                      onChange={(e) =>
                        setMedicineData({
                          ...medicineData,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-6">
                    <input
                      type="date"
                      className="form-control"
                      value={medicineData.endDate}
                      onChange={(e) =>
                        setMedicineData({
                          ...medicineData,
                          endDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-12">
                    <button className="btn btn-success w-100">Prescribe</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">📅 Schedule Appointment</h5>

                <form onSubmit={handleAddAppointment} className="row g-3">
                  <div className="col-12">
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      className="form-control"
                      placeholder="Notes"
                      value={appointmentNotes}
                      onChange={(e) => setAppointmentNotes(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <button className="btn btn-primary w-100">Schedule</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-3 bg-white shadow-sm rounded">
              <h5 className="fw-bold text-secondary">📜 Past Medicines</h5>

              {pastMedicines.length ? (
                pastMedicines.map((m) => (
                  <div key={m._id} className="border-bottom py-2">
                    <strong>{m.name}</strong>
                    <div className="small text-muted">
                      {new Date(m.startDate).toLocaleDateString()} →{" "}
                      {new Date(m.endDate).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No history</p>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 bg-white shadow-sm rounded">
              <h5 className="fw-bold text-secondary">📜 Appointment History</h5>

              {pastAppointments.length ? (
                pastAppointments.map((a) => (
                  <div key={a._id} className="border-bottom py-2">
                    <div className="small">
                      {new Date(a.date).toLocaleString()}
                    </div>
                    <div className="text-muted small">{a.notes}</div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No history</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
