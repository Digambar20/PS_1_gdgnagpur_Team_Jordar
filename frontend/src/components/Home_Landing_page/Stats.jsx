function Stats() {
  const stats = [
    {
      number: "24/7",
      text: "Medicine tracking support",
    },
    {
      number: "5+",
      text: "Doctors available",
    },
    {
      number: "4 Slots",
      text: "Morning to night reminders",
    },
  ];

  return (
    <section
      className="container"
      style={{
        marginTop: "-40px",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div className="row g-3">
        {stats.map((item, index) => (
          <div key={index} className="col-12 col-md-4">
            <div
              className="card border-0 text-center"
              style={{
                borderRadius: "16px",
                boxShadow: "0 14px 30px rgba(31, 66, 112, 0.15)",
              }}
            >
              <div className="card-body py-4">
                <div
                  className="fw-bold"
                  style={{
                    fontSize: "1.6rem",
                    color: "#3d5a80",
                  }}
                >
                  {item.number}
                </div>

                <div className="text-muted">{item.text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
