// the job for the asyncWrapper is to catch any thrown errors by
//any async function which rapped by this middleware

// the controller would invoke getSingleCourse, which would invoke the
// asyncWrapper, asyncWrapper would

module.exports = asyncWrapper = (fn) => (req, res, next) => {
  fn(req, res, next).catch((error) => next(error));
};
