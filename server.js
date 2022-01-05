/**
 * REQUIRE PACKAGES
 */
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
/**
 * LOAD ENV VARS
 */
dotenv.config({ path: "./config/config.env" });
/**
 * CONNECT TO DATABASE
 */
connectDB();
/**
 * ROUTE FILES
 */
const bootcamps = require("./routes/bootcamps");
/**
 * INITIALIZE APP
 */
const app = express();

/**
 * DEV LOGGING MIDDLEWARE
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
/**
 * MOUNT ROUTERS
 */
app.use("/api/v1/bootcamps", bootcamps);

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
  //Close Server & Exit proces
  server.close(() => process.exit(1));
});
