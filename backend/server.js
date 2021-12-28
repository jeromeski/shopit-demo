const app = require("./app");
const cloudinary = require("cloudinary");

const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
	console.log(`ERROR: ${err.stack}`);
	console.log("Shutting down the server due to Uncaught exceptions");
	server.close(() => {
		process.exit(1);
	});
});

// Setting up config file
dotenv.config({ path: "Backend/config/config.env" });

// Setting up cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
});

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
	console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
	console.log(`ERROR: ${err.message}`);
	console.log("Shutting down the server due to Unhandled Promise Rejection");
	server.close(() => {
		process.exit(1);
	});
});

