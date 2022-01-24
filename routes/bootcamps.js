const express = require("express");
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

/*INCLUDE OTHER RESOURCE ROUTERS */
const courseRouter = require("./courses");

const router = express.Router(bootcampPhotoUpload);
/*RE-ROUTE INTO OTHER RESOURCE ROUTERS */
router.use("/:bootcampId/courses", courseRouter);
/*ROUTES */
router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
router.route("/:id/photo").put(bootcampPhotoUpload);
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

module.exports = router;
