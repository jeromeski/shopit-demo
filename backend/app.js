const express = require("express");
const app = express();
const morgan = require("morgan");

const errorMiddleware = require("./middleware/errors");

app.use(express.json());
// middleware
app.use(morgan("dev"));

// Import all routes
const products = require("./routes/product");

app.use("/api/v1", products);

// Middleware to handle errors
app.use(errorMiddleware);


module.exports = app;
