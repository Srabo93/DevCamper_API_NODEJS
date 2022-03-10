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
const Bootcamp = require("../models/Bootcamp");

/*INCLUDE OTHER RESOURCE ROUTERS */
const courseRouter = require("./courses");
const router = express.Router(bootcampPhotoUpload);
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

/*RE-ROUTE INTO OTHER RESOURCE ROUTERS */
router.use("/:bootcampId/courses", courseRouter);
/*ROUTES */
router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);
router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

module.exports = router;
