const express = require("express");
const HttpStatusMessages = require("./utils/HttpStatusMessages");
require("dotenv").config();
const app = express();
const cors = require("cors");
const coursesRouter = require("./routes/courses.route");
const connectDB = require("./middleware/connectDB");
app.use(cors());
app.use(express.json());
connectDB().then(console.log("db started"));
app.use("/api/Courses", coursesRouter);
//global middleware for not found routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: HttpStatusMessages.FAIL,
    message: "resource not available",
  });
});
//global error handler
app.use((error, req, res, next) => {
  res.status(error.errorStatusCode || 500).json({
    status: error.errorStatusText || HttpStatusMessages.ERROR,
    message: error.errorMessage,
    code: error.errorStatusCode,
    MW: "yes",
  });
});
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
