const express = require("express");
const QueryController = require("../controllers/QueryController");
const { authentication, isTeacher, isStudent } = require("../middleware/authentication");

const router = express.Router();

router.post("/", QueryController.createQuery);

router.put("/queries", authentication, QueryController.updateQuery);
router.put("/id/:_id", authentication, isTeacher, QueryController.updateQueryById);
router.put("/update/:topic", authentication, isTeacher, QueryController.updateQueryByTopic);
router.put("/resolved/:queryId", authentication, isStudent, QueryController.markQueryAsResolved);
router.put("/unresolved/:queryId", authentication, isStudent, QueryController.markQueryAsUnresolved);

router.get("/page/queries", authentication, isTeacher, QueryController.getAllQueriesPagination);
router.get("/all/all", QueryController.getEverything);

router.delete("/queries/:queryId", authentication, QueryController.deleteQuery);

module.exports = router;
