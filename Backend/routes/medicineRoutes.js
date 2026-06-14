const router = require("express").Router();
const medicine = require("../controllers/medicineController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/patient/:id", isAuthenticated, medicine.getPatientMedicines);

module.exports = router;
