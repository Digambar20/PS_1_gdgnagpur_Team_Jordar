import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosInstance";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    password: "",
    role: "",
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
      const res = await API.post("/auth/register", formData);

      alert(res.data.message || "Registration successful");

      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #5AA7A7, #6C8CBF)",
        padding: "20px",
      }}
    >
      <div
        className="bg-white shadow"
        style={{
          width: "100%",
          maxWidth: "460px",
          borderRadius: "16px",
          padding: "2rem",
        }}
      >
        <h3 className="text-center fw-bold mb-3">Create Account</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            className="form-control mb-2"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            className="form-control mb-2"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="age"
            type="number"
            className="form-control mb-2"
            placeholder="Age"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            className="form-control mb-2"
            placeholder="Phone"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="form-select mb-3"
            onChange={handleChange}
            required
          >
            <option value="">Select role</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>

          <button
            className="btn w-100 text-white"
            style={{ background: "#5AA7A7" }}
          >
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/login" style={{ color: "#6C8CBF", fontWeight: 500 }}>
            Already have account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
