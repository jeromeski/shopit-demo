const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");

const catchAsyncErrors = require("../middleware/catchAsynErrors");

// Register a user => /api/v1/registers
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password } = req.body;
	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: "avatars/500_exzoa1",
			url: "https://res.cloudinary.com/ecom-demo-02/image/upload/v1639705257/avatars/500_exzoa1.jpg"
		}
	});

	res.status(201).json({
		success: true,
		user
	});
});
