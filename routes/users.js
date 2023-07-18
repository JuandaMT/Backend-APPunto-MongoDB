const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication, isTeacher } = require("../middleware/authentication");

router.post("/", UserController.create);
router.post("/login", UserController.login);
router.get("/id/:_id", authentication, UserController.findUser);
router.get("/name/:name", authentication, UserController.getUserByName);
router.put("/id/:_id", isTeacher, UserController.addPoints);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
