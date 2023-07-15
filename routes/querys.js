const express = require("express");
const QueryController = require("../controllers/QueryController");
const { authentication, isTeacher } = require("../middleware/authentication");

const router = express.Router();

router.post("/", QueryController.createQuery);
router.put("/querys", authentication, isTeacher, QueryController.updateQuery);
router.put("/querys/:id", authentication, isTeacher, QueryController.updateQueryById);
router.put("/querys/:question", authentication, isTeacher, QueryController.updateQueryByQuestion);
router.get("/querys", QueryController.getAllQuerysWithUsersAndAnswers);

module.exports = router;
