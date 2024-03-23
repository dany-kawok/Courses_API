// let { Courses } = require("../data/Courses.js");
const { validationResult } = require("express-validator");
const Course = require("../models/course.model.js");
const HttpStatusMessages = require("../utils/HttpStatusMessages.js");
const asyncWrapper = require("../middleware/asyncWrapper.js");
const AppError = require("../utils/AppError.js");

const getAllCourses = async (req, res) => {
  const { limit, page } = req.query;
  const skip = (page - 1) * limit;
  const Courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res
    .status(200)
    .json({ status: HttpStatusMessages.SUCCESS, data: { courses: Courses } });
};
const getSingleCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    const error = AppError.create(
      "Course Not Found",
      404,
      HttpStatusMessages.FAIL
    );
    return next(error);
  }
  res
    .status(200)
    .json({ status: HttpStatusMessages.SUCCESS, data: { course } });
});
const AddNewCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = AppError.create(errors.array(), 400, HttpStatusMessages.FAIL);
    return next(error);
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  res
    .status(201)
    .json({ status: HttpStatusMessages.SUCCESS, data: { newCourse } });
});
const updateCourseTitle = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const updatedCourse = await Course.updateOne(
    { _id: courseId },
    { $set: { ...req.body } }
  );
  return res
    .status(201)
    .json({ status: HttpStatusMessages.SUCCESS, data: { updatedCourse } });
});
const deleteCourse = asyncWrapper(async (req, res, next) => {
  await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json({ status: HttpStatusMessages.SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  getSingleCourse,
  AddNewCourse,
  updateCourseTitle,
  deleteCourse,
};
