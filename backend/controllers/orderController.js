const Order = require("../models/order");
const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsynErrors = require("../middleware/catchAsynErrors");

// Create a new order   =>  /api/v1/order/new
exports.newOrder = catchAsynErrors(async (req, res, next) => {
	const { orderItems, shippingInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentInfo } =
		req.body;

	const order = await Order.create({
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
		paidAt: Date.now(),
		user: req.user._id
	});

	res.status(200).json({
		success: true,
		order
	});
});

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsynErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if(!order) {
    return next(new ErrorHandler("No order found with this ID", 404))
  }

  res.status(200).json({success: true, order})
});

// Get loggedin user orders => /api/v1/orders/me
exports.myOrders = catchAsynErrors(async (req, res, next) => {
  const orders = await Order.find({user: req.user.id})

  res.status(200).json({success: true, orders})
})

