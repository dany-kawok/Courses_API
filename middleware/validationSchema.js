const { body } = require("express-validator");

const addCourseValidationSchema = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 2 })
    .withMessage("2 letters minimum"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price should be number only"),
];
const editCourseValidationSchema = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 2 })
    .withMessage("2 letters minimum"),
];

module.exports = { addCourseValidationSchema, editCourseValidationSchema };
