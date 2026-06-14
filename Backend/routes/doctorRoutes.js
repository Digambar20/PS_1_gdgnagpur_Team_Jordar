const router = require("express").Router();
const doctorController = require("../controllers/doctorController");
const { isAuthenticated, isDoctor } = require("../middleware/auth");

router.get("/dashboard", isAuthenticated, isDoctor, doctorController.dashboard);

router.get(
  "/patients",
  isAuthenticated,
  isDoctor,
  doctorController.getDoctorPatients,
);

router.post(
  "/patients",
  isAuthenticated,
  isDoctor,
  doctorController.addPatientByDoctor,
);

router.get(
  "/patients/:id",
  isAuthenticated,
  isDoctor,
  doctorController.viewPatient,
);

router.post(
  "/patients/:id/medicines",
  isAuthenticated,
  isDoctor,
  doctorController.addMedicine,
);
router.post(
  "/patients/:id/appointments",
  isAuthenticated,
  isDoctor,
  doctorController.createAppointment,
);
router.get(
  "/past-medicines",
  isAuthenticated,
  isDoctor,
  doctorController.getPastMedicines,
);
router.get(
  "/appointments",
  isAuthenticated,
  isDoctor,
  doctorController.getAppointments,
);
router.post(
  "/medicines",
  isAuthenticated,
  isDoctor,
  doctorController.addMedicineMaster,
);

router.get(
  "/medicines",
  isAuthenticated,
  isDoctor,
  doctorController.getAllMedicines,
);

router.get("/public/doctors", doctorController.getAllDoctorsPublic);

module.exports = router;
