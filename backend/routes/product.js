const express = require("express");
const router = express.Router();

const {
	getProducts,
	newProduct,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
	getProductReviews
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(getProducts);

router.route("/product/:id").get(getSingleProduct);

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router
	.route("/admin/product/:id")
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/review").get(isAuthenticatedUser, getProductReviews);

module.exports = router;
