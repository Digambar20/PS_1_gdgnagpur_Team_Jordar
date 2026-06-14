const router = require("express").Router();
const appointment = require("../controllers/appointmentController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/doctor", isAuthenticated, appointment.doctorAppointments);

router.get("/patient/:id", isAuthenticated, appointment.patientAppointments);

module.exports = router;
