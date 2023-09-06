const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patients");
const { ensureAuth } = require("../middleware/auth");

router.get("/profile", ensureAuth, patientsController.getProfile);
router.post("/createPatient", patientsController.createPatient);
router.put("/addCal/:id", patientsController.addCal);
router.put("/addMed/:id", patientsController.addMed);
router.put("/addShop/:id", patientsController.addShop);

module.exports = router;

