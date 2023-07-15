const express = require("express");
const QueryController = require("../controllers/QueryController");
const { authentication, isTeacher } = require("../middleware/authentication");

const router = express.Router();

router.post("/", QueryController.createQuery);
router.put("/queries", QueryController.updateQuery);
router.put("/id/:_id", QueryController.updateQueryById);
router.put("/update/:topic", QueryController.updateQueryByTopic);
router.get("/all_U_W/queries", QueryController.getAllQueriesWithUsersAndAnswers);
router.get("/all/queries", QueryController.getAllQueries);

module.exports = router;
