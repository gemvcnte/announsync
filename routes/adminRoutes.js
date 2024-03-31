const express = require("express");
const dotenv = require("dotenv");
const adminController = require("../controllers/adminController");
const verifyToken = require("../middleware/verifyToken");
dotenv.config();

const router = express.Router();

router.post("/createAdmin", adminController.createAdmin);
router.get("/getAllAdmins", adminController.getAllAdmins);
router.get("/getSpecificAdmin", adminController.getSpecificAdmin);
router.delete("/admin/deleteAdmin/:id", adminController.deleteAdmin);
router.post("/createAnnouncement", adminController.createAnnouncement);
router.patch("/admin/updatePassword", adminController.updateAdminPassword);
router.get("/getAllAnnouncements", adminController.getAllAnnouncements);
router.delete("/deleteAnnouncement/:id", adminController.deleteAnnouncement);
router.get("/analytics/totalAdmin", adminController.totalAdminAnalytics);
router.get("/analytics/totalPosts", adminController.totalPostsOfAdminAnalytics);

module.exports = router;
