const Medicine = require("../models/medicine");

exports.getPatientMedicines = async (req, res) => {
  try {
    const patientId = req.params.id;

    if (req.user.role === "patient" && req.user.id !== patientId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const meds = await Medicine.find({ patient: patientId });

    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
