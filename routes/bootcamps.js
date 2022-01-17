const express = require("express");
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require("../controllers/bootcamps");

/*INCLUDE OTHER RESOURCE ROUTERS */
const courseRouter = require("./courses");

const router = express.Router();
/*RE-ROUTE INTO OTHER RESOURCE ROUTERS */
router.use("/:bootcampId/courses", courseRouter);
/*ROUTES */
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
