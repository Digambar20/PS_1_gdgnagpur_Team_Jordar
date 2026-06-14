import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";

function AddNewPatient() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    password: "",
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
      await API.post("doctor/patients", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Patient added successfully ✅");

      setFormData({
        name: "",
        email: "",
        age: "",
        phone: "",
        password: "",
      });

      navigate("/doctor/dashboard");
    } catch (err) {
      console.error("ADD PATIENT ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add patient ❌");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f5f7fa" }}
    >
      <div
        className="card shadow border-0 p-4"
        style={{ width: "100%", maxWidth: "500px", borderRadius: "16px" }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#5AA7A7" }}>
          Add New Patient
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "#5AA7A7" }}
          >
            Save Patient
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewPatient;
