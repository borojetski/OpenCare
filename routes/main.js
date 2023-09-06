const express = require("express");
const router = express.Router();

//establish controller variables
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const patientsController = require("../controllers/patients");
const { ensureAuth } = require("../middleware/auth");

//main routes
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, patientsController.getProfile);
router.get("/about", homeController.getAbout);
router.get("/dashboard", ensureAuth, patientsController.getDashboard);
router.get("/login", authController.getLogin);
router.post("/login", authController.patientLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.patientSignup);
router.put("/updateDashboard/:id", authController.updateDashboard);

module.exports = router;
