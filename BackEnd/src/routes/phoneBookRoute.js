const express = require("express");
const router = express.Router();

// Require Controllers
const User = require("../controllers/phoneBookController");

// Routes
router.get("/api/get-all/", User.getAllUser);
router.get("/api/get-by/:mobileNumber", User.getUserByMobileNumber);
router.post("/api/create", User.createUser);
router.put("/api/update/:id", User.updateUser);
router.delete("/api/delete/:id", User.deleteUser)


module.exports = router;   