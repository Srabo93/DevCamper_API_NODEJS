/*REQUIRE PACKAGES*/
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
/* LOAD ENV VARS*/
dotenv.config({ path: "./config/config.env" });
/*CONNECT TO DATABASE*/
connectDB();
/*ROUTE FILES*/
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

/**
 * INITIALIZE APP
 */
const app = express();

/*BODY PARSER*/
app.use(express.json());

/*COOKIE PARSER */
app.use(cookieParser());

/* DEV LOGGING MIDDLEWARE*/
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
/*FILE UPLOADING */
app.use(fileUpload());
/*SET STATIC FOLDER */
app.use(express.static(path.join(__dirname, "public")));
/* MOUNT ROUTERS*/
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
/* ERROR MIDDLEWARE */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

/**
 * HANDLE UNHANDLED PROMISED REJECTIONS
 */
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  /*CLOSE SERVER & EXIT PROCESS*/
  server.close(() => process.exit(1));
});
