const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patients");
const { ensureAuth } = require("../middleware/auth");

router.post("/createPatient", patientsController.createPatient);
router.put("/addCal/:id", patientsController.addCal);
router.put("/addDoc/:id", patientsController.addDoc);
router.put("/addMed/:id", patientsController.addMed);
router.put("/addCare/:id", patientsController.addCare);
router.put("/addDiet/:id", patientsController.addDiet);
router.put("/addShop/:id", patientsController.addShop);
router.put("/editUser/:id", patientsController.editUser);
router.put("/editPatient/:id", patientsController.editPatient);
router.get("/getCsv/:id", patientsController.getCsv);
router.delete("/deleteCareItem/:id/:item", patientsController.deleteCareItem);
router.delete("/deleteDietItem/:id/:item", patientsController.deleteDietItem);
router.delete("/deleteShopItem/:id/:item", patientsController.deleteShopItem);
router.delete("/deleteDocItem/:id/:item", patientsController.deleteDocItem);
router.delete("/deleteMedItem/:id/:item", patientsController.deleteMedItem);
router.delete("/deletePatient/:id", patientsController.deletePatient);
router.delete("/deleteAcct/:id", patientsController.deleteAcct);

module.exports = router;

