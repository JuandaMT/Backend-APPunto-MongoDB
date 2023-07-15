const express = require("express");
const DoubtController = require("../controllers/DoubtController");
const { authentication, isTeacher } = require("../middleware/authentication");

const router = express.Router();

router.post("/", DoubtController.createDoubt);
router.put("/doubts", authentication, isTeacher, DoubtController.updateDoubt);
router.put("/doubts/:id", authentication, isTeacher, DoubtController.updateDoubtById);
router.put("/doubts/:question", authentication, isTeacher, DoubtController.updateDoubtByQuestion);
router.get("/doubts", DoubtController.getAllDoubtsWithUsersAndAnswers);

module.exports = router;
