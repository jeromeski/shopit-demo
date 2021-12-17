const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const errorMiddleware = require("./middleware/errors");

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


// Import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");

app.use("/api/v1", products);
app.use("/api/v1", auth);

// Middleware to handle errors
app.use(errorMiddleware);


module.exports = app;
