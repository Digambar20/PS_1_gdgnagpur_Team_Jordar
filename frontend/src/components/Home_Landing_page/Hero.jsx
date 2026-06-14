import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="position-relative overflow-hidden text-white text-center py-5"
      style={{
        background:
          "linear-gradient(130deg,#1f7a8c 0%,#3d5a80 52%,#264653 100%)",
      }}
    >
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "380px",
          height: "380px",
          background: "rgba(255,255,255,0.09)",
          top: "-120px",
          right: "-80px",
        }}
      ></div>

      <div
        className="position-absolute rounded-circle"
        style={{
          width: "240px",
          height: "240px",
          background: "rgba(255,255,255,0.10)",
          left: "-80px",
          bottom: "-90px",
        }}
      ></div>

      <div className="container position-relative">
        <span
          className="d-inline-block rounded-pill px-3 py-2 mb-3"
          style={{
            background: "rgba(255,255,255,.16)",
            border: "1px solid rgba(255,255,255,.3)",
          }}
        >
          Patient Medicine + Appointment Tracker
        </span>

        <h1
          className="fw-bold mx-auto"
          style={{
            maxWidth: "950px",
            fontSize: "clamp(2rem,5vw,3.1rem)",
            lineHeight: "1.15",
          }}
        >
          One place to track medicines, appointments, and patient follow-ups.
        </h1>

        <p
          className="lead mx-auto mb-4"
          style={{
            maxWidth: "650px",
            color: "rgba(255,255,255,.9)",
          }}
        >
          Built for doctors and patients to reduce missed doses, prevent missed
          visits, and keep treatment history organized.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link
            className="btn btn-light btn-lg rounded-pill fw-bold px-4"
            to="/login"
          >
            Login
          </Link>

          <Link
            className="btn btn-outline-light btn-lg rounded-pill fw-bold px-4"
            to="/register"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
