const express = require("express");
const { body } = require("express-validator");
const courseController = require("../controllers/courses.controller");
const {
  addCourseValidationSchema,
  editCourseValidationSchema,
} = require("../middleware/validationSchema");
const router = express.Router();
router
  .route("/")
  .get(courseController.getAllCourses)
  .post(addCourseValidationSchema, courseController.AddNewCourse);

router
  .route("/:courseId")
  .get(courseController.getSingleCourse)
  .patch(editCourseValidationSchema, courseController.updateCourseTitle)
  .delete(courseController.deleteCourse);

module.exports = router;
