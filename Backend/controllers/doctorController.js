const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Medicine = require("../models/medicine");
const Appointment = require("../models/appoinment");
const MedicineMaster = require("../models/MedicineMaster");

exports.dashboard = async (req, res) => {
  try {
    const doctor = await User.findById(req.user.id).select("-password");

    res.json({ doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDoctorPatients = async (req, res) => {
  try {
    const patients = await User.find({
      role: "patient",
    }).select("name email phone age");

    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch patients" });
  }
};

exports.addPatientByDoctor = async (req, res) => {
  try {
    const { name, email, age, phone, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = await User.create({
      name,
      email,
      age,
      phone,
      password: hashedPassword,
      role: "patient",
      createdByDoctor: req.user.id,
    });

    res.status(201).json({
      message: "Patient added successfully",
      patient,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.viewPatient = async (req, res) => {
  try {
    const patient = await User.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const medicines = await Medicine.find({ patient: patient._id });
    const appointments = await Appointment.find({ patient: patient._id });

    res.json({ patient, medicines, appointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addMedicine = async (req, res) => {
  try {
    const { name, dosage, times, startDate, endDate } = req.body;

    const medicine = new Medicine({
      patient: req.params.id,
      doctor: req.user.id,
      name,
      dosage,
      times,
      startDate,
      endDate,
    });

    await medicine.save();

    res.status(201).json({
      message: "Medicine prescribed successfully",
      medicine,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { date, notes } = req.body;

    const appointment = new Appointment({
      patient: req.params.id,
      doctor: req.user.id,
      date,
      notes,
      createdBy: "doctor",
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment scheduled",
      appointment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPastMedicines = async (req, res) => {
  const medicines = await Medicine.find({
    doctor: req.user.id,
    endDate: { $lt: new Date() },
  }).populate("patient", "name email");

  res.json(medicines);
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id,
    })
      .populate("patient", "name email")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addMedicineMaster = async (req, res) => {
  try {
    const { name, description } = req.body;

    const exists = await MedicineMaster.findOne({
      name,
    });

    if (exists) {
      return res.status(400).json({
        message: "Medicine already exists",
      });
    }

    const medicine = await MedicineMaster.create({
      name,
      description,
    });

    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await MedicineMaster.find({})
      .select("name description createdAt")
      .sort({ name: 1 });

    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch medicines" });
  }
};

exports.getAllDoctorsPublic = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select(
      "name email phone",
    );

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
