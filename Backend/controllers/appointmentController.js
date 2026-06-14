const Appointment = require("../models/appoinment");

exports.doctorAppointments = async (req, res) => {
  try {
    const data = await Appointment.find({ doctor: req.user.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.patientAppointments = async (req, res) => {
  try {
    const patientId = req.params.id;

    if (req.user.role === "patient" && req.user.id !== patientId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const data = await Appointment.find({ patient: patientId });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
