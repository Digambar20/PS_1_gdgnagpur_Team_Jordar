function Features() {
  const features = [
    {
      icon: "Rx",
      color: "#1f7a8c",
      title: "Medicine Reminders",
      desc: "Automated alerts at configured time slots.",
    },
    {
      icon: "Ap",
      color: "#3d5a80",
      title: "Appointments",
      desc: "Book, track, and manage doctor visits easily.",
    },
    {
      icon: "Dr",
      color: "#ffb703",
      title: "Doctor Dashboard",
      desc: "Handle patient lists, medicines and visits.",
    },
    {
      icon: "Pt",
      color: "#2a9d8f",
      title: "Patient Dashboard",
      desc: "Quick view of doses, history and appointments.",
    },
  ];

  return (
    <section className="container my-5">
      <div className="text-center mb-4">
        <h2
          className="fw-bold"
          style={{ color: "#3d5a80" }}
        >
          Core Features
        </h2>

        <p
          className="mx-auto text-muted"
          style={{ maxWidth: "650px" }}
        >
          Designed to simplify daily patient care
          with reminder automation and appointment
          visibility.
        </p>
      </div>

      <div className="row g-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="col-12 col-md-6 col-lg-3"
          >
            <div
              className="card border-0 text-center h-100"
              style={{
                borderRadius: "14px",
                boxShadow:
                  "0 8px 22px rgba(32,54,90,.08)",
              }}
            >
              <div className="card-body p-4">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center text-white fw-bold"
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "12px",
                    backgroundColor:
                      feature.color,
                  }}
                >
                  {feature.icon}
                </div>

                <h5 className="fw-bold">
                  {feature.title}
                </h5>

                <p className="text-muted mb-0">
                  {feature.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;