const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patients");
const { ensureAuth } = require("../middleware/auth");

router.post("/createPatient", patientsController.createPatient);
router.put("/addCal/:id", patientsController.addCal);
router.put("/addMed/:id", patientsController.addMed);
router.put("/addShop/:id", patientsController.addShop);
router.put("/editUser/:id", patientsController.editUser);
router.put("/editPatient/:id", patientsController.editPatient);
router.get("/getCsv/:id", patientsController.getCsv);
router.delete("/deletePatient/:id", patientsController.deletePatient);
router.delete("/deleteAcct/:id", patientsController.deleteAcct);

module.exports = router;

