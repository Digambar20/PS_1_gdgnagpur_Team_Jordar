const router = require("express").Router();
const patientController = require("../controllers/patientController");
const { isAuthenticated, isPatient } = require("../middleware/auth");

router.get(
  "/dashboard",
  isAuthenticated,
  isPatient,
  patientController.dashboard,
);
router.get("/profile", isAuthenticated, isPatient, patientController.profile);

router.get(
  "/medicines",
  isAuthenticated,
  isPatient,
  patientController.getMyMedicines,
);
router.get(
  "/appointments",
  isAuthenticated,
  isPatient,
  patientController.getMyAppointments,
);

router.post(
  "/appointments",
  isAuthenticated,
  isPatient,
  patientController.requestAppointment,
);

router.get(
  "/doctors",
  isAuthenticated,
  isPatient,
  patientController.getDoctors,
);

module.exports = router;
