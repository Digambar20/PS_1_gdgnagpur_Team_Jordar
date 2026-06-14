function CTA() {
  return (
    <section className="container my-5">
      <div
        className="p-4 p-md-5"
        style={{
          borderRadius: "18px",
          color: "white",
          background: "linear-gradient(125deg,#3d5a80 0%,#1f7a8c 100%)",
          boxShadow: "0 15px 28px rgba(31,66,112,.22)",
        }}
      >
        <div className="row align-items-center">
          <div className="col-md-8">
            <h3 className="fw-bold">Ready to manage care more efficiently?</h3>

            <p
              style={{
                color: "rgba(255,255,255,.8)",
              }}
            >
              Start now and keep medicine reminders and appointments on track.
            </p>
          </div>

          <div className="col-md-4 text-md-end">
            <a href="/register">
              <button className="btn btn-warning rounded-pill px-4 fw-bold">
                Create Account
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
