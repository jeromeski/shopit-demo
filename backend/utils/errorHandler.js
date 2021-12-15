// Error Handler Class
// return next(new ErrorHandler("Product not found!", 404));

class ErrorHandler extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = ErrorHandler;
