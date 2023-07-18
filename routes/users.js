const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication } = require("../middleware/authentication");

router.post("/", UserController.create);
router.post("/login", UserController.login);
router.get("/id/:_id", authentication, UserController.findUser);
router.put("/id/:_id", authentication, UserController.addPoints);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
