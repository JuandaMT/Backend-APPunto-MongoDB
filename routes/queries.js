const express = require("express");
const QueryController = require("../controllers/QueryController");
const { authentication, isTeacher } = require("../middleware/authentication");

const router = express.Router();

router.post("/", QueryController.createQuery);

router.put("/queries", QueryController.updateQuery);
router.put("/id/:_id", QueryController.updateQueryById);
router.put("/update/:topic", QueryController.updateQueryByTopic);
router.put("/resolved/:queryId", QueryController.markQueryAsResolved);
router.put("/unresolved/:queryId", QueryController.markQueryAsUnresolved);

router.get("/all_U_W/queries", QueryController.getAllQueriesWithUsersAndAnswers);
router.get("/all/queries", QueryController.getAllQueriesPagination);

router.delete("/queries/:queryId", authentication, QueryController.deleteQuery);

module.exports = router;
