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
const advancedResults = require("../middleware/advancedResults");

/*INCLUDE OTHER RESOURCE ROUTERS */
const courseRouter = require("./courses");
const router = express.Router(bootcampPhotoUpload);
const { protect } = require("../middleware/auth");

/*RE-ROUTE INTO OTHER RESOURCE ROUTERS */
router.use("/:bootcampId/courses", courseRouter);
/*ROUTES */
router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);
router.route("/:id/photo").put(bootcampPhotoUpload);
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

module.exports = router;
