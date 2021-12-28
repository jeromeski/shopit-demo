const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");

const fileUpload = require("express-fileupload");
const morgan = require("morgan");

const errorMiddleware = require("./middleware/errors");

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan("dev"));

// Import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

// Middleware to handle errors
app.use(errorMiddleware);


module.exports = app;
