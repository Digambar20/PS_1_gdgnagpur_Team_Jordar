const User = require("../models/user");
const Medicine = require("../models/medicine");
const Appointment = require("../models/appoinment");

exports.dashboard = async (req, res) => {
  const patient = await User.findById(req.user.id);

  const today = new Date();

  const medicines = await Medicine.find({
    patient: patient._id,
    startDate: { $lte: today },
    endDate: { $gte: today },
  });

  const pastMedicines = await Medicine.find({
    patient: patient._id,
    endDate: { $lt: today },
  });

  const appointments = await Appointment.find({ patient: patient._id });

  res.json({ patient, medicines, pastMedicines, appointments });
};

exports.profile = async (req, res) => {
  const patient = await User.findById(req.user.id);
  res.json(patient);
};

// REQUEST APPOINTMENT (FIXED)
exports.requestAppointment = async (req, res) => {
  const appointment = new Appointment({
    patient: req.user.id, // ✅ FIXED (JWT)
    doctor: req.body.doctorId,
    date: new Date(req.body.date),
    appointmentTime: req.body.time,
    notes: req.body.notes,
    createdBy: "patient",
  });

  await appointment.save();

  res.json({ message: "Appointment requested" });
};

exports.getMyMedicines = async (req, res) => {
  const medicines = await Medicine.find({
    patient: req.user.id,
  }).populate("doctor", "name");

  res.json(medicines);
};

/* Patient sees appointments */
exports.getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    patient: req.user.id,
  })
    .populate("doctor", "name")
    .sort({ appointmentDate: -1 });

  res.json(appointments);
};

exports.getDoctors = async (req, res) => {
  const doctors = await User.find({ role: "doctor" }).select(
    "name email specialization",
  );

  res.json(doctors);
};
