function ViewNotifications() {
  const logs = [];

  return (
    <div className="container py-5" style={{ minHeight: "100vh" }}>
      <h2 className="fw-bold mb-4" style={{ color: "#6C8CBF" }}>
        Notification History
      </h2>

      <div className="card shadow border-0">
        <div className="card-body">
          {logs.length === 0 ? (
            <p className="text-muted">No notification logs yet.</p>
          ) : (
            <table className="table"></table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewNotifications;
