import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const btnStyle1 = {
    backgroundColor: "#e7f4f7",
    color: "#1f3d4d",
    border: "none",
  };

  const btnStyle2 = {
    backgroundColor: "#f7eac5",
    color: "#1f3d4d",
    border: "none",
  };

  const btnStyle3 = {
    backgroundColor: "#4a5e8f",
    color: "white",
    border: "none",
  };

  return (
    <nav className="navbar py-3" style={{ backgroundColor: "#2d8b9e" }}>
      <div className="container">
        <Link
          to="/"
          className="navbar-brand text-white fw-bold fs-3"
          onClick={closeMenu}
        >
          Patient-Tracker
        </Link>

        <div className="d-none d-md-flex gap-3">
          <Link
            to="/"
            className="btn rounded-pill px-4 py-2 fw-semibold"
            style={btnStyle1}
          >
            Home
          </Link>

          <Link
            to="/login"
            className="btn rounded-pill px-4 py-2 fw-semibold"
            style={btnStyle2}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="btn rounded-pill px-4 py-2 fw-semibold"
            style={btnStyle3}
          >
            Register
          </Link>
        </div>

        <div className="d-md-none">
          <button
            onClick={toggleMenu}
            className="btn fw-semibold text-white"
            style={{
              background: "#4a5e8f",
              border: "none",
            }}
          >
            ☰ Menu
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="d-md-none py-3" style={{ backgroundColor: "#2d8b9e" }}>
          <div className="container d-flex justify-content-center gap-2 flex-wrap">
            <Link
              to="/"
              className="btn rounded-pill px-3 py-2 fw-semibold"
              style={btnStyle1}
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              to="/login"
              className="btn rounded-pill px-3 py-2 fw-semibold"
              style={btnStyle2}
              onClick={closeMenu}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn rounded-pill px-3 py-2 fw-semibold"
              style={btnStyle3}
              onClick={closeMenu}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
