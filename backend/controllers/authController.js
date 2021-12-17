const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");

const catchAsyncErrors = require("../middleware/catchAsynErrors");
const sendToken = require("../utils/jwtToken");

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

	const token = user.getJwtToken();

	res.status(201).json({
		success: true,
		token
	});
});

// Login User => /api/v1/ogin
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	// Checks if email and password is entered
	if (!email || !password) {
		return next(new ErrorHandler("Please enter email & password", 400));
	}

	// Finding user in database
	const user = await User.findOne({ email: email }).select("+password");

	if (!user) {
		return next(new ErrorHandler("Invalid Email or Password", 401));
	}

	//  Checks if password is correct or not
	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid Email or Password", 401));
	}

	sendToken(user, 200, res);
});

// Logout user => /api/v1/logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {expires: new Date(Date.now()), httpOnly: true})
  res.status(200).json({success: true, message: "Logged out"})
})

