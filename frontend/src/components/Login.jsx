import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      
      if (res.data.user.role === "patient") {
        navigate("/patient/dashboard");
      } else {
        navigate("/doctor/dashboard");
      }
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
          maxWidth: "420px",
          borderRadius: "15px",
          padding: "2rem",
        }}
      >
        <h3 className="text-center fw-bold mb-3" style={{ color: "#263238" }}>
          Patient-Tracker Login
        </h3>

        <p className="text-center text-muted mb-4">
          Login as Doctor or Patient
        </p>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          
          <button
            type="submit"
            className="btn w-100 text-white fw-semibold"
            style={{
              backgroundColor: "#5AA7A7",
              border: "none",
              padding: "10px",
            }}
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#6C8CBF", fontWeight: 500 }}>
              Register
            </Link>
          </small>
        </div>

        
        <div className="text-center mt-2">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#6C8CBF",
              fontWeight: "500",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
