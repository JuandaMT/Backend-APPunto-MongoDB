const express = require("express");
const AnswerController = require("../controllers/AnswerController");
const { authentication, isTeacher } = require("../middleware/authentication");

const router = express.Router();

router.post("/", AnswerController.create);

module.exports = router;
