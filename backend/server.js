const app = require("./app");
const morgan = require("morgan");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// Setting up config file
dotenv.config({ path: "Backend/config/config.env" });

// Connecting to database
connectDatabase();

// middleware
app.use(morgan("dev"));

app.listen(process.env.PORT, () => {
	console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`);
})