const express = require("express");
const router = express.Router();

//establish controller variables
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const postsController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//main routes
router.get("/", homeController.getIndex);
router.get("/about", homeController.getAbout);
router.get("/dashboard", ensureAuth, postsController.getDashboard);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.put("/updateDashboard/:id", authController.updateDashboard);

router.get("/feed", postsController.getFeed);

module.exports = router;
