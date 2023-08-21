const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patients");
const { ensureAuth } = require("../middleware/auth");

//Patient Routes - simplified for now
router.get("/:id", ensureAuth, patientsController.getPatient);

// router.get("/getCsv/:id", patientsController.getCsv);

router.post("/createPatient", patientsController.createPatient);

// router.put("/editPatient/:id", patientsController.editPatient);

// router.delete("/deletePatient/:id", patientsController.deletePatient);

// router.delete("/deleteAcct/:id", patientsController.deleteAcct);

module.exports = router;

