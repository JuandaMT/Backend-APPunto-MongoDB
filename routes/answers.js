const express = require("express");
const AnswerController = require("../controllers/AnswerController");
const { authentication, isTeacher, isStudent } = require("../middleware/authentication");

const router = express.Router();

router.post("/", AnswerController.create);

router.get("/all", authentication, AnswerController.getAllAnswers);

router.put("/update", authentication, AnswerController.updateAnswer);

router.delete("/delete/:_id", authentication, AnswerController.updateAnswer);

module.exports = router;
